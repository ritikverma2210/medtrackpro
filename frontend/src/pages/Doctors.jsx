import { useEffect, useState } from "react"
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
} from "../api/doctor"

import DoctorForm from "../components/DoctorForm"
import Sidebar from "../components/Sidebar"
import { useNavigate } from "react-router-dom"

export default function Doctors(){

  const navigate = useNavigate()

  const [doctors,setDoctors] = useState([])
  const [search,setSearch] = useState("")
  const [editingDoctor,setEditingDoctor] = useState(null)

  const filteredDoctors = doctors.filter((doc)=>
    doc.name.toLowerCase().includes(search.toLowerCase())
  )

  const fetchDoctors = async ()=>{
    try{
      const res = await getDoctors()
      setDoctors(res.data.doctors)
    }catch(err){
      console.error("Fetch doctors error:",err)
    }
  }

  useEffect(()=>{
    fetchDoctors()
  },[])

  const handleCreate = async(data)=>{
    try{
      await createDoctor(data)
      fetchDoctors()
    }catch(err){
      console.error("Create doctor error:",err)
    }
  }

  const handleUpdate = async(data)=>{
    try{
      await updateDoctor(editingDoctor._id,data)
      setEditingDoctor(null)
      fetchDoctors()
    }catch(err){
      console.error("Update doctor error:",err)
    }
  }

  const handleDelete = async(id)=>{
    if(!window.confirm("Delete this doctor?")) return

    try{
      await deleteDoctor(id)
      fetchDoctors()
    }catch(err){
      console.error("Delete doctor error:",err)
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
              Doctor Management
            </h1>

          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">

            <input
              type="text"
              placeholder="Search doctor..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm outline-none w-full sm:w-auto"
            />

            <span className="text-gray-400 text-sm">
              Total Doctors: {doctors.length}
            </span>

          </div>

        </div>

        {/* FORM */}

        <div className="mb-8 bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 w-full">

          <DoctorForm
            onSubmit={editingDoctor ? handleUpdate : handleCreate}
            editingDoctor={editingDoctor}
          />

        </div>

        {/* TABLE */}

        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden w-full">

          <div className="overflow-x-auto">

          <table className="w-full min-w-[600px]">

            <thead className="bg-white/5 text-gray-300">

              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Specialization</th>
                <th className="p-4 text-left">Hospital</th>
                <th className="p-4 text-left">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredDoctors.length === 0 && (

                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-400">
                    No doctors found
                  </td>
                </tr>

              )}

              {filteredDoctors.map((doctor)=>(

                <tr
                  key={doctor._id}
                  className="border-t border-white/10 hover:bg-white/5 transition cursor-pointer"
                >

                  <td
                    className="p-4 text-blue-400 hover:underline"
                    onClick={()=>navigate(`/doctors/${doctor._id}`)}
                  >
                    {doctor.name}
                  </td>

                  <td className="p-4">
                    {doctor.specialization}
                  </td>

                  <td className="p-4">
                    {doctor.hospital}
                  </td>

                  <td className="p-4 space-x-4">

                    <button
                      onClick={()=>setEditingDoctor(doctor)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Edit
                    </button>

                    <button
                      onClick={()=>handleDelete(doctor._id)}
                      className="text-red-400 hover:text-red-300"
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