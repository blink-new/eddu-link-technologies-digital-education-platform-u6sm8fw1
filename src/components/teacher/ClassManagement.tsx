import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  Users,
  UserCheck,
  UserX,
  ClipboardCheck,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  FileText,
  BarChart3
} from 'lucide-react'

interface Student {
  id: string
  name: string
  email: string
  averageGrade: number
  attendance: number
  assignmentsCompleted: number
  totalAssignments: number
  lastActivity: string
  status: 'active' | 'at-risk' | 'excellent'
}

interface Assignment {
  id: string
  title: string
  dueDate: string
  submitted: number
  totalStudents: number
  averageScore: number
  status: 'active' | 'overdue' | 'completed'
}

interface ClassDetails {
  id: string
  name: string
  subject: string
  grade: string
  studentCount: number
  averageGrade: number
  attendanceRate: number
  assignmentsCount: number
}

interface ClassManagementProps {
  classData: ClassDetails
  onClose: () => void
}

export function ClassManagement({ classData, onClose }: ClassManagementProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for class management
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice.johnson@school.edu',
        averageGrade: 94.5,
        attendance: 98,
        assignmentsCompleted: 12,
        totalAssignments: 12,
        lastActivity: '2024-02-14T10:30:00',
        status: 'excellent'
      },
      {
        id: '2',
        name: 'Bob Smith',
        email: 'bob.smith@school.edu',
        averageGrade: 87.2,
        attendance: 92,
        assignmentsCompleted: 11,
        totalAssignments: 12,
        lastActivity: '2024-02-14T14:15:00',
        status: 'active'
      },
      {
        id: '3',
        name: 'Carol Davis',
        email: 'carol.davis@school.edu',
        averageGrade: 91.8,
        attendance: 95,
        assignmentsCompleted: 12,
        totalAssignments: 12,
        lastActivity: '2024-02-14T16:45:00',
        status: 'excellent'
      },
      {
        id: '4',
        name: 'David Wilson',
        email: 'david.wilson@school.edu',
        averageGrade: 73.4,
        attendance: 78,
        assignmentsCompleted: 8,
        totalAssignments: 12,
        lastActivity: '2024-02-12T09:20:00',
        status: 'at-risk'
      },
      {
        id: '5',
        name: 'Emma Brown',
        email: 'emma.brown@school.edu',
        averageGrade: 89.6,
        attendance: 89,
        assignmentsCompleted: 10,
        totalAssignments: 12,
        lastActivity: '2024-02-14T11:30:00',
        status: 'active'
      },
      {
        id: '6',
        name: 'Frank Miller',
        email: 'frank.miller@school.edu',
        averageGrade: 68.9,
        attendance: 72,
        assignmentsCompleted: 7,
        totalAssignments: 12,
        lastActivity: '2024-02-11T15:45:00',
        status: 'at-risk'
      }
    ]

    const mockAssignments: Assignment[] = [
      {
        id: '1',
        title: 'Quadratic Equations Test',
        dueDate: '2024-02-15',
        submitted: 28,
        totalStudents: 32,
        averageScore: 76.8,
        status: 'active'
      },
      {
        id: '2',
        title: 'Algebra Problem Set',
        dueDate: '2024-02-18',
        submitted: 26,
        totalStudents: 32,
        averageScore: 82.4,
        status: 'active'
      },
      {
        id: '3',
        title: 'Geometry Proofs',
        dueDate: '2024-02-12',
        submitted: 30,
        totalStudents: 32,
        averageScore: 71.2,
        status: 'overdue'
      }
    ]

    setTimeout(() => {
      setStudents(mockStudents)
      setAssignments(mockAssignments)
      setLoading(false)
    }, 1000)
  }, [])

  const excellentStudents = students.filter(s => s.status === 'excellent').length
  const atRiskStudents = students.filter(s => s.status === 'at-risk').length
  const averageAttendance = students.reduce((sum, s) => sum + s.attendance, 0) / students.length
  const averageCompletion = students.reduce((sum, s) => sum + (s.assignmentsCompleted / s.totalAssignments * 100), 0) / students.length

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
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onClose}>
              ← Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{classData.name}</h1>
              <p className="text-gray-600">{classData.subject} • {classData.grade}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Users className="w-3 h-3 mr-1" />
            {classData.studentCount} Students
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <BarChart3 className="w-3 h-3 mr-1" />
            {classData.averageGrade}% Avg
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900">{averageAttendance.toFixed(1)}%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.3% this week
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assignment Completion</p>
                <p className="text-2xl font-bold text-gray-900">{averageCompletion.toFixed(1)}%</p>
                <p className="text-xs text-blue-600">Average completion rate</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <ClipboardCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Top Performers</p>
                <p className="text-2xl font-bold text-gray-900">{excellentStudents}</p>
                <p className="text-xs text-purple-600">Excellent students</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">At-Risk Students</p>
                <p className="text-2xl font-bold text-gray-900">{atRiskStudents}</p>
                <p className="text-xs text-red-600">Need attention</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Student List</TabsTrigger>
          <TabsTrigger value="assignments">Assignment Status</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Tracking</TabsTrigger>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <div className="space-y-4">
            {students.map(student => {
              const completionRate = (student.assignmentsCompleted / student.totalAssignments) * 100
              const daysSinceActivity = Math.floor((new Date().getTime() - new Date(student.lastActivity).getTime()) / (1000 * 60 * 60 * 24))
              
              return (
                <Card key={student.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{student.name}</h4>
                          <Badge 
                            className={
                              student.status === 'excellent' ? 'bg-green-100 text-green-800' :
                              student.status === 'at-risk' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }
                          >
                            {student.status === 'excellent' && <Award className="w-3 h-3 mr-1" />}
                            {student.status === 'at-risk' && <AlertTriangle className="w-3 h-3 mr-1" />}
                            {student.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {student.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{student.email}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Average Grade</p>
                            <p className="font-bold text-lg">{student.averageGrade}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Attendance</p>
                            <p className="font-bold text-lg">{student.attendance}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Assignments</p>
                            <p className="font-bold text-lg">{student.assignmentsCompleted}/{student.totalAssignments}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Last Active</p>
                            <p className="font-bold text-lg">{daysSinceActivity}d ago</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Assignment Completion</span>
                            <span className="font-medium">{completionRate.toFixed(0)}%</span>
                          </div>
                          <Progress value={completionRate} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="space-y-4">
            {assignments.map(assignment => {
              const submissionRate = (assignment.submitted / assignment.totalStudents) * 100
              const isOverdue = new Date(assignment.dueDate) < new Date()
              const daysUntilDue = Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
              
              return (
                <Card key={assignment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{assignment.title}</h4>
                          <Badge 
                            className={
                              assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              assignment.status === 'overdue' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }
                          >
                            {assignment.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {assignment.status === 'overdue' && <AlertTriangle className="w-3 h-3 mr-1" />}
                            {assignment.status === 'active' && <Clock className="w-3 h-3 mr-1" />}
                            {assignment.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Due Date</p>
                            <p className="font-medium">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                            {!isOverdue && daysUntilDue >= 0 && (
                              <p className="text-xs text-gray-500">{daysUntilDue} days left</p>
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Submitted</p>
                            <p className="font-medium">{assignment.submitted}/{assignment.totalStudents}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Average Score</p>
                            <p className="font-medium">{assignment.averageScore.toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Submission Rate</p>
                            <p className="font-medium">{submissionRate.toFixed(0)}%</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Submission Progress</span>
                            <span className="font-medium">{submissionRate.toFixed(0)}%</span>
                          </div>
                          <Progress value={submissionRate} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Grade
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students
                  .sort((a, b) => a.attendance - b.attendance)
                  .map(student => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          student.attendance >= 95 ? 'bg-green-500' :
                          student.attendance >= 85 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <div>
                          <h4 className="font-medium text-gray-900">{student.name}</h4>
                          <p className="text-sm text-gray-600">
                            Last seen: {new Date(student.lastActivity).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{student.attendance}%</p>
                        <p className="text-sm text-gray-600">Attendance rate</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students
                    .sort((a, b) => b.averageGrade - a.averageGrade)
                    .map((student, index) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                            <span className="text-xs font-bold text-blue-600">#{index + 1}</span>
                          </div>
                          <span className="font-medium">{student.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{student.averageGrade}%</p>
                          <p className="text-xs text-gray-600">
                            {student.averageGrade >= 90 ? 'Excellent' :
                             student.averageGrade >= 80 ? 'Good' :
                             student.averageGrade >= 70 ? 'Average' : 'Needs Improvement'}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Strong Performers</p>
                      <p className="text-sm text-green-700">{excellentStudents} students with 90%+ average</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium text-red-900">At-Risk Students</p>
                      <p className="text-sm text-red-700">{atRiskStudents} students need additional support</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Attendance Impact</p>
                      <p className="text-sm text-blue-700">Strong correlation between attendance and grades</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <ClipboardCheck className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-900">Assignment Completion</p>
                      <p className="text-sm text-purple-700">{averageCompletion.toFixed(0)}% average completion rate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}