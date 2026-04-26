import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import axios from "axios"

export default function MRProfile(){

const [mr,setMR] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{

const fetchProfile = async()=>{

try{

const token = localStorage.getItem("token")

const res = await axios.get(
"http://localhost:5000/api/mr/profile",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

setMR(res.data?.mr)

}catch(err){
console.error("MR Profile Error:",err)
}

finally{
setLoading(false)
}

}

fetchProfile()

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
MR Profile
</h1>

<div className="bg-white/5 p-8 rounded-xl mb-8">

<h2 className="text-2xl font-semibold">
{mr?.user?.name}
</h2>

<p className="text-gray-400">
Employee Code: {mr?.employeeCode}
</p>

<p className="text-gray-400">
Territory: {mr?.territory?.name || "Not Assigned"}
</p>

</div>

<div className="bg-white/5 p-6 rounded-xl">

<h2 className="text-xl mb-4">
Assigned Doctors
</h2>

{mr?.doctors?.length === 0 ? (

<p className="text-gray-400">
No doctors assigned
</p>

):( 

mr?.doctors?.map(d=>(

<div
key={d._id}
className="border-b border-white/10 py-3"
>

<p className="text-blue-400">
{d.name}
</p>

<p className="text-gray-400">
{d.specialization}
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