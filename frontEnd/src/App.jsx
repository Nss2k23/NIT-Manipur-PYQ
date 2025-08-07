
import SignUp from './pages/SignUp.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LogIn from './pages/LogIn.jsx'
import Home from './pages/Home.jsx'
import ForgetPassword from './pages/forgetPassword.jsx'
import ResetPassword from './pages/resetPassword.jsx'
import { Navigate } from 'react-router-dom'
import ProtectedRoute from './pages/ProtectedRoute';
import AdminLogIn from './pages/AdminLogIn.jsx';
import AdminProtectedRoute from './pages/AdminProtectedRoute';
import AdminHome from './pages/AdminHome';
import Upload from './pages/Upload.jsx';


function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Navigate to="/home"/>} />
      <Route path='/signUp' element={<SignUp/>}></Route>
      <Route path='/logIn' element={<LogIn/>}></Route>
      <Route path='/forgetPassword' element={<ForgetPassword/>}></Route>
      <Route path='https://nit-manipur-pyq.onrender.com/resetPassword' element={<ResetPassword/>}></Route>
      <Route path='/adminLogIn' element={<AdminLogIn/>}></Route>
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      <Route path="/adminHome" element={<AdminProtectedRoute><AdminHome /></AdminProtectedRoute>}/>
      <Route path="/upload" element={<Upload></Upload>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
