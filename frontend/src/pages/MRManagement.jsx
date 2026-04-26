import { useState,useEffect } from "react"
import { createMR, assignTerritory, assignDoctor, getMRs } from "../api/mr"
import { getDoctors } from "../api/doctor"
import { getTerritories } from "../api/territory"
import MRForm from "../components/MRForm"
import Sidebar from "../components/Sidebar"
import { useNavigate } from "react-router-dom"

export default function MRManagement(){

  const navigate = useNavigate()

  const [mrs,setMrs] = useState([])
  const [search,setSearch] = useState("")

  const [mrId,setMrId] = useState("")
  const [territoryId,setTerritoryId] = useState("")
  const [doctorId,setDoctorId] = useState("")

  const [doctors,setDoctors] = useState([])
  const [territories,setTerritories] = useState([])

  const filteredMR = mrs.filter((mr)=>
    mr.employeeCode?.toLowerCase().includes(search.toLowerCase()) ||
    mr.user?.name?.toLowerCase().includes(search.toLowerCase())
  )

  const fetchMRs = async ()=>{
    try{
      const res = await getMRs()
      setMrs(res.data.mrs)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    fetchMRs()
    fetchDoctors()
    fetchTerritories()
  },[])

  const handleCreateMR = async(data)=>{
  try{

    const res = await createMR(data)

    alert(res.data.message || "MR created successfully")

    fetchMRs()

  }catch(err){

    console.error("CREATE MR ERROR:", err)

    alert(
      err.response?.data?.message ||
      err.message ||
      "MR creation failed"
    )

  }
}

  const handleAssignTerritory = async()=>{
    try{
      await assignTerritory({ mrId, territoryId })
      alert("Territory assigned")
      fetchMRs()
    }catch(err){
      console.error(err)
    }
  }

  const handleAssignDoctor = async () => {
  try {
    const res = await assignDoctor({ mrId, doctorId })

    alert(res.data.message || "Doctor assigned successfully")

    fetchMRs()

  } catch (err) {

    console.error("ASSIGN DOCTOR ERROR:", err)

    alert(
      err.response?.data?.message ||
      err.message ||
      "Doctor assign failed ❌"
    )
  }
}

  const handleDelete = (id)=>{
    if(!window.confirm("Delete this MR?")) return
    const updated = mrs.filter((mr)=>mr._id !== id)
    setMrs(updated)
  }

  const fetchDoctors = async()=>{
    try{
      const res = await getDoctors()
      setDoctors(res.data.doctors)
    }catch(err){
      console.error(err)
    }
  }

  const fetchTerritories = async()=>{
    try{
      const res = await getTerritories()
      setTerritories(res.data.territories)
    }catch(err){
      console.error(err)
    }
  }

  return(

    <div className="flex bg-[#020617] text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 w-full md:ml-64 p-4 md:p-8">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <div className="flex items-center gap-4">

            <button
              onClick={()=>navigate(-1)}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              ←
            </button>

            <h1 className="text-2xl md:text-3xl font-bold">
              MR Management
            </h1>

          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">

            <input
              type="text"
              placeholder="Search MR..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm outline-none w-full sm:w-auto"
            />

            <span className="text-gray-400 text-sm">
              Total MR: {mrs.length}
            </span>

          </div>

        </div>

        {/* CREATE MR */}

        <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 mb-8 w-full">

          <h2 className="text-xl mb-4 font-semibold">
            Create MR
          </h2>

          <MRForm onSubmit={handleCreateMR}/>

        </div>

        {/* ASSIGN TERRITORY */}

        <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 mb-8 w-full">

          <h2 className="text-xl mb-4 font-semibold">
            Assign Territory
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <select
              value={mrId}
              onChange={(e)=>setMrId(e.target.value)}
              className="px-4 py-2 bg-[#020617] border border-white/10 rounded text-white w-full"
            >
              <option value="">Select MR</option>

              {mrs.map(mr=>(
                <option key={mr._id} value={mr._id}>
                  {mr.employeeCode} - {mr.user?.name}
                </option>
              ))}

            </select>

            <select
              value={territoryId}
              onChange={(e)=>setTerritoryId(e.target.value)}
              className="px-4 py-2 bg-[#020617] border border-white/10 rounded text-white w-full"
            >

              <option value="">Select Territory</option>

              {territories.map(t=>(
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}

            </select>

            <button
              onClick={handleAssignTerritory}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition w-full md:w-auto"
            >
              Assign
            </button>

          </div>

        </div>

        {/* ASSIGN DOCTOR */}

        <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 mb-8 w-full">

          <h2 className="text-xl mb-4 font-semibold">
            Assign Doctor
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <select
              value={mrId}
              onChange={(e)=>setMrId(e.target.value)}
              className="px-4 py-2 bg-[#020617] border border-white/10 rounded text-white w-full"
            >

              <option value="">Select MR</option>

              {mrs.map(mr=>(
                <option key={mr._id} value={mr._id}>
                  {mr.employeeCode} - {mr.user?.name}
                </option>
              ))}

            </select>

            <select
              value={doctorId}
              onChange={(e)=>setDoctorId(e.target.value)}
              className="px-4 py-2 bg-[#020617] border border-white/10 rounded text-white w-full"
            >

              <option value="">Select Doctor</option>

              {doctors.map(d=>(
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}

            </select>

            <button
              onClick={handleAssignDoctor}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition w-full md:w-auto"
            >
              Assign
            </button>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden w-full">

          <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-white/5 text-gray-300">

              <tr>
                <th className="p-4 text-left">MR Code</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Territory</th>
                <th className="p-4 text-left">Doctors</th>
                <th className="p-4 text-left">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredMR.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-400">
                    No MR found
                  </td>
                </tr>
              )}

              {filteredMR.map((mr)=>(

                <tr
                  key={mr._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >

                  <td className="p-4">{mr.employeeCode}</td>
                  <td className="p-4">{mr.user?.name || "N/A"}</td>
                  <td className="p-4">{mr.user?.email || "N/A"}</td>

                  <td className="p-4">
                    {mr.territory?.name || "Not Assigned"}
                  </td>

                  <td className="p-4">
                    {mr.doctors?.length || 0}
                  </td>

                  <td className="p-4 space-x-3">

                    <button
                      onClick={()=>navigate(`/mr/${mr._id}`)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded-lg text-sm transition"
                    >
                      View
                    </button>

                    <button
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={()=>handleDelete(mr._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-lg text-sm transition"
                    >
                      Delete
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