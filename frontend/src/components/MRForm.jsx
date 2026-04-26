import { useState } from "react"

export default function MRForm({ onSubmit }){

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!form.name || !form.email || !form.password){
      alert("All fields required")
      return
    }

    onSubmit(form)

    setForm({
      name:"",
      email:"",
      password:""
    })
  }

  return(

    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="MR Name"
        className="px-4 py-2 bg-[#020617] border border-white/10 rounded text-white w-full"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="px-4 py-2 bg-[#020617] border border-white/10 rounded text-white w-full"
      />

      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
        className="px-4 py-2 bg-[#020617] border border-white/10 rounded text-white w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 px-4 py-2 rounded w-full md:w-auto"
      >
        Add MR
      </button>

    </form>

  )

}