import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import MarketTicker from './MarketTicker'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default function AppLayout() {
  const location = useLocation()
  const showTicker = location.pathname === '/marketplace'

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-x-clip">
          {showTicker && <MarketTicker />}
          <div className="p-4 md:p-6 pb-20 lg:pb-6">
            <div key={location.pathname} className="animate-fade-in">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
