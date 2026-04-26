import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function AddVisit(){

const navigate = useNavigate()

const [doctors,setDoctors] = useState([])
const [products,setProducts] = useState([])

const [doctor,setDoctor] = useState("")
const [notes,setNotes] = useState("")
const [selectedProducts,setSelectedProducts] = useState([])

const [loading,setLoading] = useState(false)

/* ================= FETCH ================= */

useEffect(()=>{

const fetchData = async()=>{

try{

// 🔥 Assigned Doctors
const docRes = await API.get("/mr/my-doctors")

const prodRes = await API.get("/products")

setDoctors(docRes.data.doctors || [])
setProducts(prodRes.data.products || [])

}catch(err){
console.error(err)
}

}

fetchData()

},[])

/* ================= ADD PRODUCT ================= */

const handleAddProduct = (productId)=>{

const exists = selectedProducts.find(p=>p.product===productId)

if(exists) return

setSelectedProducts([
...selectedProducts,
{ product:productId, sampleQty:1 }
])

}

/* ================= UPDATE QTY ================= */

const updateQty = (productId,type)=>{

const updated = selectedProducts.map(p=>{

if(p.product===productId){

return{
...p,
sampleQty:
type==="inc"
? p.sampleQty+1
: Math.max(1,p.sampleQty-1)
}

}

return p

})

setSelectedProducts(updated)

}

/* ================= REMOVE PRODUCT ================= */

const removeProduct = (productId)=>{
setSelectedProducts(
selectedProducts.filter(p=>p.product!==productId)
)
}

/* ================= SUBMIT ================= */

const handleSubmit = async()=>{

if(!doctor){
return alert("Select doctor first ⚠️")
}

if(selectedProducts.length===0){
return alert("Add product ⚠️")
}

try{

setLoading(true)

await API.post("/visits",{
doctor,
notes,
productsDiscussed:selectedProducts
})

alert("Visit Created Successfully ✅")

setDoctor("")
setNotes("")
setSelectedProducts([])

}catch(err){

console.error(err)

alert(
err.response?.data?.message || 
"Error creating visit"
)

}
finally{
setLoading(false)
}

}

return(

<div className="flex bg-[#020617] text-white min-h-screen">

<Sidebar/>

<div className="flex-1 ml-64 p-8">

{/* HEADER */}

<div className="flex items-center gap-4 mb-8">

<button
onClick={()=>navigate(-1)}
className="w-10 h-10 bg-white/5 rounded-xl"
>
←
</button>

<h1 className="text-3xl font-bold">
Add Visit
</h1>

</div>

<div className="bg-white/5 p-6 rounded-xl">

{/* DOCTOR */}

<select
value={doctor}
onChange={(e)=>setDoctor(e.target.value)}
className="w-full mb-6 px-4 py-3 bg-[#020617] border border-white/10 rounded"
>

<option value="">
Select Doctor
</option>

{doctors.map(d=>(

<option key={d._id} value={d._id}>
{d.name} ({d.specialization})
</option>

))}

</select>

{/* NOTES */}

<textarea
placeholder="Visit Notes"
value={notes}
onChange={(e)=>setNotes(e.target.value)}
className="w-full mb-6 px-4 py-3 bg-[#020617] border border-white/10 rounded"
/>

{/* PRODUCTS */}

<div className="mb-6">

<p className="mb-3 font-medium">
Select Products
</p>

<select
  onChange={(e)=>{
    if(e.target.value){
      handleAddProduct(e.target.value)
      e.target.value = ""
    }
  }}
  className="w-full mb-6 px-4 py-3 bg-[#020617] border border-white/10 rounded text-white"
>
  <option value="">Select Product</option>

  {products.map(p=>(
    <option key={p._id} value={p._id}>
      {p.name}
    </option>
  ))}
</select>

<div className="flex flex-wrap gap-2">

{products.map(p=>(

<button
key={p._id}
onClick={()=>handleAddProduct(p._id)}
className="px-3 py-1 bg-blue-600/80 hover:bg-blue-600 rounded"
>

{p.name}

</button>

))}

</div>

</div>

{/* SELECTED PRODUCTS */}

{selectedProducts.length>0 &&(

<div className="mb-6">

<p className="mb-3 font-medium">
Selected Products
</p>

<div className="space-y-3">

{selectedProducts.map(p=>{

const productData=
products.find(
prod=>prod._id===p.product
)

return(

<div
key={p.product}
className="flex justify-between bg-white/5 p-3 rounded"
>

<span>
{productData?.name}
</span>

<div className="flex gap-3">

<button
onClick={()=>updateQty(p.product,"dec")}
className="px-2 bg-red-500 rounded"
>
-
</button>

<span>
{p.sampleQty}
</span>

<button
onClick={()=>updateQty(p.product,"inc")}
className="px-2 bg-green-500 rounded"
>
+
</button>

<button
onClick={()=>removeProduct(p.product)}
className="text-red-400"
>
✕
</button>

</div>

</div>

)

})}

</div>

</div>

)}

<button
onClick={handleSubmit}
disabled={loading}
className="w-full bg-green-600 py-3 rounded"
>

{loading
? "Submitting..."
: "Submit Visit"}

</button>

</div>

</div>

</div>

)

}