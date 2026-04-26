import { NavLink } from "react-router-dom"
import {
FaHome,
FaUserMd,
FaUsers,
FaFileAlt,
FaChartBar,
FaMap,
FaBox,
FaLocationArrow
} from "react-icons/fa"

import logo from "../assets/security.png"

export default function Sidebar({open,setOpen}) {

const role = localStorage.getItem("role")

const linkStyle =
"flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-200"

return (

<>

{/* Mobile Overlay */}

{open && (
<div
onClick={()=>setOpen(false)}
className="fixed inset-0 bg-black/50 z-40 lg:hidden"
/>
)}

<aside
className={`
fixed left-0 top-0 h-screen w-64 bg-[#020617] border-r border-white/10 z-50
transform transition-transform duration-300
${open ? "translate-x-0" : "-translate-x-full"}
lg:translate-x-0
`}
>

{/* LOGO HEADER */}

<div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">

<img src={logo} alt="logo" className="w-8 h-8" />

<h1 className="text-lg font-bold tracking-wide">
MedTrack<span className="text-blue-500">Pro</span>
</h1>

</div>

<nav className="flex flex-col gap-2 p-4 overflow-y-auto">

{/* Dashboard */}

<NavLink
to={
role === "ADMIN"
? "/admin/dashboard"
: role === "MR"
? "/mr/dashboard"
: "/doctor/dashboard"
}
className={({ isActive }) =>
`${linkStyle} ${isActive ? "bg-blue-600/20 text-blue-400" : ""}`
}
>
<FaHome />
Dashboard
</NavLink>

{/* ADMIN */}

{role === "ADMIN" && (
<>

<NavLink to="/doctors" className={({isActive})=>`${linkStyle} ${isActive ? "bg-blue-600/20 text-blue-400":""}`}>
<FaUserMd />
Doctors
</NavLink>

<NavLink to="/mr-management" className={({isActive})=>`${linkStyle} ${isActive ? "bg-blue-600/20 text-blue-400":""}`}>
<FaUsers />
MR Management
</NavLink>

<NavLink to="/territories" className={({isActive})=>`${linkStyle} ${isActive ? "bg-blue-600/20 text-blue-400":""}`}>
<FaMap />
Territories
</NavLink>

<NavLink to="/products" className={({isActive})=>`${linkStyle} ${isActive ? "bg-blue-600/20 text-blue-400":""}`}>
<FaBox />
Products
</NavLink>

<NavLink to="/visits" className={({isActive})=>`${linkStyle} ${isActive ? "bg-blue-600/20 text-blue-400":""}`}>
<FaLocationArrow />
Visits
</NavLink>

<NavLink to="/dcr" className={({isActive})=>`${linkStyle} ${isActive ? "bg-blue-600/20 text-blue-400":""}`}>
<FaFileAlt />
DCR Reports
</NavLink>

<NavLink to="/mr-performance" className={({isActive})=>`${linkStyle} ${isActive ? "bg-blue-600/20 text-blue-400":""}`}>
<FaChartBar />
MR Performance
</NavLink>

<NavLink to="/analytics" className={({isActive})=>`${linkStyle} ${isActive ? "bg-blue-600/20 text-blue-400":""}`}>
<FaChartBar />
Analytics
</NavLink>

</>
)}

{/* MR */}

{role === "MR" && (
<>
<NavLink to="/my-doctors" className={linkStyle}>
<FaUserMd/> My Doctors
</NavLink>

<NavLink to="/visit" className={linkStyle}>
<FaUsers/> Add Visit
</NavLink>

<NavLink to="/dcr" className={linkStyle}>
<FaFileAlt/> Submit DCR
</NavLink>

<NavLink to="/my-visits" className={linkStyle}>
<FaLocationArrow/> My Visits
</NavLink>

<NavLink to="/mr/profile" className={({isActive})=>`${linkStyle} ${isActive ? "bg-blue-600/20 text-blue-400":""}`}>
<FaUserMd/> Profile
</NavLink>
</>
)}

{/* Doctor */}

{role === "DOCTOR" && (
<>
<NavLink to="/doctor/notifications" className={linkStyle}>
<FaFileAlt/> Notifications
</NavLink>

<NavLink to="/doctor/visits" className={linkStyle}>
<FaLocationArrow/> Visit History
</NavLink>

<NavLink to="/doctor/profile" className={linkStyle}>
<FaUserMd/> Profile
</NavLink>

<NavLink to="/doctor/analytics" className={linkStyle}>
<FaChartBar/> Analytics
</NavLink>
</>
)}

</nav>

</aside>

</>

)
}