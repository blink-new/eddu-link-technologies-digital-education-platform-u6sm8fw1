import { useState } from 'react'
import { RoleSelector } from '@/components/RoleSelector'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { DigitalTextbooks } from '@/components/student/DigitalTextbooks'
import { ExerciseBook } from '@/components/student/ExerciseBook'
import { EnhancedExerciseBook } from '@/components/student/EnhancedExerciseBook'
import { Dashboard } from '@/components/student/Dashboard'
import { AssignmentsSection } from '@/components/student/AssignmentsSection'
import { AIFeatures } from '@/components/student/AIFeatures'
import { TeacherDashboard } from '@/components/teacher/TeacherDashboard'
import { ParentDashboard } from '@/components/parent/ParentDashboard'
import { PublisherDashboard } from '@/components/publisher/PublisherDashboard'
import { GovernmentDashboard } from '@/components/government/GovernmentDashboard'
import { NGODashboard } from '@/components/ngos/NGODashboard'
import { LayoutContainer } from '@/components/LayoutContainer'
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
      case 'ngo':
        setCurrentPage('programs')
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
          return <EnhancedExerciseBook />
        case 'assignments':
          return <AssignmentsSection />
        case 'bookstore':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Digital Bookstore</h2><p className="text-gray-600 mt-2">Browse and purchase textbooks...</p></div>
        case 'analytics':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">My Progress</h2><p className="text-gray-600 mt-2">Performance analytics coming soon...</p></div>
        case 'ai-features':
          return <AIFeatures />
        default:
          return <Dashboard />
      }
    }

    // Teacher pages
    if (userRole === 'teacher') {
      switch (currentPage) {
        case 'classes':
          return <TeacherDashboard />
        case 'assignments':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Assignment Management</h2><p className="text-gray-600 mt-2">Create and manage assignments...</p></div>
        case 'resources':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Teaching Resources</h2><p className="text-gray-600 mt-2">Access teaching materials...</p></div>
        case 'grading':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Grading Center</h2><p className="text-gray-600 mt-2">Grade student submissions...</p></div>
        case 'analytics':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Class Analytics</h2><p className="text-gray-600 mt-2">View class performance data...</p></div>
        case 'ai-insights':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">AI Teaching Insights</h2><p className="text-gray-600 mt-2">AI-powered teaching recommendations...</p></div>
        default:
          return <TeacherDashboard />
      }
    }

    // Parent pages
    if (userRole === 'parent') {
      switch (currentPage) {
        case 'children':
          return <ParentDashboard />
        case 'performance':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Academic Performance</h2><p className="text-gray-600 mt-2">Detailed performance analytics...</p></div>
        case 'attendance':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Attendance Tracking</h2><p className="text-gray-600 mt-2">Monitor attendance records...</p></div>
        case 'bookstore':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Subsidized Bookstore</h2><p className="text-gray-600 mt-2">Purchase books at 3x cheaper rates...</p></div>
        case 'notifications':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Notifications</h2><p className="text-gray-600 mt-2">Important updates and alerts...</p></div>
        case 'payments':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Payment Management</h2><p className="text-gray-600 mt-2">Manage subscriptions and credits...</p></div>
        default:
          return <ParentDashboard />
      }
    }

    // Publisher pages
    if (userRole === 'publisher') {
      switch (currentPage) {
        case 'upload':
          return <PublisherDashboard />
        case 'catalog':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Book Catalog</h2><p className="text-gray-600 mt-2">Manage your published books...</p></div>
        case 'orders':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Order Management</h2><p className="text-gray-600 mt-2">Track and fulfill orders...</p></div>
        case 'analytics':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Sales Analytics</h2><p className="text-gray-600 mt-2">View sales and usage statistics...</p></div>
        case 'approval':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Approval Status</h2><p className="text-gray-600 mt-2">Track book approval status...</p></div>
        default:
          return <PublisherDashboard />
      }
    }

    // Government pages
    if (userRole === 'government') {
      switch (currentPage) {
        case 'overview':
          return <GovernmentDashboard />
        case 'distribution':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Book Distribution</h2><p className="text-gray-600 mt-2">Track textbook distribution...</p></div>
        case 'analytics':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Usage Analytics</h2><p className="text-gray-600 mt-2">Analyze platform usage and impact...</p></div>
        case 'schools':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">School Management</h2><p className="text-gray-600 mt-2">Manage schools and institutions...</p></div>
        case 'reports':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Reports</h2><p className="text-gray-600 mt-2">Generate comprehensive reports...</p></div>
        default:
          return <GovernmentDashboard />
      }
    }

    // NGO pages
    if (userRole === 'ngo') {
      switch (currentPage) {
        case 'programs':
          return <NGODashboard />
        case 'impact':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Impact Analytics</h2><p className="text-gray-600 mt-2">Measure program effectiveness...</p></div>
        case 'beneficiaries':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Beneficiaries</h2><p className="text-gray-600 mt-2">Manage program beneficiaries...</p></div>
        case 'funding':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Funding Management</h2><p className="text-gray-600 mt-2">Track funding and expenses...</p></div>
        case 'reports':
          return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Reports</h2><p className="text-gray-600 mt-2">Generate impact reports...</p></div>
        default:
          return <NGODashboard />
      }
    }

    return null
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
        
        <main className="flex-1">
          <LayoutContainer>
            {renderContent()}
          </LayoutContainer>
        </main>
      </div>
    </div>
  )
}

export default App