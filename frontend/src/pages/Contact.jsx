import { Mail, Phone, Github, Linkedin, Instagram, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Contact(){

const navigate = useNavigate()

const [form,setForm] = useState({
name:"",
email:"",
message:""
})

const handleChange = (e)=>{
setForm({
...form,
[e.target.name]:e.target.value
})
}

const handleSubmit = (e)=>{
e.preventDefault()

const subject = "MedTrackPro Contact"
const body = `Name: ${form.name}%0AEmail: ${form.email}%0A%0A${form.message}`

window.location.href = `mailto:kanhaverma4104@gmail.com?subject=${subject}&body=${body}`
}

return(

<div className="min-h-screen bg-[#020617] text-white py-20 px-6">

{/* Back Button */}

<button
onClick={()=>navigate("/")}
className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
>
<ArrowLeft size={18}/>
Back
</button>


<div className="max-w-6xl mx-auto">

<h1 className="text-4xl font-bold text-center mb-16">
Contact
</h1>

<div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 grid md:grid-cols-2 gap-10">

{/* LEFT SIDE */}

<div>

<h2 className="text-2xl font-semibold mb-4">
Get In Touch
</h2>

<p className="text-blue-100 mb-8">
Feel free to reach out for internships, projects or collaborations.
</p>

<div className="space-y-4">

<a
href="mailto:kanhaverma4104@gmail.com"
className="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition"
>
<Mail size={18}/>
<span>kanhaverma4104@gmail.com</span>
</a>

<a
href="tel:+916392168326"
className="flex items-center gap-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition"
>
<Phone size={18}/>
<span>+91 6392168326</span>
</a>

</div>

{/* SOCIAL ICONS */}

<div className="flex gap-4 mt-8">

<a
href="https://github.com/ritikverma2210"
target="_blank"
rel="noopener noreferrer"
className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
>
<Github/>
</a>

<a
href="https://www.linkedin.com/in/ritik-verma-38a114357"
target="_blank"
rel="noopener noreferrer"
className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
>
<Linkedin/>
</a>

<a
href="https://www.instagram.com/_ritik.x22"
target="_blank"
rel="noopener noreferrer"
className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
>
<Instagram/>
</a>

</div>

</div>


{/* RIGHT SIDE FORM */}

<div className="bg-white text-black rounded-2xl p-8">

<h3 className="text-xl font-semibold mb-6">
Send me a message
</h3>

<form onSubmit={handleSubmit} className="space-y-4">

<input
name="name"
placeholder="Your Name"
onChange={handleChange}
className="w-full border p-3 rounded-lg"
/>

<input
name="email"
placeholder="Your Email"
onChange={handleChange}
className="w-full border p-3 rounded-lg"
/>

<textarea
name="message"
placeholder="Your Message"
rows="5"
onChange={handleChange}
className="w-full border p-3 rounded-lg"
/>

<button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
Send Message
</button>

</form>

</div>

</div>

</div>

</div>

)

}