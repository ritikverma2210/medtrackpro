import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import axios from "axios"

export default function AdminDoctorProfile(){

const { id } = useParams()

const [doctor,setDoctor] = useState(null)
const [visits,setVisits] = useState([])

useEffect(()=>{

const fetchData = async()=>{

try{

const token = localStorage.getItem("token")

const res = await axios.get(
`http://localhost:5000/api/doctors/${id}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

setDoctor(res.data?.doctor)

const visitRes = await axios.get(
"http://localhost:5000/api/doctors/visits",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

const filtered = visitRes.data?.visits?.filter(
v=>v.doctor === id
)

setVisits(filtered || [])

}catch(err){
console.error(err)
}

}

fetchData()

},[id])

return(

<div className="flex bg-[#020617] text-white min-h-screen">

<Sidebar/>

<div className="flex-1 ml-64">

<Topbar/>

<div className="p-8">

<h1 className="text-3xl font-bold mb-8">
Doctor Profile
</h1>

<div className="bg-white/5 p-8 rounded-xl mb-8">

<h2 className="text-2xl font-semibold">
{doctor?.name}
</h2>

<p className="text-gray-400">
{doctor?.specialization}
</p>

<p className="text-gray-400">
{doctor?.hospital}
</p>

</div>

<div className="bg-white/5 p-6 rounded-xl">

<h2 className="text-xl mb-4">
Visit History
</h2>

{visits?.length === 0 ? (

<p>No visits</p>

):( 

visits.map(v=>(

<div
key={v._id}
className="border-b border-white/10 py-3"
>

<p className="text-blue-400">
MR: {v.mr?.employeeCode}
</p>

<p>
{new Date(v.visitDate).toLocaleDateString()}
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