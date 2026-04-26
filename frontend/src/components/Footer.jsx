import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Footer() {

const navigate = useNavigate()

const goToDashboard = ()=>{
navigate("/demo-dashboard")
}

const goToContact = ()=>{
navigate("/contact")
}

const goToFeatures = ()=>{
navigate("/")
setTimeout(()=>{
document.getElementById("features")?.scrollIntoView({
behavior:"smooth"
})
},100)
}

const goToHome = ()=>{
navigate("/")
}

  return (
    <footer id="contact" className="relative bg-[#020617] text-white pt-20 pb-10 mt-32 border-t border-white/10">

      {/* top glow line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

        {/* LOGO + DESC */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            MedTrackPro
          </h2>

          <p className="text-gray-400 leading-relaxed max-w-sm">
            Smart MR management platform designed for pharma
            teams to track doctor visits, manage reports and
            analyze field performance efficiently.
          </p>
        </div>


        {/* QUICK LINKS */}
        <div>

          <h3 className="font-semibold mb-4 text-lg">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2 text-gray-400">

             <a href="#home" className="hover:text-blue-400 transition">
              Home
            </a>

            <button
              onClick={goToFeatures}
              className="text-left hover:text-blue-400 transition"
            >
              Features
            </button>

            <button
              onClick={goToDashboard}
              className="text-left hover:text-blue-400 transition"
            >
              Dashboard
            </button>

            <button
              onClick={goToContact}
              className="text-left hover:text-blue-400 transition"
            >
              Contact
            </button>

          </div>

        </div>


        {/* CONTACT */}
        <div>

          <h3 className="font-semibold mb-4 text-lg">
            Contact
          </h3>

          <a
          href="mailto:kanhaverma4104@gmail.com"
          className="flex items-center gap-3 text-gray-400 mb-5 hover:text-blue-400 transition"
          >
            <Mail size={18} />
            <span>
              kanhaverma4104@gmail.com
            </span>
          </a>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4">

<a
href="https://github.com/ritikverma2210"
target="_blank"
rel="noopener noreferrer"
className="p-2 bg-white/5 rounded-lg hover:bg-blue-500/20 transition"
>
<Github size={20} />
</a>

<a
href="https://www.instagram.com/_ritik.x22?igsh=bjhmNGEwY29nOHZm"
target="_blank"
rel="noopener noreferrer"
className="p-2 bg-white/5 rounded-lg hover:bg-pink-500/20 transition"
>
<Instagram size={20} />
</a>

<a
href="https://www.linkedin.com/in/ritik-verma-38a114357?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
target="_blank"
rel="noopener noreferrer"
className="p-2 bg-white/5 rounded-lg hover:bg-blue-500/20 transition"
>
<Linkedin size={20} />
</a>

</div>

        </div>

      </div>


      {/* bottom */}
      <div className="mt-16 border-t border-white/10 pt-6 text-center text-gray-500 text-sm">

        © 2026 MedTrackPro. All rights reserved.

        <div className="mt-2">
          Developed by{" "}
          <span className="text-blue-400 font-medium">
            Ritik Verma
          </span>
        </div>

      </div>

    </footer>
  )
}