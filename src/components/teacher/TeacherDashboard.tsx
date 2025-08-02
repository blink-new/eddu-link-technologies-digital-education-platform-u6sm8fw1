import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  ClipboardCheck,
  TrendingUp,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  FileText,
  Calendar,
  BarChart3,
  GraduationCap,
  MessageSquare
} from 'lucide-react'
import { ClassManagement } from './ClassManagement'

interface ClassData {
  id: string
  name: string
  subject: string
  grade: string
  studentCount: number
  averageGrade: number
  assignmentsCount: number
  submissionRate: number
}

interface AssignmentStats {
  id: string
  title: string
  subject: string
  dueDate: string
  totalStudents: number
  submitted: number
  graded: number
  averageScore: number
}

interface StudentPerformance {
  id: string
  name: string
  grade: string
  averageScore: number
  assignmentsCompleted: number
  totalAssignments: number
  lastActivity: string
}

export function TeacherDashboard() {
  const [classes, setClasses] = useState<ClassData[]>([])
  const [assignments, setAssignments] = useState<AssignmentStats[]>([])
  const [topStudents, setTopStudents] = useState<StudentPerformance[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null)

  useEffect(() => {
    // Mock data
    const mockClasses: ClassData[] = [
      {
        id: '1',
        name: 'Grade 10A',
        subject: 'Mathematics',
        grade: 'Grade 10',
        studentCount: 32,
        averageGrade: 78.5,
        assignmentsCount: 12,
        submissionRate: 87.5
      },
      {
        id: '2',
        name: 'Grade 10B',
        subject: 'Mathematics',
        grade: 'Grade 10',
        studentCount: 28,
        averageGrade: 82.1,
        assignmentsCount: 12,
        submissionRate: 92.3
      },
      {
        id: '3',
        name: 'Grade 9A',
        subject: 'Mathematics',
        grade: 'Grade 9',
        studentCount: 30,
        averageGrade: 75.8,
        assignmentsCount: 10,
        submissionRate: 83.3
      }
    ]

    const mockAssignments: AssignmentStats[] = [
      {
        id: '1',
        title: 'Quadratic Equations Test',
        subject: 'Mathematics',
        dueDate: '2024-02-15',
        totalStudents: 32,
        submitted: 28,
        graded: 25,
        averageScore: 76.8
      },
      {
        id: '2',
        title: 'Algebra Problem Set',
        subject: 'Mathematics',
        dueDate: '2024-02-18',
        totalStudents: 28,
        submitted: 26,
        graded: 26,
        averageScore: 82.4
      },
      {
        id: '3',
        title: 'Geometry Proofs',
        subject: 'Mathematics',
        dueDate: '2024-02-20',
        totalStudents: 30,
        submitted: 22,
        graded: 18,
        averageScore: 71.2
      }
    ]

    const mockTopStudents: StudentPerformance[] = [
      {
        id: '1',
        name: 'Alice Johnson',
        grade: 'Grade 10A',
        averageScore: 94.5,
        assignmentsCompleted: 12,
        totalAssignments: 12,
        lastActivity: '2024-02-14T10:30:00'
      },
      {
        id: '2',
        name: 'David Smith',
        grade: 'Grade 10B',
        averageScore: 91.2,
        assignmentsCompleted: 11,
        totalAssignments: 12,
        lastActivity: '2024-02-14T14:15:00'
      },
      {
        id: '3',
        name: 'Sarah Wilson',
        grade: 'Grade 10A',
        averageScore: 89.8,
        assignmentsCompleted: 12,
        totalAssignments: 12,
        lastActivity: '2024-02-14T16:45:00'
      }
    ]

    setTimeout(() => {
      setClasses(mockClasses)
      setAssignments(mockAssignments)
      setTopStudents(mockTopStudents)
      setLoading(false)
    }, 1000)
  }, [])

  const totalStudents = classes.reduce((sum, cls) => sum + cls.studentCount, 0)
  const averageClassGrade = classes.reduce((sum, cls) => sum + cls.averageGrade, 0) / classes.length
  const totalAssignments = assignments.length
  const pendingGrading = assignments.reduce((sum, assignment) => sum + (assignment.submitted - assignment.graded), 0)

  // Show class management if a class is selected
  if (selectedClass) {
    return (
      <ClassManagement 
        classData={selectedClass} 
        onClose={() => setSelectedClass(null)} 
      />
    )
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
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600">Manage your classes and track student progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Calendar className="w-3 h-3 mr-1" />
            Week 3, Term 1
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <GraduationCap className="w-3 h-3 mr-1" />
            Mathematics Teacher
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                <p className="text-xs text-blue-600">Across {classes.length} classes</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900">{averageClassGrade.toFixed(1)}%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +3.2% from last week
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
                <p className="text-sm text-gray-600">Active Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{totalAssignments}</p>
                <p className="text-xs text-purple-600">This week</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <ClipboardCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Grading</p>
                <p className="text-2xl font-bold text-gray-900">{pendingGrading}</p>
                <p className="text-xs text-orange-600">Submissions to grade</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="classes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="classes">My Classes</TabsTrigger>
          <TabsTrigger value="assignments">Assignment Status</TabsTrigger>
          <TabsTrigger value="students">Top Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map(classData => (
              <Card key={classData.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{classData.name}</CardTitle>
                    <Badge variant="outline">{classData.subject}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Students</span>
                      <span className="font-medium">{classData.studentCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Average Grade</span>
                      <span className="font-medium">{classData.averageGrade}%</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Submission Rate</span>
                        <span className="font-medium">{classData.submissionRate}%</span>
                      </div>
                      <Progress value={classData.submissionRate} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Assignments</span>
                      <span className="font-medium">{classData.assignmentsCount}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => setSelectedClass(classData)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Manage Class
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="space-y-4">
            {assignments.map(assignment => {
              const submissionPercentage = (assignment.submitted / assignment.totalStudents) * 100
              const gradingPercentage = (assignment.graded / assignment.submitted) * 100
              const isOverdue = new Date(assignment.dueDate) < new Date()

              return (
                <Card key={assignment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                          <Badge variant="outline">{assignment.subject}</Badge>
                          {isOverdue && (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Overdue
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Due Date</p>
                            <p className="font-medium">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Submitted</p>
                            <p className="font-medium">{assignment.submitted}/{assignment.totalStudents}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Graded</p>
                            <p className="font-medium">{assignment.graded}/{assignment.submitted}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Average Score</p>
                            <p className="font-medium">{assignment.averageScore.toFixed(1)}%</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Submission Progress</span>
                            <span>{submissionPercentage.toFixed(0)}%</span>
                          </div>
                          <Progress value={submissionPercentage} className="h-2" />
                          <div className="flex items-center justify-between text-sm">
                            <span>Grading Progress</span>
                            <span>{gradingPercentage.toFixed(0)}%</span>
                          </div>
                          <Progress value={gradingPercentage} className="h-2" />
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

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Top Performing Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStudents.map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.grade}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Average Score</p>
                          <p className="font-bold text-green-600">{student.averageScore}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Completion</p>
                          <p className="font-medium">{student.assignmentsCompleted}/{student.totalAssignments}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Last Active</p>
                          <p className="text-sm">{new Date(student.lastActivity).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes.map(classData => (
                    <div key={classData.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{classData.name}</span>
                        <span className="text-sm text-gray-600">{classData.averageGrade}%</span>
                      </div>
                      <Progress value={classData.averageGrade} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">High Engagement</p>
                      <p className="text-sm text-green-700">Grade 10B shows 92% submission rate</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-900">Needs Attention</p>
                      <p className="text-sm text-yellow-700">Grade 9A has lower submission rates</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Improvement</p>
                      <p className="text-sm text-blue-700">Overall grades up 3.2% this week</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <ClipboardCheck className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Create Assignment</div>
                <div className="text-sm text-gray-600">Set up new assignment for classes</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <FileText className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Grade Submissions</div>
                <div className="text-sm text-gray-600">{pendingGrading} pending reviews</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <MessageSquare className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Send Announcement</div>
                <div className="text-sm text-gray-600">Notify students and parents</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}