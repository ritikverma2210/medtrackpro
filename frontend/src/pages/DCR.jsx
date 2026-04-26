import { useEffect, useState } from "react"
import { getDCR, reviewDCR, exportDCR, submitDCR } from "../api/dcr"
import Sidebar from "../components/Sidebar"
import { useNavigate } from "react-router-dom"

export default function DCR(){

  const [dcrs,setDcrs] = useState([])
  const [filter,setFilter] = useState("")
  const navigate = useNavigate()

  const role = localStorage.getItem("role")

  const fetchData = async()=>{
    try{
      const res = await getDCR()
      setDcrs(res.data.dcrs || [])
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  const handleSubmit = async(id)=>{
    try{
      await submitDCR(id)
      fetchData()
    }catch(err){
      console.error(err)
    }
  }

  const handleReview = async(id,action)=>{
    try{
      await reviewDCR(id,action)
      fetchData()
    }catch(err){
      console.error(err)
    }
  }

  const handleExport = async(id)=>{
    try{
      const res = await exportDCR(id)

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement("a")
      a.href = url
      a.download = "dcr.pdf"
      a.click()

    }catch(err){
      console.error(err)
    }
  }

  const filtered = dcrs.filter(d=>{
    if(!filter) return true
    return d.status === filter
  })

  return(

<div className="flex bg-[#020617] text-white min-h-screen">

<Sidebar/>

<div className="flex-1 w-full md:ml-64 p-4 md:p-8">

{/* HEADER */}

<div className="flex items-center gap-4 mb-8">

<button
onClick={() => navigate(-1)}
className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition"
>
←
</button>

<h1 className="text-2xl md:text-3xl font-bold tracking-wide">
DCR Reports
</h1>

</div>

{/* FILTER */}

<div className="mb-6">

<select
value={filter}
onChange={(e)=>setFilter(e.target.value)}
className="px-4 py-2 bg-[#020617] border border-white/10 rounded w-full md:w-auto"
>
<option value="">All</option>
<option value="draft">Draft</option>
<option value="submitted">Submitted</option>
<option value="approved">Approved</option>
<option value="rejected">Rejected</option>
</select>

</div>

{/* TABLE */}

<div className="bg-white/5 rounded-xl overflow-hidden w-full">

<div className="overflow-x-auto">

<table className="w-full min-w-[900px]">

<thead className="bg-white/5 text-gray-300">
<tr>
<th className="p-4 text-left">MR</th>
<th className="p-4 text-left">Date</th>
<th className="p-4 text-left">Visits</th>
<th className="p-4 text-left">Status</th>
<th className="p-4 text-left">Actions</th>
</tr>
</thead>

<tbody>

{filtered.length === 0 && (
<tr>
<td colSpan="5" className="text-center p-6 text-gray-400">
No DCR found
</td>
</tr>
)}

{filtered.map(d=>(

<tr key={d._id} className="border-t border-white/10">

<td className="p-4">
{d.mr?.user?.name || "N/A"}
</td>

<td className="p-4">
{new Date(d.date).toLocaleDateString()}
</td>

<td className="p-4">
{d.totalVisits || 0}
</td>

<td className="p-4">

<span className={`px-3 py-1 rounded text-sm font-medium
${d.status==="approved"?"bg-green-600":
d.status==="rejected"?"bg-red-600":
d.status==="submitted"?"bg-yellow-500":
"bg-gray-600"}`}>

{d.status}

</span>

</td>

<td className="p-4 space-x-2">

{/* MR — Submit */}

{role === "MR" && d.status === "draft" && (
<button
onClick={()=>handleSubmit(d._id)}
className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
>
Submit
</button>
)}

{/* ADMIN — Approve Reject */}

{role === "ADMIN" && d.status === "submitted" && (
<>
<button
onClick={()=>handleReview(d._id,"approve")}
className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
>
Approve
</button>

<button
onClick={()=>handleReview(d._id,"reject")}
className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
>
Reject
</button>
</>
)}

{/* PDF */}

<button
onClick={()=>handleExport(d._id)}
className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
>
PDF
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

</div>

  )
}