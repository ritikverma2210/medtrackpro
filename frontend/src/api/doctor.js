import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

API.interceptors.request.use((req)=>{
  const token = localStorage.getItem("token")

  if(token){
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})

export const getDoctors = () => API.get("/doctors")

export const createDoctor = (data) => API.post("/doctors", data)

export const updateDoctor = (id,data) => API.put(`/doctors/${id}`,data)

export const deleteDoctor = (id) => API.delete(`/doctors/${id}`)