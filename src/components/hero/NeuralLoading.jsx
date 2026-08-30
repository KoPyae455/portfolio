/**
 * Lightweight skeleton shown while the three.js chunk loads and while the
 * WebGL context warms up. Pure CSS — deliberately free of heavy imports so
 * the first paint stays instant.
 */
export default function NeuralLoading({ visible }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative flex h-40 w-40 items-center justify-center">
        <div className="absolute inset-6 rounded-full bg-cyan-400/10 blur-2xl animate-pulse" />
        <div className="absolute inset-14 rounded-full bg-blue-500/10 blur-xl animate-pulse [animation-delay:350ms]" />
        {/* Orbit dots hinting at neurons around the core glow */}
        <div className="absolute inset-0 animate-[spin_5s_linear_infinite]">
          {[0, 120, 240].map((deg) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-cyan-300/60"
              style={{ transform: `rotate(${deg}deg) translate(64px) translate(-50%, -50%)` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}