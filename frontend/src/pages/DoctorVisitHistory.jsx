import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import axios from "axios"
import Loader from "../components/Loader"

export default function DoctorVisitHistory(){

const [visits,setVisits] = useState([])
const [loading,setLoading] = useState(true)

useEffect(()=>{

const fetchVisits = async()=>{

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

if(res.data?.visits){
setVisits(res.data.visits)
}

}catch(err){
console.error("Doctor Visits Error:",err)
setVisits([])
}

finally{
setLoading(false)
}

}

fetchVisits()

},[])

if(loading){
return(
<div className="flex bg-[#020617] text-white min-h-screen">
<Sidebar/>
<div className="flex-1 ml-64">
<Topbar/>
<Loader/>
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
Visit History
</h1>

<div className="bg-white/5 p-6 rounded-xl">

{visits.length === 0 ? (

<p className="text-gray-400">
No visits yet
</p>

):( 

visits.map(v=>(

<div
key={v._id}
className="border-b border-white/10 py-3"
>

<p className="text-blue-400 font-semibold">
MR: {v.mr?.employeeCode || "N/A"}
</p>

<p className="text-gray-400">
Date: {new Date(v.visitDate).toLocaleDateString()}
</p>

<p className="text-gray-400">
Notes: {v.notes || "No Notes"}
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