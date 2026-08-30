import * as THREE from 'three'

// Seeded PRNG – keeps the neural-core layout stable across reloads.
export function mulberry32(seed) {
  let a = seed >>> 0
  return function next() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Soft, round, additive particles – shared by the signal pulses and starfield.
const HOLO_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uScale;
  uniform float uPixelRatio;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float tw = 0.78 + 0.22 * (0.5 + 0.5 * sin(uTime * 0.8 + aPhase));
    float s = aSize * uScale * uPixelRatio * (320.0 / -mv.z) * tw;
    gl_PointSize = clamp(s, 1.0, 26.0 * uPixelRatio);
    gl_Position = projectionMatrix * mv;
  }
`

const HOLO_FRAGMENT = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv) * 2.0;
    if (d > 1.0) discard;
    float a = pow(smoothstep(1.0, 0.0, d), 1.6);
    gl_FragColor = vec4(vColor, a * uOpacity);
  }
`

export function createHoloMaterial({ uScale = 1.7, uOpacity = 0.95 } = {}) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uScale: { value: uScale },
      uPixelRatio: { value: 1 },
      uOpacity: { value: uOpacity },
    },
    vertexShader: HOLO_VERTEX,
    fragmentShader: HOLO_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}

/** Soft radial-gradient sprite texture used for the core halo. */
export function createRadialTexture({
  size = 256,
  inner = 'rgba(125, 230, 255, 0.85)',
  mid = 'rgba(56, 130, 246, 0.28)',
  outer = 'rgba(0, 0, 0, 0)',
} = {}) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, inner)
  gradient.addColorStop(0.4, mid)
  gradient.addColorStop(1, outer)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}