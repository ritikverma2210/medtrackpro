import { useEffect,useState } from "react"
import { getVisits } from "../api/visit"
import { getMRs } from "../api/mr"
import Sidebar from "../components/Sidebar"
import { useNavigate } from "react-router-dom"

export default function Visits(){

  const [visits,setVisits] = useState([])
  const [mrs,setMrs] = useState([])
  const [selectedMR,setSelectedMR] = useState("")
  const navigate = useNavigate()

  const fetchMRs = async()=>{
    const res = await getMRs()
    setMrs(res.data.mrs || [])
  }

  const fetchVisits = async(id)=>{
    if(!id) return

    const res = await getVisits(id)
    setVisits(res.data.visits || [])
  }

  useEffect(()=>{
    fetchMRs()
  },[])

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
            Visit Management
          </h1>

        </div>

        {/* FILTER */}
        <div className="bg-white/5 p-4 md:p-6 rounded-xl mb-8">

          <h2 className="mb-4 text-lg">
            Select MR
          </h2>

          <select
            value={selectedMR}
            onChange={(e)=>{
              setSelectedMR(e.target.value)
              fetchVisits(e.target.value)
            }}
            className="px-4 py-2 bg-[#020617] border border-white/10 rounded w-full"
          >
            <option value="">Select MR</option>

            {mrs.map(mr=>(
              <option key={mr._id} value={mr._id}>
                {mr.employeeCode} - {mr.user?.name}
              </option>
            ))}

          </select>

        </div>

        {/* TABLE */}
        <div className="bg-white/5 rounded-xl overflow-hidden w-full">

          <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="bg-white/5 text-gray-300">
              <tr>
                <th className="p-4 text-left">Doctor</th>
                <th className="p-4 text-left">Territory</th>
                <th className="p-4 text-left">Products</th>
                <th className="p-4 text-left">Notes</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>

              {visits.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No visits found
                  </td>
                </tr>
              )}

              {visits.map(v=>(
                <tr key={v._id} className="border-t border-white/10">

                  <td className="p-4">
                    {v.doctor?.name || "N/A"}
                  </td>

                  <td className="p-4">
                    {v.territory?.name || "N/A"}
                  </td>

                  <td className="p-4">
                    {v.productsDiscussed?.length || 0}
                  </td>

                  <td className="p-4">
                    {v.notes || "-"}
                  </td>

                  <td className="p-4">
                    {new Date(v.visitDate).toLocaleDateString()}
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