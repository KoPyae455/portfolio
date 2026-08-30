import { useEffect, useMemo, useSyncExternalStore } from 'react'
import * as THREE from 'three'
import { sceneState } from './sceneState'

const HIT_RADIUS = 0.26
const NODE_OPACITY = 0.8

/**
 * Floating neural nodes connected by thin synaptic lines. Hover state lives in
 * the shared sceneState store (canvas raycast + DOM labels); the rig applies
 * brightness/scale, and incident connections are re-drawn into a bright
 * highlight buffer.
 */
export default function NeuralNetwork({ data }) {
  const built = useMemo(() => {
    const group = new THREE.Group()
    const disposables = []

    const nodeGeo = new THREE.SphereGeometry(1, 10, 8)
    const hitGeo = new THREE.SphereGeometry(1, 6, 4)
    const hitMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
    disposables.push(nodeGeo, hitGeo, hitMat)

    const hitMeshes = []
    const visualMeshes = []
    const nodeMats = []
    for (const node of data.nodes) {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
        transparent: true,
        opacity: NODE_OPACITY,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      disposables.push(mat)
      nodeMats.push(mat)

      const mesh = new THREE.Mesh(nodeGeo, mat)
      mesh.position.set(node.position[0], node.position[1], node.position[2])
      mesh.scale.setScalar(node.radius)
      visualMeshes.push(mesh)
      group.add(mesh)

      // Generous invisible hit area so hovering feels precise but easy.
      const hit = new THREE.Mesh(hitGeo, hitMat)
      hit.position.copy(mesh.position)
      hit.scale.setScalar(HIT_RADIUS)
      hit.userData.nodeId = node.id
      hitMeshes.push(hit)
      group.add(hit)
    }

    // Base synaptic web – one draw call.
    const edgePositions = new Float32Array(data.edges.length * 6)
    data.edges.forEach(([a, b], i) => {
      const pa = data.nodes[a].position
      const pb = data.nodes[b].position
      edgePositions.set(pa, i * 6)
      edgePositions.set(pb, i * 6 + 3)
    })
    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3))
    const edgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#3fb8e8'),
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const edgesObj = new THREE.LineSegments(edgeGeo, edgeMat)
    disposables.push(edgeGeo, edgeMat)
    group.add(edgesObj)

    // Hover highlight lines (rebuilt when the hovered node changes).
    const highlightGeo = new THREE.BufferGeometry()
    highlightGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(data.edges.length * 6), 3),
    )
    highlightGeo.setDrawRange(0, 0)
    const highlightMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#b5f1ff'),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const highlight = new THREE.LineSegments(highlightGeo, highlightMat)
    disposables.push(highlightGeo, highlightMat)
    group.add(highlight)

    return { group, hitMeshes, visualMeshes, nodeMats, highlightGeo, highlightMat, disposables }
  }, [data])

  // Expose hit-spheres + per-node materials to the raycaster / rig.
  useEffect(() => {
    sceneState.nodeMeshes.push(...built.hitMeshes)
    data.nodes.forEach((node, i) => {
      sceneState.nodeMaterials.set(node.id, {
        mat: built.nodeMats[i],
        mesh: built.visualMeshes[i],
        base: new THREE.Color(node.color),
        baseOpacity: NODE_OPACITY,
        baseScale: node.radius,
        neighborSet: new Set(data.neighborIds[node.id]),
      })
    })
    return () => {
      for (const hit of built.hitMeshes) {
        const i = sceneState.nodeMeshes.indexOf(hit)
        if (i !== -1) sceneState.nodeMeshes.splice(i, 1)
      }
      for (const node of data.nodes) sceneState.nodeMaterials.delete(node.id)
    }
  }, [built, data])

  useEffect(() => {
    sceneState.highlightMat = built.highlightMat
    return () => {
      if (sceneState.highlightMat === built.highlightMat) sceneState.highlightMat = null
    }
  }, [built])

  // Rebuild the bright connection buffer whenever the hovered node changes.
  const hoveredId = useSyncExternalStore(
    (notify) => {
      sceneState.hoverSubscribers.add(notify)
      return () => sceneState.hoverSubscribers.delete(notify)
    },
    () => sceneState.hoveredNodeId,
  )

  useEffect(() => {
    const positions = built.highlightGeo.attributes.position
    positions.array.fill(0)
    built.highlightGeo.setDrawRange(0, 0)
    if (hoveredId == null) return
    let w = 0
    for (const [a, b] of data.edges) {
      if (a !== hoveredId && b !== hoveredId) continue
      const pa = data.nodes[a].position
      const pb = data.nodes[b].position
      positions.array.set(pa, w * 6)
      positions.array.set(pb, w * 6 + 3)
      w += 1
    }
    built.highlightGeo.setDrawRange(0, w * 2)
    positions.needsUpdate = true
  }, [built, data, hoveredId])

  useEffect(
    () => () => {
      for (const disposable of built.disposables) disposable.dispose()
    },
    [built],
  )

  return <primitive object={built.group} />
}