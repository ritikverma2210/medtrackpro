import { useEffect,useState } from "react"
import Sidebar from "../components/Sidebar"
import { createTerritory,getTerritories,deleteTerritory } from "../api/territory"
import { useNavigate } from "react-router-dom"

export default function Territories(){

  const [name,setName] = useState("")
  const [region,setRegion] = useState("")
  const [territories,setTerritories] = useState([])
  const [search,setSearch] = useState("")
  const navigate = useNavigate()

  const filtered = territories.filter(t=>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  const fetchData = async()=>{
    const res = await getTerritories()
    setTerritories(res.data.territories)
  }

  useEffect(()=>{
    fetchData()
  },[])

  const handleCreate = async()=>{
    if(!name || !region) return
    await createTerritory({ name, region })
    setName("")
    setRegion("")
    fetchData()
  }

  const handleDelete = async(id)=>{
    if(!window.confirm("Delete territory?")) return
    await deleteTerritory(id)
    fetchData()
  }

  return(

    <div className="flex bg-[#020617] text-white min-h-screen">

      <Sidebar/>

      {/* MAIN CONTENT */}
      <div className="flex-1 w-full md:ml-64 p-4 md:p-8">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">

          <button
            onClick={()=>navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            ←
          </button>

          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Territory Management
          </h1>

        </div>

        {/* CREATE */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">

          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Territory name"
            className="px-4 py-2 bg-[#020617] border border-white/10 rounded w-full"
          />

          <input
            value={region}
            onChange={(e)=>setRegion(e.target.value)}
            placeholder="Region"
            className="px-4 py-2 bg-[#020617] border border-white/10 rounded w-full"
          />

          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition w-full sm:w-auto"
          >
            Add
          </button>

        </div>

        {/* SEARCH */}
        <input
          placeholder="Search..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="mb-6 px-4 py-2 bg-[#020617] border border-white/10 rounded w-full"
        />

        {/* TABLE */}
        <div className="bg-white/5 rounded-xl overflow-hidden w-full">

          <div className="overflow-x-auto">

          <table className="w-full min-w-[600px]">

            <thead className="bg-white/5">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Region</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-gray-400">
                    No territories found
                  </td>
                </tr>
              )}

              {filtered.map(t=>(
                <tr
                  key={t._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >

                  <td className="p-4">{t.name}</td>

                  <td className="p-4">{t.region}</td>

                  <td className="p-4">
                    <button
                      onClick={()=>handleDelete(t._id)}
                      className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg transition"
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