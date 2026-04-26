export default function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      <div className="absolute inset-0
      bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),
      linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
      bg-[size:60px_60px]" />

      <div className="absolute w-[500px] h-[500px] bg-blue-500/30 blur-[150px] top-[-200px] left-[-200px] pointer-events-none" />

      <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 blur-[150px] bottom-[-200px] right-[-200px] pointer-events-none" />

    </div>
  )
}