import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './context/UserContext'
import AppLayout from './components/layout/AppLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import AssetDetail from './pages/AssetDetail'
import Trade from './pages/Trade'
import MyAssets from './pages/MyAssets'
import Wallet from './pages/Wallet'
import Earn from './pages/Earn'
import SpendCard from './pages/SpendCard'
import CorporateActions from './pages/CorporateActions'
import Settings from './pages/Settings'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useUser()
  if (!isLoggedIn) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/asset/:id" element={<AssetDetail />} />
          <Route path="/trade/:id" element={<Trade />} />
          <Route path="/my-assets" element={<MyAssets />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/card" element={<SpendCard />} />
          <Route path="/corporate" element={<CorporateActions />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
