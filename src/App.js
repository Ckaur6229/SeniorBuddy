import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Master from './components/Layout/Master';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import AdminMaster from './components/Layout/AdminMaster';
import Dashboard from './components/admin/Dashboard';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SeniorMaster from './components/Layout/SeniorMaster';

import AddEvent from './components/Experts/AddEvent';
import EditEvents from './components/Experts/EditEvents';
import ManageEvents from './components/Experts/ManageEvents';
import Junior from './components/admin/viewUsers/Junior';
import Seniors from './components/admin/viewUsers/Seniors';
import ViewFutureEvents from './components/otherUsers/ViewFutureEvents';
import ViewPastEvents from './components/otherUsers/ViewPastEvents';
import Profile from './components/Experts/Profile';
import JunProfile from './components/otherUsers/JunProfile';
import Join from './components/otherUsers/Join';
import ViewRequest from './components/Experts/ViewRequest';
import SeniorRegisteration from './components/auth/SeniorRegisteration';
import History from './components/otherUsers/History';
import StartChatting from './components/chat/StartChatting';
import WebDevChat from './components/chat/WebDevChat';
import AppDevChat from './components/chat/AppDevChat';
import AIChat from './components/chat/AIChat';
import CyberChat from './components/chat/CyberChat';
import DigitalChat from './components/chat/DigitalChat';
import DataSciChat from './components/chat/DataSciChat';
import SeniorHome from './components/pages/SeniorHome';
import ViewEvents from './components/admin/ViewEvents';
import ViewAttendies from './components/admin/ViewAttendies';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<Master/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/registration/:type" element={<Registration/>}/>
      <Route path="/seniorRegistration/:type" element={<SeniorRegisteration/>}/>
      <Route path="/upcommingEvents" element={<ViewFutureEvents/>}/>
      <Route path="/pastEvents" element={<ViewPastEvents/>}/>
      <Route path="/juniorProfile" element={<JunProfile/>}/>
      <Route path="/join/:id" element={<Join/>}/>
      <Route path="/history" element={<History/>}/>
      <Route path="/startchatting" element={<StartChatting/>}/>
      <Route path='/webdevchat' element={<WebDevChat/>}/>
      <Route path='/appdevchat' element={<AppDevChat/>}/>
      <Route path='/aichat' element={<AIChat/>}/>
      <Route path='/cyberchat' element={<CyberChat/>}/>
      <Route path='/digitalchat' element={<DigitalChat/>}/>
      <Route path='/datascichat' element={<DataSciChat/>}/>
    </Route>

    <Route path="/admin" element={<AdminMaster/>}>
    <Route path="/admin" element={<Dashboard />}></Route>
    <Route path="/admin/viewjuniors" element={<Junior />}/>
    <Route path="/admin/viewseniors" element={<Seniors />}/>
    <Route path="/admin/viewevents" element={<ViewEvents />}/>
    <Route path="/admin/viewattendies" element={<ViewAttendies />}/>
    </Route>

    <Route path='/senior' element={<SeniorMaster/>}>
      <Route path="/senior" element={<SeniorHome/>}></Route>
      <Route path='/senior/addevent' element={<AddEvent/>}/>
      <Route path='/senior/editevent/:id' element={<EditEvents/>}/>
      <Route path='/senior/manageevent' element={<ManageEvents/>}/>
      <Route path='/senior/profile' element={<Profile/>}/>
      <Route path='/senior/viewRequest' element={<ViewRequest/>}/>
      <Route path='/senior/webdevchat' element={<WebDevChat/>}/>
      <Route path='/senior/appdevchat' element={<AppDevChat/>}/>
      <Route path='/senior/aichat' element={<AIChat/>}/>
      <Route path='/senior/cyberchat' element={<CyberChat/>}/>
      <Route path='/senior/digitalchat' element={<DigitalChat/>}/>
      <Route path='/senior/datascichat' element={<DataSciChat/>}/>
    </Route>

    </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </>
  );
}

export default App;
