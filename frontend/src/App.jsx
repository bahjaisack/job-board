import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
// import DashboardLayout from "./components/dashboard";

function App() {
  return (      
    <Router>
            <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/employee" element={<EmployeeDashboard/>} />
        {/* <EmployeeDashboard> */}
        <Route path="/profile" element={<Profile/>} />
        <Route path="/Jobs" element={<Jobs/>} />
        <Route path="/History" element={<History/>} />
        {/* </EmployeeDashboard> */}
        <Route path="/roless" element={<RoleSelection/>} />
        <Route path="/register-employer" element={<EmployerForm/>}/>
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path="/jobs" element={<Jobs/>}/>


      </Routes>
    </Router>
  );
}

export default App;
