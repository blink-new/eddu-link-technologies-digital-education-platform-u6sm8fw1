import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  BookOpen,
  PenTool,
  ClipboardList,
  ShoppingCart,
  BarChart3,
  Users,
  GraduationCap,
  FileText,
  TrendingUp,
  Upload,
  Package,
  MapPin,
  Heart,
  DollarSign,
  MessageSquare,
  Home
} from 'lucide-react'
import type { UserRole } from '@/types/user'

interface SidebarProps {
  userRole: UserRole
  isOpen: boolean
  onNavigate: (page: string) => void
  currentPage: string
}

const menuItems = {
  student: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'textbooks', label: 'Digital Textbooks', icon: BookOpen },
    { id: 'exercise', label: 'Exercise Books', icon: PenTool },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'ai-features', label: 'AI Study Assistant', icon: MessageSquare },
    { id: 'bookstore', label: 'Bookstore', icon: ShoppingCart },
    { id: 'analytics', label: 'My Progress', icon: BarChart3 }
  ],
  teacher: [
    { id: 'classes', label: 'My Classes', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'resources', label: 'Teaching Resources', icon: GraduationCap },
    { id: 'grading', label: 'Grading', icon: FileText },
    { id: 'analytics', label: 'Class Analytics', icon: TrendingUp },
    { id: 'ai-insights', label: 'AI Insights', icon: BarChart3 }
  ],
  parent: [
    { id: 'children', label: 'My Children', icon: Heart },
    { id: 'performance', label: 'Academic Performance', icon: BarChart3 },
    { id: 'attendance', label: 'Attendance', icon: ClipboardList },
    { id: 'bookstore', label: 'Subsidized Books', icon: ShoppingCart },
    { id: 'notifications', label: 'Notifications', icon: MessageSquare },
    { id: 'payments', label: 'Payments', icon: DollarSign }
  ],
  publisher: [
    { id: 'upload', label: 'Upload Books', icon: Upload },
    { id: 'catalog', label: 'Book Catalog', icon: BookOpen },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'analytics', label: 'Sales Analytics', icon: TrendingUp },
    { id: 'approval', label: 'Approval Status', icon: FileText }
  ],
  government: [
    { id: 'overview', label: 'Regional Overview', icon: MapPin },
    { id: 'distribution', label: 'Book Distribution', icon: Package },
    { id: 'analytics', label: 'Usage Analytics', icon: BarChart3 },
    { id: 'schools', label: 'School Management', icon: GraduationCap },
    { id: 'reports', label: 'Reports', icon: FileText }
  ],
  ngo: [
    { id: 'programs', label: 'Sponsorship Programs', icon: Heart },
    { id: 'impact', label: 'Impact Analytics', icon: BarChart3 },
    { id: 'beneficiaries', label: 'Beneficiaries', icon: Users },
    { id: 'funding', label: 'Funding Management', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: FileText }
  ]
}

export function Sidebar({ userRole, isOpen, onNavigate, currentPage }: SidebarProps) {
  const items = menuItems[userRole] || []

  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
      lg:translate-x-0 lg:static lg:inset-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 capitalize">
            {userRole} Dashboard
          </h2>
        </div>
        
        <Separator />
        
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2 py-4">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    isActive ? 'bg-blue-50 text-blue-700 border-blue-200' : ''
                  }`}
                  onClick={() => onNavigate(item.id)}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              )
            })}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>Offline-first • Sync enabled</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}