import { useEffect,useState } from "react"
import axios from "axios"
import { FaBell } from "react-icons/fa"

export default function NotificationBell(){

const [notifications,setNotifications] = useState([])
const [open,setOpen] = useState(false)

useEffect(()=>{

const fetchNotifications = async()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/notifications",
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
)

setNotifications(res.data.notifications || [])

}catch(err){
console.error(err)
}

}

fetchNotifications()

},[])

return(

<div className="relative">

<button
onClick={()=>setOpen(!open)}
className="relative"
>

<FaBell className="text-xl text-white"/>

{notifications.filter(n=>!n.read).length > 0 && (

<span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded">
{notifications.filter(n=>!n.read).length}
</span>

)}

</button>


{open && (

<div className="absolute right-0 mt-4 w-72 bg-[#020617] border border-white/10 rounded-xl shadow-lg z-50">

<div className="p-4 border-b border-white/10">
Notifications
</div>

<div className="max-h-80 overflow-y-auto">

{notifications.length === 0 ? (

<p className="p-4 text-gray-400">
No notifications
</p>

):( 

notifications.map(n=>(

<div
key={n._id}
className="p-4 border-b border-white/10 hover:bg-white/5"
>

<p className="text-sm text-white">
{n.title}
</p>

<p className="text-xs text-gray-400">
{n.message}
</p>

</div>

))

)}

</div>

</div>

)}

</div>

)

}