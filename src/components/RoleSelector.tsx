import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Users, Heart, Building, Shield } from 'lucide-react'
import type { UserRole } from '@/types/user'

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void
}

const roles = [
  {
    id: 'student' as UserRole,
    title: 'Student',
    description: 'Access digital textbooks, assignments, and exercise books',
    icon: BookOpen,
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
  },
  {
    id: 'teacher' as UserRole,
    title: 'Teacher',
    description: 'Manage classes, grade assignments, and access teaching resources',
    icon: Users,
    color: 'bg-green-50 border-green-200 hover:bg-green-100'
  },
  {
    id: 'parent' as UserRole,
    title: 'Parent',
    description: 'Monitor child progress and purchase subsidized books',
    icon: Heart,
    color: 'bg-pink-50 border-pink-200 hover:bg-pink-100'
  },
  {
    id: 'publisher' as UserRole,
    title: 'Publisher',
    description: 'Upload textbooks and manage distribution',
    icon: Building,
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
  },
  {
    id: 'government' as UserRole,
    title: 'Government',
    description: 'Monitor regional analytics and distribution',
    icon: Shield,
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
  },
  {
    id: 'ngo' as UserRole,
    title: 'NGO',
    description: 'Manage sponsorship programs and track impact',
    icon: Heart,
    color: 'bg-pink-50 border-pink-200 hover:bg-pink-100'
  }
]

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    onRoleSelect(role)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Eddu Link Technologies
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Inclusive Digital Education Platform
          </p>
          <p className="text-gray-500">
            Select your role to access your personalized dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-200 ${role.color} ${
                  selectedRole === role.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    className="w-full" 
                    variant={selectedRole === role.id ? "default" : "outline"}
                  >
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Optimized for web, mobile, and paper tablets • Offline-first functionality
          </p>
        </div>
      </div>
    </div>
  )
}