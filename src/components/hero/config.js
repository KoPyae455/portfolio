// Performance / composition tiers for the AI Neural Core visual.
// Lower tiers trade visual density for battery + frame-rate on small devices.

export const TIERS = {
  desktop: {
    label: 'desktop',
    sceneScale: 1.6,
    dpr: [1, 1.75],
    nodeCount: 26,
    edgeK: 3,
    edgeRadius: 1.0,
    rings: 3,
    ringSatellites: 5,
    signals: 26,
    ambient: 220,
  },
  tablet: {
    label: 'tablet',
    sceneScale: 1.5,
    dpr: [1, 1.5],
    nodeCount: 18,
    edgeK: 2,
    edgeRadius: 1.0,
    rings: 2,
    ringSatellites: 4,
    signals: 14,
    ambient: 130,
  },
  mobile: {
    label: 'mobile',
    sceneScale: 1.35,
    dpr: [1, 1.35],
    nodeCount: 12,
    edgeK: 2,
    edgeRadius: 1.0,
    rings: 2,
    ringSatellites: 3,
    signals: 8,
    ambient: 70,
  },
}

export function getTier(width = window.innerWidth) {
  if (width >= 1024) return TIERS.desktop
  if (width >= 640) return TIERS.tablet
  return TIERS.mobile
}