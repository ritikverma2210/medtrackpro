import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import { getVisits } from "../api/visit"
import { submitDCR } from "../api/dcr"

export default function SubmitDCR(){

const [visits,setVisits] = useState([])
const [loading,setLoading] = useState(false)

const fetchVisits = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user"))
const mrId = user?.mrId

if(!mrId){
console.error("MR ID not found")
return
}

const res = await getVisits(mrId)

setVisits(res.data.visits || [])

}catch(err){
console.error(err)
}

}

useEffect(()=>{
fetchVisits()
},[])

const handleSubmit = async()=>{

try{

setLoading(true)

await submitDCR()

alert("DCR Submitted Successfully")

setLoading(false)

}catch(err){
console.error(err)
setLoading(false)
}

}

return(

<div className="flex bg-[#020617] text-white min-h-screen">

<Sidebar/>

<div className="flex-1 ml-64 p-8">

<h1 className="text-3xl font-bold mb-8">
Submit DCR
</h1>

{/* VISITS */}

<div className="space-y-4 mb-8">

{visits.length === 0 && (
<div className="bg-white/5 p-8 rounded-xl text-gray-400 text-center">
No visits found for today
</div>
)}

{visits.map(v=>(

<div
key={v._id}
className="bg-white/5 border border-white/10 p-4 rounded-xl"
>

<p><b>Doctor:</b> {v.doctor?.name}</p>
<p><b>Territory:</b> {v.territory?.name || "N/A"}</p>
<p><b>Date:</b> {new Date(v.visitDate).toLocaleDateString()}</p>

</div>

))}

</div>

{/* SUBMIT BUTTON */}

<button
onClick={handleSubmit}
disabled={loading}
className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold"
>
{loading ? "Submitting..." : "Submit DCR"}
</button>

</div>

</div>

)

}