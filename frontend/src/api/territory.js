import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((req)=>{
  const token = localStorage.getItem("token");
  if(token){
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getTerritories = ()=>API.get("/territory");
export const createTerritory = (data)=>API.post("/territory",data);
export const deleteTerritory = (id)=>API.delete(`/territory/${id}`);