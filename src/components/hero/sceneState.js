// Shared mutable state that bridges the Three.js scene, the render-loop rig
// and the DOM overlay layer.
//
// This is intentionally NOT React state: values are read and written every
// frame inside `useFrame`, so triggering React re-renders for them would
// destroy performance. React components only *register* objects here inside
// effects that the render loop consumes.

export const sceneState = {
  pointer: { x: 0, y: 0 },
  hoveredNodeId: null, // numeric id of the highlighted neural node (or null)
  hoverFromLabel: false, // a DOM label is hovered → skip canvas raycasting
  hoverSubscribers: new Set(), // notified whenever hover changes
  reducedMotion: false,
  visible: true,
  rootGroup: null, // THREE.Group holding core + network (parallax + idle spin)
  camera: null, // THREE.Camera from the active canvas (pointer raycasting)
  nodeMeshes: [], // invisible hit-spheres used for pointer raycasting
  nodeMaterials: new Map(), // id -> { mat, mesh, base, baseOpacity, baseScale, neighborSet }
  materials: [], // [{ material, pulse, hover, base, phase }] glow + twinkle
  spinners: [], // [{ object, speed }] slowly counter-rotating wireframe shells
  rings: [], // [{ spin, speed }] orbital ring spin groups
  signals: [], // travelling-particle buffers advanced by the rig
  highlightMat: null, // material of the hover-highlight connection lines
  starfield: null, // THREE.Group for ambient background particles

  // Central hover source of truth: rig, raycaster and DOM labels all read it.
  setHovered(id) {
    if (this.hoveredNodeId === id) return
    this.hoveredNodeId = id
    for (const fn of this.hoverSubscribers) fn(id)
  },
}