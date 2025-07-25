import { useState } from 'react'
import { RoleSelector } from '@/components/RoleSelector'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { DigitalTextbooks } from '@/components/student/DigitalTextbooks'
import { ExerciseBook } from '@/components/student/ExerciseBook'
import { Dashboard } from '@/components/student/Dashboard'
import type { UserRole } from '@/types/user'

function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [currentPage, setCurrentPage] = useState('textbooks')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role)
    // Set default page based on role
    switch (role) {
      case 'student':
        setCurrentPage('dashboard')
        break
      case 'teacher':
        setCurrentPage('classes')
        break
      case 'parent':
        setCurrentPage('children')
        break
      case 'publisher':
        setCurrentPage('upload')
        break
      case 'government':
        setCurrentPage('overview')
        break
    }
  }

  const handleRoleChange = () => {
    setUserRole(null)
    setCurrentPage('dashboard')
    setSidebarOpen(false)
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    setSidebarOpen(false) // Close sidebar on mobile after navigation
  }

  const renderContent = () => {
    if (!userRole) return null

    // Student pages
    if (userRole === 'student') {
      switch (currentPage) {
        case 'dashboard':
          return <Dashboard />
        case 'textbooks':
          return <DigitalTextbooks />
        case 'exercise':
          return <ExerciseBook />
        case 'assignments':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Assignments</h2><p className="text-gray-600 mt-2">Assignment management coming soon...</p></div>
        case 'bookstore':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Digital Bookstore</h2><p className="text-gray-600 mt-2">Browse and purchase textbooks...</p></div>
        case 'analytics':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">My Progress</h2><p className="text-gray-600 mt-2">Performance analytics coming soon...</p></div>
        default:
          return <Dashboard />
      }
    }

    // Other roles - placeholder content
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold capitalize">{userRole} Dashboard</h2>
        <p className="text-gray-600 mt-2">
          {userRole.charAt(0).toUpperCase() + userRole.slice(1)} features coming soon...
        </p>
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            This is a preview of the {userRole} dashboard. Full functionality will be implemented in the next phase.
          </p>
        </div>
      </div>
    )
  }

  // Show role selector if no role is selected
  if (!userRole) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        userRole={userRole}
        isOpen={sidebarOpen}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header
          userRole={userRole}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onRoleChange={handleRoleChange}
        />
        
        <main className="flex-1 p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App