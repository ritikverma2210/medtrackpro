import axios from "axios"

const API = axios.create({
  baseURL:"http://localhost:5000/api"
})

API.interceptors.request.use((req)=>{
  const token = localStorage.getItem("token")
  if(token){
    req.headers.Authorization=`Bearer ${token}`
  }
  return req
})

export const getProducts = ()=>API.get("/products")

export const createProduct = (data)=>API.post("/products",data)

export const updateProduct = (id,data)=>API.put(`/products/${id}`,data) 

export const deleteProduct = (id)=>API.delete(`/products/${id}`)