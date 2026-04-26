export default function ProductPreview() {

  const stats = [
    { label: "Total Doctors", value: "542", change: "+12 this week" },
    { label: "Visits Today", value: "87", change: "+5 from yesterday" },
    { label: "DCR Submitted", value: "129", change: "96% completion" },
  ]

  return (
    <section className="bg-[#020617] text-white py-28 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-600/10 blur-[140px] rounded-full bottom-0 right-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-xs font-medium bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            Dashboard Preview
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Dashboard</h2>
          <p className="text-gray-400 max-w-md mx-auto text-base leading-relaxed">
            Monitor doctor visits, MR performance and DCR reports
            from a single smart dashboard.
          </p>
        </div>

        {/* Dashboard Card */}
        <div className="bg-[#0b1220] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-500/5">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-semibold text-white">Overview</h3>
              <p className="text-xs text-gray-500 mt-1">Today — April 19, 2026</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Live</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-[#020617] border border-white/5 rounded-2xl p-6 hover:border-blue-500/20 transition-all duration-300 group"
              >
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">{s.label}</p>
                <div className="text-4xl font-bold text-blue-400 mb-2">{s.value}</div>
                <p className="text-xs text-gray-600">{s.change}</p>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div className="space-y-4">
            {[
              { label: "MR Visit Completion", val: 87 },
              { label: "DCR Submission Rate", val: 96 },
              { label: "Doctor Coverage", val: 74 },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>{bar.label}</span>
                  <span>{bar.val}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    style={{ width: `${bar.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}