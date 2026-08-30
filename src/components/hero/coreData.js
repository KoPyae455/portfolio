import { mulberry32 } from './coreUtils'

// Data-driven layout of the AI Neural Core.
//
//   core
//   ├── nodes        floating neural nodes placed on three tilted shells
//   ├── edges        thin synaptic connections (k-nearest neighbours)
//   ├── neighborIds  adjacency list used for hover highlighting
//   ├── rings        orbital rings with satellite dots
//   └── labelTargets node ids the DOM capability labels attach to

const NODE_COLORS = ['#5fd9ff', '#7ce2ff', '#4d8dff', '#5f7dff', '#8aa0ff', '#74d8f2']

const SHELLS = [
  { radius: 1.0, tilt: [0.3, 0, 0.1], phase: 0 },
  { radius: 1.7, tilt: [0, 0.38, 0.12], phase: 0.7 },
  { radius: 2.25, tilt: [0.52, 0.2, 0], phase: 0.35 },
]

const RING_DEFS = [
  { radius: 2.05, tilt: [1.15, 0, 0.15], speed: 0.1 },
  { radius: 2.3, tilt: [0.15, 1.0, 0.35], speed: -0.07 },
  { radius: 2.55, tilt: [0.7, 0.5, -0.2], speed: 0.13 },
]

function rotateX(v, a) {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c]
}

function rotateY(v, a) {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]
}

export function buildCore(tier) {
  const rng = mulberry32(1405)

  const total = tier.nodeCount
  const inner = Math.max(4, Math.round(total * 0.24))
  const mid = Math.max(5, Math.round(total * 0.4))
  const outer = Math.max(3, total - inner - mid)
  const counts = [inner, mid, outer]

  const nodes = []
  let index = 0
  for (let s = 0; s < SHELLS.length; s++) {
    const shell = SHELLS[s]
    for (let i = 0; i < counts[s]; i++) {
      const angle = (i / counts[s]) * Math.PI * 2 + shell.phase + (rng() - 0.5) * 0.22
      const r = shell.radius * (0.86 + rng() * 0.28)
      let p = [Math.cos(angle) * r, Math.sin(angle) * r, (rng() - 0.5) * 0.6]
      p = rotateX(p, shell.tilt[0] + (rng() - 0.5) * 0.1)
      p = rotateY(p, shell.tilt[1] + (rng() - 0.5) * 0.1)
      nodes.push({
        id: index,
        shell: s,
        position: p,
        radius: 0.028 + rng() * 0.03,
        color: NODE_COLORS[(s * 2 + (rng() > 0.5 ? 1 : 0)) % NODE_COLORS.length],
      })
      index += 1
    }
  }

  // k-nearest-neighbour connections inside a local radius.
  const dist2 = new Float32Array(nodes.length * nodes.length)
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i].position
      const b = nodes[j].position
      const d = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
      dist2[i * nodes.length + j] = d
      dist2[j * nodes.length + i] = d
    }
  }

  const edges = []
  const seen = new Set()
  const addEdge = (i, j) => {
    const key = i < j ? `${i}-${j}` : `${j}-${i}`
    if (seen.has(key)) return false
    seen.add(key)
    edges.push([i, j])
    return true
  }

  const limit = tier.edgeRadius * tier.edgeRadius
  for (let i = 0; i < nodes.length; i++) {
    const order = []
    for (let j = 0; j < nodes.length; j++) if (j !== i) order.push(j)
    order.sort((u, v) => dist2[i * nodes.length + u] - dist2[i * nodes.length + v])
    let added = 0
    for (const j of order) {
      if (added >= tier.edgeK) break
      if (dist2[i * nodes.length + j] > limit) continue
      if (addEdge(i, j)) added += 1
    }
    // Safety: never leave an isolated node.
    if (added === 0) addEdge(i, order[0])
  }

  // Guarantee the network reads as one connected system per shell.
  let cursor = 0
  for (let s = 0; s < counts.length; s++) {
    for (let i = 1; i < counts[s]; i++) addEdge(cursor + i - 1, cursor + i)
    cursor += counts[s]
  }

  const neighborIds = nodes.map(() => [])
  for (const [a, b] of edges) {
    neighborIds[a].push(b)
    neighborIds[b].push(a)
  }

  const rings = RING_DEFS.slice(0, tier.rings).map((r) => ({ ...r, satellites: tier.ringSatellites }))

  const n = nodes.length
  const labelTargets = [0, Math.floor(n / 3), Math.floor((n * 2) / 3), n - 1]

  return { nodes, edges, neighborIds, rings, labelTargets }
}