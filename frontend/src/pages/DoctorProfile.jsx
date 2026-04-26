import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import axios from "axios"
import Loader from "../components/Loader"

export default function DoctorProfile(){

const [doctor,setDoctor] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{

const fetchProfile = async()=>{

try{

const token = localStorage.getItem("token")

const res = await axios.get(
"http://localhost:5000/api/doctors/profile",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

if(res.data?.doctor){
setDoctor(res.data.doctor)
}

}catch(err){
console.error("Doctor Profile Error:",err)
}

finally{
setLoading(false)
}

}

fetchProfile()

},[])

if(loading){
return(
<div className="flex bg-[#020617] text-white min-h-screen">
<Sidebar/>
<div className="flex-1 ml-64">
<Topbar/>
<Loader/>
</div>
</div>
)
}

return(

<div className="flex bg-[#020617] text-white min-h-screen">

<Sidebar/>

<div className="flex-1 ml-64">

<Topbar/>

<div className="p-8">

<h1 className="text-3xl font-bold mb-8">
Doctor Profile
</h1>

<div className="bg-white/5 p-8 rounded-xl">

{!doctor ? (

<p className="text-gray-400">
Doctor profile not found
</p>

):(

<div className="grid grid-cols-2 gap-6">

<div>
<p className="text-gray-400">Doctor Name</p>
<h2 className="text-xl font-semibold">
{doctor.name || "N/A"}
</h2>
</div>

<div>
<p className="text-gray-400">Specialization</p>
<h2 className="text-xl font-semibold">
{doctor.specialization || "N/A"}
</h2>
</div>

<div>
<p className="text-gray-400">Hospital</p>
<h2 className="text-xl font-semibold">
{doctor.hospital || "N/A"}
</h2>
</div>

<div>
<p className="text-gray-400">Email</p>
<h2 className="text-xl font-semibold">
{doctor.user?.email || "N/A"}
</h2>
</div>

<div>
<p className="text-gray-400">Assigned MR</p>
<h2 className="text-xl font-semibold">
{doctor.mr?.employeeCode || "Not Assigned"}
</h2>
</div>

</div>

)}

</div>

</div>

</div>

</div>

)

}