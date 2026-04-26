import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import axios from "axios"

export default function DoctorAnalytics(){

const [visits,setVisits] = useState([])
const [loading,setLoading] = useState(true)

useEffect(()=>{

const fetchData = async()=>{

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

setVisits(res.data?.visits || [])

}catch(err){
console.error(err)
}

finally{
setLoading(false)
}

}

fetchData()

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

const totalVisits = visits.length

const mrCounts = {}

visits.forEach(v=>{
const mr = v.mr?.employeeCode || "Unknown"
mrCounts[mr] = (mrCounts[mr] || 0) + 1
})

const topMR = Object.keys(mrCounts).reduce((a,b)=>
mrCounts[a] > mrCounts[b] ? a : b , "None"
)

return(

<div className="flex bg-[#020617] text-white min-h-screen">

<Sidebar/>

<div className="flex-1 ml-64">

<Topbar/>

<div className="p-8">

<h1 className="text-3xl font-bold mb-8">
Doctor Analytics
</h1>

<div className="grid grid-cols-3 gap-6 mb-8">

<div className="bg-white/5 p-6 rounded-xl">
<p className="text-gray-400">Total Visits</p>
<h2 className="text-2xl font-bold text-blue-400">
{totalVisits}
</h2>
</div>

<div className="bg-white/5 p-6 rounded-xl">
<p className="text-gray-400">Most Visiting MR</p>
<h2 className="text-xl font-bold text-blue-400">
{topMR}
</h2>
</div>

<div className="bg-white/5 p-6 rounded-xl">
<p className="text-gray-400">Unique MRs</p>
<h2 className="text-xl font-bold text-blue-400">
{Object.keys(mrCounts).length}
</h2>
</div>

</div>

<div className="bg-white/5 p-6 rounded-xl">

<h2 className="text-xl mb-4">
Visit History Analytics
</h2>

{visits.map(v=>(

<div
key={v._id}
className="border-b border-white/10 py-3"
>

<p className="text-blue-400">
MR: {v.mr?.employeeCode}
</p>

<p className="text-gray-400">
{new Date(v.visitDate).toLocaleDateString()}
</p>

</div>

))}

</div>

</div>

</div>

</div>

)
}