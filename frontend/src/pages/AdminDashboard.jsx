import { useEffect, useState } from "react"
import DashboardLayout from "../components/DashboardLayout"
import { getDashboard } from "../api/dashboard"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

export default function AdminDashboard(){

  const [stats,setStats] = useState({
    totalDoctors:0,
    totalMRs:0,
    todayVisits:0,
    pendingDCR:0
  })

  const [recent,setRecent] = useState([])

  const data = [
    { name:"Mon",visits:40},
    { name:"Tue",visits:65},
    { name:"Wed",visits:50},
    { name:"Thu",visits:90},
    { name:"Fri",visits:70},
    { name:"Sat",visits:60}
  ]

  useEffect(()=>{

    const fetchDashboard = async ()=>{

      try{

        const res = await getDashboard()
        const dashboard = res.data.dashboard

        setStats({
          totalDoctors: dashboard.totalDoctors || 0,
          totalMRs: dashboard.totalMRs || 0,
          todayVisits: dashboard.todayVisits || 0,
          pendingDCR: dashboard.dcrStats?.pending || 0
        })

        setRecent(dashboard.recentActivity || [])

      }catch(err){
        console.error("Dashboard error",err)
      }

    }

    fetchDashboard()

  },[])

  return(

    <DashboardLayout>

      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* STATS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">

        <Card title="Total Doctors" value={stats.totalDoctors}/>
        <Card title="Total MR" value={stats.totalMRs}/>
        <Card title="Today's Visits" value={stats.todayVisits}/>
        <Card title="Pending DCR" value={stats.pendingDCR}/>

      </div>

      {/* CHART */}

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 mb-10">

        <h2 className="text-lg md:text-xl font-semibold mb-6">
          Weekly MR Visits
        </h2>

        <div className="w-full h-[300px] min-h-[300px]">

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>

              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937"/>
              <XAxis dataKey="name" stroke="#9ca3af"/>
              <YAxis stroke="#9ca3af"/>
              <Tooltip/>

              <Bar
                dataKey="visits"
                fill="#3b82f6"
                radius={[6,6,0,0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* RECENT ACTIVITY */}

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6">

        <h2 className="text-lg md:text-xl font-semibold mb-4">
          Recent Activity
        </h2>

        {recent.length === 0 ? (

          <p className="text-gray-400">
            No recent activity
          </p>

        ) : (

          <ul className="space-y-3 text-gray-300">

            {recent.map((item,index)=>(
              <li
                key={index}
                className="bg-white/5 p-3 rounded"
              >
                {/* 🔥 SAFE RENDER FIX */}
                {typeof item === "string"
                  ? item
                  : item?.message || "Activity recorded"}
              </li>
            ))}

          </ul>

        )}

      </div>

    </DashboardLayout>

  )

}


/* CARD COMPONENT */

function Card({title,value}){

  return(

    <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-xl hover:bg-white/10 transition">

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mt-2 text-blue-400">
        {value}
      </h2>

    </div>

  )

}