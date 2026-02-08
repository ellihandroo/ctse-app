import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 pb-20 lg:pb-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
