import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import {
  getMonthlyVisits,
  getMRPerformance,
  getDCRStatus,
  getTerritoryPerformance
} from "../api/analytics"

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts"
import { useNavigate } from "react-router-dom"

export default function Analytics(){

  const [monthly,setMonthly] = useState([])
  const [mrStats,setMrStats] = useState([])
  const [dcrStats,setDcrStats] = useState([])
  const [territory,setTerritory] = useState([])
  const navigate = useNavigate()

  const fetchAll = async()=>{
    try{
      const m = await getMonthlyVisits()
      const mr = await getMRPerformance()
      const d = await getDCRStatus()
      const t = await getTerritoryPerformance()

      setMonthly(m.data.stats)
      setMrStats(mr.data.stats)
      setDcrStats(d.data.stats)
      setTerritory(t.data.stats)

    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    fetchAll()
  },[])

  const monthlyData = monthly.map(m=>({
    name: `${m._id.month}/${m._id.year}`,
    visits: m.totalVisits
  }))

  const mrData = mrStats.map(m=>({
    name: m.mr?.employeeCode || "MR",
    visits: m.totalVisits
  }))

  return(

    <div className="flex bg-[#020617] text-white min-h-screen">

      <Sidebar/>

      <div className="flex-1 w-full md:ml-64 p-4 md:p-8">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            ←
          </button>

          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Analytics Dashboard 🚀
          </h1>

        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">

          <div className="bg-white/5 p-4 md:p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Monthly Entries</p>
            <h2 className="text-2xl md:text-3xl font-bold">
              {monthly.length}
            </h2>
          </div>

          <div className="bg-white/5 p-4 md:p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Total MR</p>
            <h2 className="text-2xl md:text-3xl font-bold">
              {mrStats.length}
            </h2>
          </div>

          <div className="bg-white/5 p-4 md:p-6 rounded-xl">
            <p className="text-gray-400 text-sm">DCR Types</p>
            <h2 className="text-2xl md:text-3xl font-bold">
              {dcrStats.length}
            </h2>
          </div>

          <div className="bg-white/5 p-4 md:p-6 rounded-xl">
            <p className="text-gray-400 text-sm">Territories</p>
            <h2 className="text-2xl md:text-3xl font-bold">
              {territory.length}
            </h2>
          </div>

        </div>

        {/* MONTHLY VISITS */}
        <div className="bg-white/5 p-4 md:p-6 rounded-xl mb-10">

          <h2 className="mb-4 font-semibold">
            Monthly Visits Trend
          </h2>

          <div className="h-[250px] md:h-[300px]">

            <ResponsiveContainer>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937"/>
                <XAxis dataKey="name" stroke="#9ca3af"/>
                <YAxis stroke="#9ca3af"/>
                <Tooltip/>
                <Bar dataKey="visits" fill="#3b82f6" radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* MR PERFORMANCE */}
        <div className="bg-white/5 p-4 md:p-6 rounded-xl mb-10">

          <h2 className="mb-4 font-semibold">
            MR Performance
          </h2>

          <div className="h-[250px] md:h-[300px]">

            <ResponsiveContainer>
              <BarChart data={mrData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937"/>
                <XAxis dataKey="name" stroke="#9ca3af"/>
                <YAxis stroke="#9ca3af"/>
                <Tooltip/>
                <Bar dataKey="visits" fill="#10b981" radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* DCR STATUS */}
        <div className="bg-white/5 p-4 md:p-6 rounded-xl mb-10">

          <h2 className="mb-4 font-semibold">
            DCR Status Overview
          </h2>

          {dcrStats.map((d,i)=>(
            <div key={i} className="flex justify-between mb-2 text-sm md:text-base">
              <span>{d._id}</span>
              <span>{d.count}</span>
            </div>
          ))}

        </div>

        {/* TERRITORY */}
        <div className="bg-white/5 p-4 md:p-6 rounded-xl">

          <h2 className="mb-4 font-semibold">
            Territory Performance
          </h2>

          {territory.map((t,i)=>(
            <div key={i} className="flex justify-between mb-2 text-sm md:text-base">
              <span>{t.territory?.name}</span>
              <span>{t.totalMRs}</span>
            </div>
          ))}

        </div>

      </div>

    </div>
  )
}