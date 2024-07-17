import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home';
import About from './pages/about'
import Contact from './pages/contact'
import Login from './components/employerlogin'
import { ToastContainer } from "react-toastify";
import EmployeeDashboard from "./components/employeedashboard";
import History from "./components/history";
import Jobs from "./components/job";
import Profile from "./components/profile";
import RoleSelection from "./components/role";
import EmployerForm from "./components/employerform";
import PrivateRoute from './components/privateroute';
import Account from './components/account';
import EmployerDashboard from "./components/employerdashboard";
// import DashboardLayout from "./components/dashboard";
import ApplicationForm from "./components/ApplicationForm";
import Logout from "./components/logout";
import JobForm from "./components/ApplicationStatus";
import Jobsmody from "./components/jobsmodify"
import Dashboard from "./components/dashboard";
import DashboardEmployee from "./components/dashboardemployee";
import ForgotPassword from "./components/forgetpassword";
import ResetPassword from "./components/reset";
function App() {
  return (      
    <Router>
            <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route
          path="/employer-dashboard"
          element={
            <PrivateRoute>
              <EmployeeDashboard />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoute>
              <EmployerDashboard />
            </PrivateRoute>
          }
        />

<Route path="*" element={<Navigate to="/" />} />

        {/* <EmployeeDashboard> */}
        <Route path="/profile" element={<Profile/>} />
        <Route path="/history" element={<History/>} />
        {/* </EmployeeDashboard> */}
        <Route path="/roless" element={<RoleSelection/>} />
        <Route path="/register-employer" element={<EmployerForm/>}/>
        <Route path="/account" element={<Account />}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/apply/:jobId" element={<ApplicationForm/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/jobpost" element={<JobForm/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard2" element={<DashboardEmployee/>} />
        <Route path="/modify" element={<Jobsmody/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />







      </Routes>
    </Router>
  );
}

export default App;
