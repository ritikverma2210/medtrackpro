import { motion } from "framer-motion"

const reviews = [
  {
    name: "Rajesh Kumar",
    role: "Sales Manager · Sun Pharma",
    text: "MedTrackPro improved our MR productivity drastically. DCR submission went from 60% to 98% in just one month.",
    initials: "RK",
  },
  {
    name: "Anjali Sharma",
    role: "Regional Head · Cipla",
    text: "The best CRM system for pharma companies. Tracking visits and generating reports has never been this simple.",
    initials: "AS",
  },
  {
    name: "Amit Verma",
    role: "Field MR · Dr. Reddy's",
    text: "DCR reporting became extremely simple. I save at least 45 minutes every day using MedTrackPro.",
    initials: "AV",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-[#020617] text-white py-28 relative overflow-hidden">

      {/* glow */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full top-0 right-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-xs font-medium bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-400 max-w-md mx-auto text-base leading-relaxed">
            Trusted by pharma teams across India to manage their field operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-[#0b1220] border border-white/5 rounded-2xl p-8 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-blue-400 text-sm">★</span>
                ))}
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-7">
                "{r.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400 flex-shrink-0">
                  {r.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{r.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{r.role}</div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}