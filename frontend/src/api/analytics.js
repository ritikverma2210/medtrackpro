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

export const getMonthlyVisits = ()=>API.get("/analytics/visits-monthly")

export const getMRPerformance = ()=>API.get("/analytics/mr-performance")

export const getDCRStatus = ()=>API.get("/analytics/dcr-status")

export const getTerritoryPerformance = ()=>API.get("/analytics/territory-performance")