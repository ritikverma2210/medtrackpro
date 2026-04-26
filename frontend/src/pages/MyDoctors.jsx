import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import { getMyDoctors } from "../api/mr"

export default function MyDoctors(){

  const [doctors,setDoctors] = useState([])

  useEffect(()=>{

    const fetchDoctors = async()=>{

      try{
        const res = await getMyDoctors()
        setDoctors(res.data.doctors || [])
      }catch(err){
        console.error(err)
      }

    }

    fetchDoctors()

  },[])

  return(

    <div className="flex bg-[#020617] text-white min-h-screen">

      <Sidebar/>

      <div className="flex-1 ml-64 p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Doctors
        </h1>

        {/* EMPTY STATE */}
        {doctors.length === 0 && (
          <div className="bg-white/5 p-10 rounded-xl text-center text-gray-400">
            No doctors assigned yet 🚫
          </div>
        )}

        {/* DOCTOR CARDS */}
        <div className="grid grid-cols-3 gap-6">

          {doctors.map(doc=>(
            <div
              key={doc._id}
              className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition"
            >

              <h2 className="text-xl font-semibold mb-2">
                {doc.name}
              </h2>

              <p className="text-gray-400 text-sm mb-1">
                {doc.specialization}
              </p>

              <p className="text-gray-400 text-sm">
                {doc.hospital}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}