import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { loginUser } from "../api/auth"
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa"
import Particles from "../components/Particles"
import { FaArrowLeft } from "react-icons/fa"

export default function Login() {

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)
const [error,setError] = useState("")
const [showPassword,setShowPassword] = useState(false)

const handleSubmit = async (e)=>{
e.preventDefault()

if(!email || !password){
setError("Please fill all fields")
return
}

try{

setLoading(true)
setError("")

const res = await loginUser({
email,
password
})

const token = res.data?.token
const user = res.data?.user
const mrId = res.data?.mrId || null

localStorage.setItem("token", token)

localStorage.setItem("user", JSON.stringify({
...user,
mrId
}))

const role = user?.role?.toUpperCase()
localStorage.setItem("role", role)

if(role === "ADMIN"){
navigate("/admin/dashboard")
} 
else if(role === "MR"){
navigate("/mr/dashboard")
}
else if(role === "DOCTOR"){
navigate("/doctor/dashboard")
}

}catch(err){
setError(
err.response?.data?.message || 
"Login failed"
)
}
finally{
setLoading(false)
}

}

return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] relative overflow-hidden px-6">
  <Particles />

{/* Back Button */}

<button
onClick={()=>navigate("/")}
className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg text-white hover:bg-white/10 transition"
>

<FaArrowLeft />

<span className="text-sm">
Back
</span>

</button>

{/* Glow Effects */}

<div className="absolute w-[600px] h-[600px] bg-blue-600/20 blur-[160px] rounded-full -top-40 -left-40"></div>
<div className="absolute w-[600px] h-[600px] bg-indigo-600/20 blur-[160px] rounded-full bottom-[-200px] right-[-200px]"></div>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.5}}
className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-10"
>

{/* ICON */}

<div className="flex justify-center mb-6">

<div className="w-16 h-16 rounded-xl bg-blue-600/20 flex items-center justify-center">

<FaShieldAlt className="text-blue-400 text-2xl"/>

</div>

</div>

<h2 className="text-3xl font-bold text-white text-center mb-2">
Welcome Back
</h2>

<p className="text-gray-400 text-center mb-8">
Login to your MedTrackPro account
</p>

{/* Error */}

{error && (

<div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm">
{error}
</div>

)}

<form onSubmit={handleSubmit} className="space-y-5">

{/* Email */}

<div className="relative">

<FaEnvelope className="absolute left-4 top-4 text-gray-400"/>

<input
type="email"
placeholder="Email address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full pl-11 pr-4 py-3 bg-[#020617] border border-white/10 rounded-lg text-white outline-none focus:border-blue-500 transition"
/>

</div>

{/* Password */}

<div className="relative">

<FaLock className="absolute left-4 top-4 text-gray-400"/>

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full pl-11 pr-10 py-3 bg-[#020617] border border-white/10 rounded-lg text-white outline-none focus:border-blue-500 transition"
/>

<button
type="button"
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-3 top-4 text-gray-400"
>
{showPassword ? <FaEyeSlash/> : <FaEye/>}
</button>

</div>

{/* Remember */}

<div className="flex justify-between items-center text-sm">

<label className="flex items-center gap-2 text-gray-400">
<input type="checkbox" className="accent-blue-600"/>
Remember me
</label>

<span className="text-blue-400 hover:underline cursor-pointer">
Forgot password?
</span>

</div>

<button
type="submit"
disabled={loading}
className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-medium transition shadow-lg shadow-blue-600/30 disabled:opacity-50"
>
{loading ? "Logging in..." : "Login"}
</button>

</form>

</motion.div>

</div>

)

}