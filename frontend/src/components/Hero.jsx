import { motion } from "framer-motion"
import heroImg from "../assets/hero-doctors.png"
import { useNavigate } from "react-router-dom"

export default function Hero() {

  const navigate = useNavigate()

  const scrollToFeatures = () => {
    const section = document.getElementById("features")
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#020617] text-white pt-16 overflow-hidden">

      {/* Background Glows */}
      <div className="absolute w-[700px] h-[700px] bg-blue-600/20 blur-[160px] rounded-full -top-40 -left-40 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-[160px] rounded-full -bottom-40 -right-40 pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10 py-20">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-medium bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Next-Gen Pharma CRM
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
            Smart MR <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Management
            </span>{" "}
            Platform
          </h1>

          <p className="text-gray-400 mt-6 text-lg leading-relaxed max-w-md">
            Manage doctors, medical reps, visits and DCR reports
            in one powerful and lightning-fast platform.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-10 flex-wrap">
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 hover:bg-blue-500 active:scale-95 px-7 py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all duration-200"
            >
              Get Started Free
            </button>
            <button
              onClick={scrollToFeatures}
              className="border border-white/10 hover:border-white/20 hover:bg-white/5 active:scale-95 px-7 py-3.5 rounded-xl text-sm font-medium text-gray-300 transition-all duration-200"
            >
              View Features →
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-14 pt-8 border-t border-white/5">
            {[
              { num: "500+", label: "Pharma Companies" },
              { num: "10K+", label: "Medical Reps" },
              { num: "98%", label: "Satisfaction Rate" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.num}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex justify-center relative"
        >
          {/* Glow behind image */}
          <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full scale-75" />
          <img
            src={heroImg}
            alt="Doctors"
            className="w-[420px] md:w-[500px] drop-shadow-2xl relative z-10"
          />
        </motion.div>

      </div>
    </section>
  )
}