import { useState,useEffect } from "react"

export default function DoctorForm({onSubmit,editingDoctor}){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [specialization,setSpecialization] = useState("")
const [hospital,setHospital] = useState("")

useEffect(()=>{

if(editingDoctor){

setName(editingDoctor.name)
setSpecialization(editingDoctor.specialization)
setHospital(editingDoctor.hospital)

}

},[editingDoctor])

const handleSubmit=(e)=>{
e.preventDefault()

if(!name || !specialization || !hospital || (!editingDoctor && (!email || !password))){
alert("All fields required")
return
}

onSubmit({
name,
email,
password,
specialization,
hospital
})

setName("")
setEmail("")
setPassword("")
setSpecialization("")
setHospital("")
}

return(

<form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" onSubmit={handleSubmit}>

<input
type="text"
placeholder="Doctor Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="px-4 py-3 bg-[#020617] border border-white/10 rounded text-white w-full"
/>

{/* EMAIL */}

{!editingDoctor && (
<input
type="email"
placeholder="Doctor Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="px-4 py-3 bg-[#020617] border border-white/10 rounded text-white w-full"
/>
)}

{/* PASSWORD */}

{!editingDoctor && (
<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="px-4 py-3 bg-[#020617] border border-white/10 rounded text-white w-full"
/>
)}

<input
type="text"
placeholder="Specialization"
value={specialization}
onChange={(e)=>setSpecialization(e.target.value)}
className="px-4 py-3 bg-[#020617] border border-white/10 rounded text-white w-full"
/>

<input
type="text"
placeholder="Hospital"
value={hospital}
onChange={(e)=>setHospital(e.target.value)}
className="px-4 py-3 bg-[#020617] border border-white/10 rounded text-white w-full"
/>

<button
className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded text-white w-full lg:w-auto"
>
{editingDoctor ? "Update Doctor" : "Add Doctor"}
</button>

</form>

)

}