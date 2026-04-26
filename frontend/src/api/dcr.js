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

export const getDCR = ()=>API.get("/dcr")

export const submitDCR = (id)=>API.post(`/dcr/submit/${id}`)

// 🔥 FIX HERE
export const reviewDCR = (id,action)=> 
API.post(`/dcr/review/${id}`, { action })

export const exportDCR = (id)=> 
API.get(`/dcr/export/${id}`,{ responseType:"blob" })