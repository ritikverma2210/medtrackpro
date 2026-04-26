import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid
} from "recharts"

export default function DemoDashboard(){

const data = [
{ name:"Mon",visits:40},
{ name:"Tue",visits:65},
{ name:"Wed",visits:50},
{ name:"Thu",visits:90},
{ name:"Fri",visits:70},
{ name:"Sat",visits:60}
]

return(

<div className="min-h-screen bg-[#020617] text-white p-8">

<h1 className="text-3xl font-bold mb-8">
MedTrackPro Dashboard
</h1>

<div className="grid grid-cols-4 gap-6 mb-10">

<div className="bg-white/5 border border-white/10 p-6 rounded-xl">
<p className="text-gray-400">Total Doctors</p>
<h2 className="text-3xl text-blue-400 mt-2">
542
</h2>
</div>

<div className="bg-white/5 border border-white/10 p-6 rounded-xl">
<p className="text-gray-400">Total MR</p>
<h2 className="text-3xl text-blue-400 mt-2">
87
</h2>
</div>

<div className="bg-white/5 border border-white/10 p-6 rounded-xl">
<p className="text-gray-400">Today's Visits</p>
<h2 className="text-3xl text-blue-400 mt-2">
129
</h2>
</div>

<div className="bg-white/5 border border-white/10 p-6 rounded-xl">
<p className="text-gray-400">Pending DCR</p>
<h2 className="text-3xl text-blue-400 mt-2">
21
</h2>
</div>

</div>


{/* Chart */}

<div className="bg-white/5 border border-white/10 rounded-xl p-6">

<h2 className="text-xl font-semibold mb-6">
Weekly Visits
</h2>

<div className="h-[300px]">

<ResponsiveContainer>

<BarChart data={data}>

<CartesianGrid stroke="#1f2937"/>

<XAxis dataKey="name"/>

<YAxis/>

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

</div>

)

}