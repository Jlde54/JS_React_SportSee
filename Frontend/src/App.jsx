import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './styles/App.scss'

function App() {

  const ROUTES = {
    HOME: '/',
    DASHBOARD: '/user/:userId'
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />}/>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App