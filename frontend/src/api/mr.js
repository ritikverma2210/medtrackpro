import API from "./axios"


API.interceptors.request.use((req)=>{
  const token = localStorage.getItem("token")

  if(token){
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})

export const getMRProfile = (id) => API.get(`/mr/${id}`);

export const getMRs = () => API.get("/mr")

export const createMR = (data) => API.post("/mr", data)

export const assignTerritory = (data) => API.post("/mr/assign-territory", data)

export const assignDoctor = (data) => API.post("/mr/assign-doctor", data)

export const getMyDoctors = () => API.get("/mr/my-doctors")