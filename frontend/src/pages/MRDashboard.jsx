import { useEffect, useState } from "react"
import DashboardLayout from "../components/DashboardLayout"
import { getMRDashboard } from "../api/mrdashboard"
import { useNavigate } from "react-router-dom"

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid
} from "recharts"

export default function MRDashboard(){

const navigate = useNavigate()

const [data,setData] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{

const fetchData = async ()=>{

try{
const res = await getMRDashboard()
setData(res.data.dashboard)
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
<div className="text-white p-8">
Loading Dashboard...
</div>
)
}

if(!data){
return(
<div className="text-red-400 p-8">
Dashboard Failed
</div>
)
}

const chartData = [
{ name:"Mon", visits:5 },
{ name:"Tue", visits:8 },
{ name:"Wed", visits:6 },
{ name:"Thu", visits:10 },
{ name:"Fri", visits:7 },
{ name:"Sat", visits:4 }
]

return(

<DashboardLayout>

{/* HEADER */}

<h1 className="text-3xl font-bold mb-8">
MR Dashboard
</h1>

{/* WELCOME CARD */}

<div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-6 rounded-xl mb-8 border border-white/10">

<h2 className="text-xl font-semibold">
Employee Code: {data.employeeCode}
</h2>

<p className="text-gray-400 mt-1">
Territory: {data.territory?.name || "Not Assigned"}
</p>

</div>

{/* QUICK ACTION */}

<div className="grid grid-cols-3 gap-6 mb-8">

<QuickButton
title="Add Visit"
onClick={()=>navigate("/visit")}
/>

<QuickButton
title="My Doctors"
onClick={()=>navigate("/my-doctors")}
/>

<QuickButton
title="Submit DCR"
onClick={()=>navigate("/dcr")}
/>

</div>

{/* STATS */}

<div className="grid grid-cols-4 gap-6 mb-10">

<Card 
title="Assigned Doctors"
value={data.assignedDoctors}
/>

<Card 
title="Today's Visits"
value={data.todayVisits}
/>

<Card 
title="Total Visits"
value={data.totalVisits}
/>

<Card 
title="Today's DCR"
value={data.todayDCRStatus}
/>

</div>

{/* CHART */}

<div className="bg-white/5 border border-white/10 rounded-xl p-6">

<h2 className="text-xl font-semibold mb-6">
Weekly Visit Activity
</h2>

<div className="w-full h-[300px]">

<ResponsiveContainer>

<BarChart data={chartData}>

<CartesianGrid strokeDasharray="3 3" stroke="#1f2937"/>

<XAxis dataKey="name" stroke="#9ca3af"/>
<YAxis stroke="#9ca3af"/>

<Tooltip/>

<Bar
dataKey="visits"
fill="#3b82f6"
radius={[6,6,0,0]}
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

</DashboardLayout>

)

}


/* CARD */

function Card({title,value}){

return(

<div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition">

<p className="text-gray-400 text-sm">
{title}
</p>

<h2 className="text-2xl font-bold mt-2 text-blue-400 capitalize">
{value}
</h2>

</div>

)

}


/* QUICK BUTTON */

function QuickButton({title,onClick}){

return(

<button
onClick={onClick}
className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-blue-600/20 transition text-left"
>

<h3 className="text-lg font-semibold">
{title}
</h3>

<p className="text-gray-400 text-sm">
Open {title}
</p>

</button>

)

}