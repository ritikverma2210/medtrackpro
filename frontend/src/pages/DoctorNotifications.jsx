import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import axios from "axios"

export default function DoctorNotifications(){

const [notifications,setNotifications] = useState([])
const [loading,setLoading] = useState(true)

useEffect(()=>{

const fetchNotifications = async()=>{

try{

const token = localStorage.getItem("token")

const res = await axios.get(
"http://localhost:5000/api/doctors/visits",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

const visits = res.data?.visits || []

const formatted = visits.map(v=>({
id:v._id,
message:`MR ${v.mr?.employeeCode} visited you`,
date:v.visitDate
}))

setNotifications(formatted)

}catch(err){
console.error(err)
}

finally{
setLoading(false)
}

}

fetchNotifications()

},[])

if(loading){
return(
<div className="flex bg-[#020617] text-white min-h-screen">
<Sidebar/>
<div className="flex-1 ml-64">
<Topbar/>
<div className="p-8">Loading...</div>
</div>
</div>
)
}

return(

<div className="flex bg-[#020617] text-white min-h-screen">

<Sidebar/>

<div className="flex-1 ml-64">

<Topbar/>

<div className="p-8">

<h1 className="text-3xl font-bold mb-8">
Notifications
</h1>

<div className="bg-white/5 p-6 rounded-xl">

{notifications.length === 0 ? (

<p className="text-gray-400">
No notifications yet
</p>

):( 

notifications.map(n=>(

<div
key={n.id}
className="border-b border-white/10 py-4"
>

<p className="text-blue-400 font-semibold">
{n.message}
</p>

<p className="text-gray-400 text-sm">
{new Date(n.date).toLocaleDateString()}
</p>

</div>

))

)}

</div>

</div>

</div>

</div>

)
}