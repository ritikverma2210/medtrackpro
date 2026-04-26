import { useNavigate } from "react-router-dom"

export default function CTA() {

  const navigate = useNavigate()

  return (
    <section className="py-28 bg-[#020617] relative overflow-hidden">

      {/* glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-600/20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[130px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-medium bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          Get Started Today
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to simplify{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            MR Management?
          </span>
        </h2>

        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Join hundreds of pharma companies already using MedTrackPro
          to supercharge their field operations.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 hover:bg-blue-500 active:scale-95 px-8 py-4 rounded-xl text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all duration-200"
          >
            Get Started Free →
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-white/10 hover:border-white/20 hover:bg-white/5 active:scale-95 px-8 py-4 rounded-xl text-gray-300 font-medium text-sm transition-all duration-200"
          >
            Already have an account?
          </button>
        </div>

        {/* Trust note */}
        <p className="text-gray-600 text-xs mt-8">
          No credit card required · Free 14-day trial · Cancel anytime
        </p>

      </div>
    </section>
  )
}