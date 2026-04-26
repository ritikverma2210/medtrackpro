import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import MRDashboard from "./pages/MRDashboard"
import Register from "./pages/Register"
import Doctors from "./pages/Doctors"
import MRManagement from "./pages/MRManagement"
import Territory from "./pages/Territories"
import Products from "./pages/Products"
import Visits from "./pages/Visits"
import DCR from "./pages/DCR"
import Analytics from "./pages/Analytics"
import AddVisit from "./pages/AddVisit"
import MRProfile from "./pages/MRProfile";
import MyDoctors from "./pages/MyDoctors"
import MyVisits from "./pages/MyVisits"
import SubmitDCR from "./pages/SubmitDCR"
import DoctorDashboard from "./pages/DoctorDashboard"
import DoctorProfile from "./pages/DoctorProfile"
import DoctorVisitHistory from "./pages/DoctorVisitHistory"
import DoctorNotifications from "./pages/DoctorNotifications"
import DoctorAnalytics from "./pages/DoctorAnalytics"
import AdminDoctorProfile from "./pages/AdminDoctorProfile"
import AdminMRPerformance from "./pages/AdminMRPerformance"
import DemoDashboard from "./pages/DemoDashboard"
import Contact from "./pages/Contact"


function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/demo-dashboard" element={<DemoDashboard/>} />

      <Route path="/contact" element={<Contact/>}/>

      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard/>
          </ProtectedRoute>
        }
      />

      <Route
path="/mr-performance"
element={
<ProtectedRoute>
<AdminMRPerformance/>
</ProtectedRoute>
}
/>

      <Route
path="/doctors/:id"
element={
<ProtectedRoute>
<AdminDoctorProfile/>
</ProtectedRoute>
}
/>

       <Route
        path="/mr/dashboard"
        element={
          <ProtectedRoute>
            <MRDashboard/>
          </ProtectedRoute>
        }
      />

      <Route path="/territories" element={<Territory/>}/>
      
      <Route path="/products" element={<Products/>}/>
      
      <Route path="/visits" element={<Visits/>}/>
      
      <Route path="/dcr" element={<DCR/>}/>
      
      <Route path="/analytics" element={<Analytics/>}/>

      <Route path="/mr-management" element={<MRManagement/>}/>

      <Route path="/doctors" element={<Doctors/>}/>

      <Route path="/visit" element={<AddVisit/>}/>


      <Route path="/register" element={<Register />} />

      <Route path="/my-doctors" element={<MyDoctors />} />

      <Route path="/mr/:id" element={<MRProfile />} />

      <Route
path="/mr/profile"
element={
<ProtectedRoute>
<MRProfile/>
</ProtectedRoute>
}
/>

      <Route path="/my-visits" element={<MyVisits/>}/>

      <Route path="/submit-dcr" element={<SubmitDCR/>}/>

     <Route
path="/doctor/dashboard"
element={
<ProtectedRoute>
<DoctorDashboard/>
</ProtectedRoute>
}
/>

<Route
path="/doctor/notifications"
element={
<ProtectedRoute>
<DoctorNotifications/>
</ProtectedRoute>
}
/>

<Route
path="/doctor/profile"
element={
<ProtectedRoute>
<DoctorProfile/>
</ProtectedRoute>
}
/>

<Route
path="/doctor/analytics"
element={
<ProtectedRoute>
<DoctorAnalytics/>
</ProtectedRoute>
}
/>

<Route
path="/doctor/visits"
element={
<ProtectedRoute>
<DoctorVisitHistory/>
</ProtectedRoute>
}
/>

      <Route
path="/doctor/dashboard"
element={
<ProtectedRoute>
<DoctorDashboard/>
</ProtectedRoute>
}
/>

<Route
path="/doctor/profile"
element={<DoctorProfile/>}
/>

    </Routes>
  </div>
  )
}

export default App
