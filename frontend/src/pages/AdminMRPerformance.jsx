import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AdminMRPerformance(){

const [mrs,setMrs] = useState([])
const navigate = useNavigate()

useEffect(()=>{

const fetchData = async()=>{

try{

const token = localStorage.getItem("token")

const res = await axios.get(
"http://localhost:5000/api/mr",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

setMrs(res.data?.mrs || [])

}catch(err){
console.error(err)
}

}

fetchData()

},[])

return(

<div className="flex bg-[#020617] text-white min-h-screen">

<Sidebar/>

<div className="flex-1 w-full md:ml-64">

<Topbar/>

<div className="p-4 md:p-8">

{/* HEADER */}

<div className="flex items-center gap-4 mb-8">

<button
onClick={()=>navigate(-1)}
className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition"
>
←
</button>

<h1 className="text-2xl md:text-3xl font-bold">
MR Performance
</h1>

</div>

{/* TABLE */}

<div className="bg-white/5 rounded-xl overflow-hidden w-full">

<div className="overflow-x-auto">

<table className="w-full min-w-[600px]">

<thead className="bg-white/5">

<tr>
<th className="p-4 text-left">Employee Code</th>
<th className="p-4 text-left">Territory</th>
<th className="p-4 text-left">Assigned Doctors</th>
</tr>

</thead>

<tbody>

{mrs.length === 0 && (
<tr>
<td colSpan="3" className="text-center p-6 text-gray-400">
No data found
</td>
</tr>
)}

{mrs.map(mr=>(

<tr
key={mr._id}
className="border-t border-white/10"
>

<td className="p-4">
{mr.employeeCode}
</td>

<td className="p-4">
{mr.territory?.name || "Not Assigned"}
</td>

<td className="p-4">
{mr.doctors?.length || 0}
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

</div>

</div>

)

}