import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Heart,
  TrendingUp,
  Calendar,
  ShoppingCart,
  Bell,
  DollarSign,
  BookOpen,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  Users,
  BarChart3,
  Coins,
  CreditCard
} from 'lucide-react'
import { blink } from '@/blink/client'

interface Child {
  id: string
  name: string
  grade: string
  class: string
  avatar?: string
  averageGrade: number
  attendance: number
  creditsBalance: number
  lastActivity: string
  subjects: {
    name: string
    grade: number
    trend: 'up' | 'down' | 'stable'
  }[]
}

interface Notification {
  id: string
  childId: string
  type: 'grade' | 'assignment' | 'attendance' | 'payment' | 'announcement'
  title: string
  message: string
  date: string
  read: boolean
}

interface CreditTransaction {
  id: string
  childId: string
  type: 'purchase' | 'spend' | 'refund'
  amount: number
  description: string
  date: string
}

export function ParentDashboard() {
  const [children, setChildren] = useState<Child[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [transactions, setTransactions] = useState<CreditTransaction[]>([])
  const [selectedChild, setSelectedChild] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data
    const mockChildren: Child[] = [
      {
        id: '1',
        name: 'Alice Johnson',
        grade: 'Grade 10',
        class: '10A',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        averageGrade: 87.5,
        attendance: 94.2,
        creditsBalance: 150,
        lastActivity: '2024-02-14T16:30:00',
        subjects: [
          { name: 'Mathematics', grade: 89, trend: 'up' },
          { name: 'Biology', grade: 92, trend: 'up' },
          { name: 'Chemistry', grade: 85, trend: 'stable' },
          { name: 'English', grade: 88, trend: 'up' },
          { name: 'History', grade: 82, trend: 'down' }
        ]
      },
      {
        id: '2',
        name: 'David Johnson',
        grade: 'Grade 8',
        class: '8B',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        averageGrade: 79.3,
        attendance: 91.8,
        creditsBalance: 75,
        lastActivity: '2024-02-14T14:15:00',
        subjects: [
          { name: 'Mathematics', grade: 82, trend: 'up' },
          { name: 'Science', grade: 78, trend: 'stable' },
          { name: 'English', grade: 85, trend: 'up' },
          { name: 'Geography', grade: 76, trend: 'down' },
          { name: 'Art', grade: 88, trend: 'up' }
        ]
      }
    ]

    const mockNotifications: Notification[] = [
      {
        id: '1',
        childId: '1',
        type: 'grade',
        title: 'New Grade Posted',
        message: 'Alice received 92% on Biology Lab Report',
        date: '2024-02-14T10:30:00',
        read: false
      },
      {
        id: '2',
        childId: '2',
        type: 'assignment',
        title: 'Assignment Due Soon',
        message: 'David has a Mathematics assignment due tomorrow',
        date: '2024-02-14T08:15:00',
        read: false
      },
      {
        id: '3',
        childId: '1',
        type: 'attendance',
        title: 'Perfect Attendance',
        message: 'Alice maintained perfect attendance this week',
        date: '2024-02-13T16:00:00',
        read: true
      },
      {
        id: '4',
        childId: '2',
        type: 'payment',
        title: 'Credits Low',
        message: 'David has only 75 credits remaining',
        date: '2024-02-12T12:00:00',
        read: false
      }
    ]

    const mockTransactions: CreditTransaction[] = [
      {
        id: '1',
        childId: '1',
        type: 'purchase',
        amount: 100,
        description: 'Credits purchased for Alice',
        date: '2024-02-10T09:00:00'
      },
      {
        id: '2',
        childId: '1',
        type: 'spend',
        amount: -25,
        description: 'Biology textbook rental',
        date: '2024-02-12T14:30:00'
      },
      {
        id: '3',
        childId: '2',
        type: 'spend',
        amount: -15,
        description: 'Mathematics exercise book',
        date: '2024-02-13T11:15:00'
      },
      {
        id: '4',
        childId: '2',
        type: 'purchase',
        amount: 50,
        description: 'Credits purchased for David',
        date: '2024-02-08T16:45:00'
      }
    ]

    setTimeout(() => {
      setChildren(mockChildren)
      setNotifications(mockNotifications)
      setTransactions(mockTransactions)
      setSelectedChild(mockChildren[0].id)
      setLoading(false)
    }, 1000)
  }, [])

  const selectedChildData = children.find(child => child.id === selectedChild)
  const unreadNotifications = notifications.filter(n => !n.read).length
  const totalCreditsBalance = children.reduce((sum, child) => sum + child.creditsBalance, 0)
  const averageGradeAllChildren = children.reduce((sum, child) => sum + child.averageGrade, 0) / children.length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'grade': return <Star className="w-4 h-4 text-yellow-500" />
      case 'assignment': return <BookOpen className="w-4 h-4 text-blue-500" />
      case 'attendance': return <Calendar className="w-4 h-4 text-green-500" />
      case 'payment': return <DollarSign className="w-4 h-4 text-purple-500" />
      case 'announcement': return <Bell className="w-4 h-4 text-orange-500" />
      default: return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />
      case 'down': return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-600">Monitor your children's academic progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-pink-50 text-pink-700">
            <Heart className="w-3 h-3 mr-1" />
            {children.length} Children
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700">
            <Bell className="w-3 h-3 mr-1" />
            {unreadNotifications} New
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Children</p>
                <p className="text-2xl font-bold text-gray-900">{children.length}</p>
                <p className="text-xs text-blue-600">Active students</p>
              </div>
              <div className="p-2 bg-pink-100 rounded-lg">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900">{averageGradeAllChildren.toFixed(1)}%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.1% this month
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Credits</p>
                <p className="text-2xl font-bold text-gray-900">{totalCreditsBalance}</p>
                <p className="text-xs text-purple-600">Available balance</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Coins className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Notifications</p>
                <p className="text-2xl font-bold text-gray-900">{unreadNotifications}</p>
                <p className="text-xs text-orange-600">Unread messages</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Child Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Child</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children.map(child => (
              <div
                key={child.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedChild === child.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedChild(child.id)}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={child.avatar} alt={child.name} />
                    <AvatarFallback>{child.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{child.name}</h3>
                    <p className="text-sm text-gray-600">{child.grade} • Class {child.class}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{child.averageGrade}%</Badge>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">
                        <Coins className="w-3 h-3 mr-1" />
                        {child.creditsBalance}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedChildData && (
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Academic Performance</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="credits">Credits & Purchases</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Subject Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedChildData.subjects.map(subject => (
                      <div key={subject.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{subject.name}</span>
                            {getTrendIcon(subject.trend)}
                          </div>
                          <span className="text-sm font-medium">{subject.grade}%</span>
                        </div>
                        <Progress value={subject.grade} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Overall Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">Average Grade</p>
                          <p className="text-sm text-green-700">Excellent performance</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-green-600">{selectedChildData.averageGrade}%</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Attendance Rate</p>
                          <p className="text-sm text-blue-700">Very good attendance</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{selectedChildData.attendance}%</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Coins className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-purple-900">Credits Balance</p>
                          <p className="text-sm text-purple-700">Available for purchases</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-purple-600">{selectedChildData.creditsBalance}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Last Activity</p>
                          <p className="text-sm text-gray-700">Recent engagement</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {new Date(selectedChildData.lastActivity).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Attendance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{selectedChildData.attendance}%</p>
                      <p className="text-sm text-green-700">Overall Attendance</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">18</p>
                      <p className="text-sm text-blue-700">Days Present</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">1</p>
                      <p className="text-sm text-red-700">Days Absent</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Recent Attendance</h4>
                    <div className="space-y-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                        <div key={day} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{day}</span>
                          <Badge className={index === 2 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                            {index === 2 ? 'Absent' : 'Present'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="credits" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="w-5 h-5" />
                    Credits Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6">
                    <p className="text-3xl font-bold text-purple-600 mb-2">{selectedChildData.creditsBalance}</p>
                    <p className="text-gray-600 mb-4">Available Credits</p>
                    <div className="space-y-2">
                      <Button className="w-full">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Purchase More Credits
                      </Button>
                      <Button variant="outline" className="w-full">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Browse Bookstore
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions
                      .filter(t => t.childId === selectedChild)
                      .slice(0, 5)
                      .map(transaction => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{transaction.description}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`font-bold ${
                            transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications
                    .filter(n => n.childId === selectedChild)
                    .map(notification => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${
                          notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(notification.date).toLocaleDateString()} at{' '}
                              {new Date(notification.date).toLocaleTimeString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}