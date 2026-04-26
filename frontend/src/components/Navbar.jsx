import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import logo from "../assets/security.png"

export default function Navbar() {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/10">

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <img src={logo} alt="logo" className="w-5 h-5" />
          </div>
          <span className="text-white text-lg font-bold tracking-wide">
            MedTrack<span className="text-blue-400">Pro</span>
          </span>
        </div>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-1 text-sm">
          {["Home", "Features", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={item === "Home" ? () => navigate("/") : undefined}
              className="text-white/60 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">

          {/* LOGIN BUTTON */}
          <button
            onClick={() => navigate("/login")}
            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-95 px-5 py-2 rounded-lg text-sm text-white font-medium transition-all duration-200 shadow-lg shadow-blue-600/20"
          >
            Login
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            {open ? <FaTimes size={15} /> : <FaBars size={15} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#020617]/95 backdrop-blur-md border-t border-white/10 px-4 py-4 flex flex-col gap-1">

          {["Home", "Features", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => {
                if (item === "Home") navigate("/")
                setOpen(false)
              }}
              className="text-white/60 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg text-sm transition-all duration-200"
            >
              {item}
            </a>
          ))}

          <div className="mt-2 pt-3 border-t border-white/10">
            <button
              onClick={() => { navigate("/login"); setOpen(false) }}
              className="w-full bg-blue-600 hover:bg-blue-500 py-2.5 rounded-lg text-sm text-white font-medium transition-all duration-200"
            >
              Login
            </button>
          </div>

        </div>
      )}

    </nav>
  )
}