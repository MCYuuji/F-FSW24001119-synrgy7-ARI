import {Routes, Route} from 'react-router-dom'
import './App.css'
import Layout from './components/dashboard/Layout'
import Home from './pages/home'
import About from './pages/about'
import Cars from './pages/cars'
import LayoutDashboard from './components/dashboard/LayoutDashboard'
import HomeDashboard from './pages/dashboard'
import Login from './pages/dashboard/login'
import Register from './pages/dashboard/register'
import Protected from './components/protection'
import { AuthProvider } from './hooks/UseAuth';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="about" element={<About />}/>
          <Route path="cars" element={<Cars />}/>
        </Route>
        <Route path="/dashboard">
          <Route index element={
            <Protected>
              <HomeDashboard/>
            </Protected>
            } />
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
        </Route>
      </Routes>
     </AuthProvider>
    </>
  )
}

export default App
