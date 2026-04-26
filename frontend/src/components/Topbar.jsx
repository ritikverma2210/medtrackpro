import { useLocation } from "react-router-dom"
import NotificationBell from "./NotificationBell"
import { FaBars } from "react-icons/fa"

export default function Topbar({setOpen}){

const location = useLocation()

const getTitle = ()=>{

if(location.pathname.includes("admin")) return "Admin Dashboard"
if(location.pathname.includes("mr")) return "MR Dashboard"
if(location.pathname.includes("doctor")) return "Doctor Dashboard"

return "Dashboard"

}

const logout = ()=>{
localStorage.removeItem("token")
localStorage.removeItem("role")
window.location.href="/login"
}

return(

<header className="h-16 bg-[#020617] border-b border-white/10 flex items-center justify-between px-6 lg:px-8">

<div className="flex items-center gap-4">

<button
onClick={()=>setOpen(true)}
className="lg:hidden text-white"
>
<FaBars/>
</button>

<h2 className="text-white font-semibold">
{getTitle()}
</h2>

</div>

<div className="flex items-center gap-6">

<NotificationBell/>

<button
onClick={logout}
className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-white transition"
>
Logout
</button>

</div>

</header>

)

}