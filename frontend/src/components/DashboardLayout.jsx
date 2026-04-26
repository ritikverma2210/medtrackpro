import { useState } from "react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import Footer from "./Footer"

export default function DashboardLayout({ children }) {

const [open,setOpen] = useState(false)

return (

<div className="flex h-screen bg-[#020617] text-white">

<Sidebar open={open} setOpen={setOpen}/>

<div className="flex-1 flex flex-col lg:ml-64 overflow-hidden">

<Topbar setOpen={setOpen}/>

<div className="flex-1 overflow-y-auto">

<main className="p-6 lg:p-8">

{children}

</main>

<Footer/>

</div>

</div>

</div>

)
}