import { useState,useEffect } from "react"
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../api/product"

import Sidebar from "../components/Sidebar"
import { useNavigate } from "react-router-dom"

export default function Products(){

  const navigate = useNavigate()

  const [products,setProducts] = useState([])
  const [search,setSearch] = useState("")
  const [categoryFilter,setCategoryFilter] = useState("all")
  const [editing,setEditing] = useState(null)

  const [form,setForm] = useState({
    name:"",
    brand:"",
    category:"",
    composition:"",
    price:""
  })

  // 🔥 FETCH PRODUCTS
  const fetchProducts = async()=>{
    try{
      const res = await getProducts()
      setProducts(res.data.products || [])
    }catch(err){
      console.error("Fetch Products Error:",err)
    }
  }

  useEffect(()=>{
    fetchProducts()
  },[])

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  // 🔥 CREATE PRODUCT (FIXED)
  const handleCreate = async()=>{
  try{

    if(!form.name || !form.brand){
      alert("Name & Brand required")
      return
    }

    const res = await createProduct(form)

    console.log("CREATE RES:", res.data) // 🔥 DEBUG

    // ✅ SAFE UPDATE (no dependency on response shape)
    fetchProducts()

    setForm({
      name:"",
      brand:"",
      category:"",
      composition:"",
      price:""
    })

  }catch(err){
    console.error("Create Product Error:",err)
  }
}

  const handleUpdate = async()=>{
    try{
      await updateProduct(editing._id,form)
      setEditing(null)
      fetchProducts()
    }catch(err){
      console.error("Update Error:",err)
    }
  }

  const handleDelete = async(id)=>{
    if(!window.confirm("Delete product?")) return

    try{
      await deleteProduct(id)
      setProducts(prev => prev.filter(p=>p._id !== id)) // ⚡ instant delete
    }catch(err){
      console.error("Delete Error:",err)
    }
  }

  const toggleStatus = async(p)=>{
    try{
      await updateProduct(p._id,{ isActive: !p.isActive })

      setProducts(prev =>
        prev.map(item =>
          item._id === p._id
            ? { ...item, isActive: !item.isActive }
            : item
        )
      )

    }catch(err){
      console.error("Status Toggle Error:",err)
    }
  }

  const categories = ["all",...new Set(products.map(p=>p.category).filter(Boolean))]

  const filtered = products
    .filter(p=>p.name?.toLowerCase().includes(search.toLowerCase()))
    .filter(p=>categoryFilter==="all" || p.category===categoryFilter)

  return(

    <div className="flex bg-[#020617] text-white min-h-screen">

      <Sidebar/>

      <div className="flex-1 w-full md:ml-64 p-4 md:p-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <div className="flex items-center gap-4">

            <button
              onClick={()=>navigate(-1)}
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
            >
              ←
            </button>

            <h1 className="text-2xl md:text-3xl font-bold">
              Product Management
            </h1>

          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <input
              placeholder="Search..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="px-4 py-2 bg-[#020617] border border-white/10 rounded w-full"
            />

            <select
              value={categoryFilter}
              onChange={(e)=>setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-[#020617] border border-white/10 rounded w-full"
            >
              {categories.map(c=>(
                <option key={c}>{c}</option>
              ))}
            </select>

          </div>

        </div>

        {/* FORM */}
        <div className="bg-white/5 p-4 md:p-6 rounded-xl mb-8">

          <h2 className="mb-4">
            {editing ? "Edit Product" : "Add Product"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="px-4 py-2 bg-[#020617] border border-white/10 rounded"/>
            <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="px-4 py-2 bg-[#020617] border border-white/10 rounded"/>
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="px-4 py-2 bg-[#020617] border border-white/10 rounded"/>
            <input name="composition" value={form.composition} onChange={handleChange} placeholder="Composition" className="px-4 py-2 bg-[#020617] border border-white/10 rounded"/>
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="px-4 py-2 bg-[#020617] border border-white/10 rounded"/>

            {editing ? (
              <button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-500 rounded-lg px-4 py-2 w-full lg:w-auto"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="bg-blue-600 hover:bg-blue-500 rounded-lg px-4 py-2 w-full lg:w-auto"
              >
                Add
              </button>
            )}

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white/5 rounded-xl overflow-hidden w-full">

          <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-white/5">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Brand</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Composition</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-6 text-gray-400">
                    No products found
                  </td>
                </tr>
              )}

              {filtered.map(p=>(

                <tr key={p._id} className="border-t border-white/10">

                  <td className="p-4">{p.name}</td>
                  <td className="p-4">{p.brand}</td>
                  <td className="p-4">{p.category || "-"}</td>
                  <td className="p-4">{p.composition || "-"}</td>
                  <td className="p-4">₹ {p.price || 0}</td>

                  <td className="p-4">
                    <button
                      onClick={()=>toggleStatus(p)}
                      className={`px-3 py-1 rounded ${
                        p.isActive ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {p.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="p-4 space-x-3">

                    <button
                      onClick={()=>{
                        setEditing(p)
                        setForm(p)
                      }}
                      className="text-blue-400"
                    >
                      Edit
                    </button>

                    <button
                      onClick={()=>handleDelete(p._id)}
                      className="text-red-400"
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