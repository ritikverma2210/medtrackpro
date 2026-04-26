import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../api/auth"
import { motion } from "framer-motion"
import { ArrowLeft, Shield } from "lucide-react"
import ParticlesBG from "../components/ParticlesBG"

export default function Register() {

const navigate = useNavigate()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)
const [error,setError] = useState("")

const handleSubmit = async (e)=>{
e.preventDefault()

if(!name || !email || !password){
setError("Please fill all fields")
return
}

try{

setLoading(true)
setError("")

await registerUser({
name,
email,
password
})

navigate("/login")

}catch(err){

setError(
err.response?.data?.message ||
"Registration failed"
)

}
finally{
setLoading(false)
}

}

return (

<div className="min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden px-6">

{/* ⭐ Particles Background */}
<ParticlesBG/>

{/* Glow */}
<div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[140px] rounded-full -top-40 -left-40"></div>
<div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-[140px] rounded-full bottom-[-200px] right-[-200px]"></div>

{/* Back Button */}
<button
onClick={()=>navigate("/")}
className="absolute top-8 left-8 flex items-center gap-2 text-white bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/10 transition"
>
<ArrowLeft size={16}/>
Back
</button>

{/* CARD */}
<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-10"
>

{/* Icon */}
<div className="flex justify-center mb-6">
<div className="bg-blue-600/20 p-4 rounded-xl">
<Shield className="text-blue-400" size={26}/>
</div>
</div>

<h2 className="text-3xl font-bold text-white text-center mb-2">
Create Account
</h2>

<p className="text-gray-400 text-center mb-8">
Start using MedTrackPro today
</p>

{error && (

<div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4">
{error}
</div>

)}

<form onSubmit={handleSubmit} className="space-y-6">

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-lg text-white outline-none focus:border-blue-500"
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-lg text-white outline-none focus:border-blue-500"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-lg text-white outline-none focus:border-blue-500"
/>

<button
type="submit"
disabled={loading}
className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-medium transition shadow-lg shadow-blue-600/30 disabled:opacity-50"
>
{loading ? "Creating..." : "Create Account"}
</button>

</form>

<p className="text-gray-400 text-sm mt-6 text-center">
Already have an account?{" "}
<span
onClick={()=>navigate("/login")}
className="text-blue-400 cursor-pointer hover:underline"
>
Login
</span>
</p>

</motion.div>

</div>

)

}