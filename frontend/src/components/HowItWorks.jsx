import { motion } from "framer-motion"
import { UserPlus, MapPinned, FileText, BarChart3 } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    desc: "Register your pharma company and onboard medical representatives easily.",
  },
  {
    icon: MapPinned,
    title: "Track MR Visits",
    desc: "Medical reps log doctor visits and field activity in real time.",
  },
  {
    icon: FileText,
    title: "Submit DCR",
    desc: "MRs submit daily call reports instantly from their dashboard.",
  },
  {
    icon: BarChart3,
    title: "Analyze Performance",
    desc: "Managers analyze reports, productivity and doctor engagement.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-28 bg-[#020617] text-white relative overflow-hidden">

      {/* glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full bottom-0 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-xs font-medium bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-md mx-auto text-base leading-relaxed">
            Get your entire pharma team up and running in just four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">

          {/* connector line */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative z-10 bg-[#0b1220] border border-white/5 rounded-2xl p-7 text-center hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >

                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-blue-600/40">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mx-auto mb-5 mt-2 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <Icon size={24} />
                </div>

                <h3 className="text-base font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>

              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}