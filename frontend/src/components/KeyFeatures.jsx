import { motion } from "framer-motion"
import { User, MapPin, BarChart3, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: User,
    title: "Doctor Management",
    desc: "Manage doctor profiles, details and performance reports all in one place.",
  },
  {
    icon: MapPin,
    title: "MR Visit Tracking",
    desc: "Track MR visits, routes and field activities in real time with precision.",
  },
  {
    icon: BarChart3,
    title: "Daily Call Reports",
    desc: "Submit and analyze DCR reports instantly from any device.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Data",
    desc: "Role-based access control with fully encrypted medical data protection.",
  },
]

export default function KeyFeatures() {
  return (
    <section id="features" className="py-28 bg-[#020617] text-white relative overflow-hidden">

      {/* subtle glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full top-0 left-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-xs font-medium bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Key Features</h2>
          <p className="text-gray-400 max-w-md mx-auto text-base leading-relaxed">
            Everything your pharma team needs to manage field operations efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative bg-[#0b1220] border border-white/5 rounded-2xl p-7 transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden"
              >
                {/* card top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-6 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <Icon size={22} />
                </div>

                <h3 className="text-base font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
} 