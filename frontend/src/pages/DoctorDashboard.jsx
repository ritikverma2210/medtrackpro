import { useEffect,useState } from "react"
import DashboardLayout from "../components/DashboardLayout"
import { getDoctorDashboard } from "../api/doctorDashboard"
import Loader from "../components/Loader"

export default function DoctorDashboard(){

const [data,setData] = useState(null)

useEffect(()=>{

const fetchData = async()=>{

try{
const res = await getDoctorDashboard()
setData(res.data.dashboard)
}catch(err){
console.error(err)
}

}

fetchData()

},[])

if(!data){
return(
<DashboardLayout>
<Loader/>
</DashboardLayout>
)
}

return(

<DashboardLayout>

<h1 className="text-3xl font-bold mb-8">
Doctor Dashboard
</h1>

{/* PROFILE */}

<div className="bg-white/5 p-6 rounded-xl mb-8">

<h2 className="text-xl font-semibold">
{data.doctorName}
</h2>

<p className="text-gray-400">
{data.specialization}
</p>

<p className="text-gray-400">
{data.hospital}
</p>

</div>

{/* STATS */}

<div className="grid grid-cols-2 gap-6 mb-8">

<div className="bg-white/5 p-6 rounded-xl">
<h3 className="text-gray-400">Today's Visits</h3>
<h2 className="text-2xl font-bold text-blue-400">
{data.todayVisits}
</h2>
</div>

<div className="bg-white/5 p-6 rounded-xl">
<h3 className="text-gray-400">Total Visits</h3>
<h2 className="text-2xl font-bold text-blue-400">
{data.totalVisits}
</h2>
</div>

</div>

{/* RECENT VISITS */}

<div className="bg-white/5 p-6 rounded-xl">

<h2 className="text-xl mb-4">
Recent Visits
</h2>

{data.recentVisits?.length === 0 ? (

<p className="text-gray-400">
No recent visits
</p>

) : (

data.recentVisits.map(v=>(

<div
key={v._id}
className="border-b border-white/10 py-3"
>

<p className="font-semibold text-blue-400">
MR: {v.mr?.employeeCode}
</p>

<p className="text-gray-400">
Date: {new Date(v.visitDate).toLocaleDateString()}
</p>

<p className="text-gray-400">
Notes: {v.notes || "No notes"}
</p>

<p className="text-gray-400">
Products: {
v.productsDiscussed?.length || 0
}
</p>

</div>

))

)}

</div>

</DashboardLayout>

)

}