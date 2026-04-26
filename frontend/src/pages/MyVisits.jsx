import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import { getVisits } from "../api/visit"
import { useNavigate } from "react-router-dom"

export default function MyVisits(){

const navigate = useNavigate()

const [visits,setVisits] = useState([])
const [loading,setLoading] = useState(true)

useEffect(()=>{

const fetchVisits = async()=>{

try{

const userData = localStorage.getItem("user")

if(!userData){
setLoading(false)
return
}

const user = JSON.parse(userData)
const mrId = user?.mrId

if(!mrId){
setLoading(false)
return
}

const res = await getVisits(mrId)

setVisits(res.data.visits || [])

}catch(err){
console.error(err)
}
finally{
setLoading(false)
}

}

fetchVisits()

},[])

return(

<div className="flex bg-[#020617] text-white min-h-screen">

<Sidebar/>

<div className="flex-1 ml-64 p-8">

{/* HEADER */}

<div className="flex items-center gap-4 mb-8">

<button
onClick={()=>navigate(-1)}
className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10"
>
←
</button>

<h1 className="text-3xl font-bold">
My Visits
</h1>

</div>

{/* LOADING */}

{loading && (

<div className="text-gray-400">
Loading visits...
</div>

)}

{/* EMPTY */}

{!loading && visits.length === 0 && (

<div className="bg-white/5 p-10 rounded-xl text-center text-gray-400">
No visits found 🚫
</div>

)}

{/* VISITS */}

<div className="grid grid-cols-2 gap-6">

{visits.map(v=>(

<div
key={v._id}
className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition"
>

{/* Doctor */}

<h2 className="text-xl font-semibold mb-1">
{v.doctor?.name || "Doctor"}
</h2>

<p className="text-gray-400 text-sm mb-3">
{v.doctor?.hospital || "Hospital"}
</p>

{/* Territory */}

<div className="text-sm mb-3">

<span className="text-gray-400">
Territory:
</span>

<span className="ml-2">
{v.territory?.name || "N/A"}
</span>

</div>

{/* Products */}

<div className="mb-3">

<p className="text-sm text-gray-400 mb-2">
Products
</p>

<div className="space-y-1">

{v.productsDiscussed?.map(p=>(

<div
key={p._id}
className="flex justify-between text-sm"
>

<span>
{p.product?.name}
</span>

<span className="text-blue-400">
{p.sampleQty}
</span>

</div>

))}

</div>

</div>

{/* Notes */}

{v.notes && (

<div className="mb-3 text-sm">

<span className="text-gray-400">
Notes:
</span>

<p className="text-gray-300">
{v.notes}
</p>

</div>

)}

{/* Date */}

<div className="text-xs text-gray-400 mt-4">

{new Date(v.visitDate).toLocaleDateString()} • 
{" "}
{new Date(v.visitDate).toLocaleTimeString()}

</div>

</div>

))}

</div>

</div>

</div>

)

}