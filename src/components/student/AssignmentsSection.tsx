import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Clock,
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Star,
  MessageSquare,
  Download,
  Upload,
  Eye,
  Edit
} from 'lucide-react'
import { blink } from '@/blink/client'

interface Assignment {
  id: string
  title: string
  description: string
  subject: string
  teacherName: string
  dueDate: string
  maxScore: number
  status: 'pending' | 'submitted' | 'graded' | 'returned'
  submittedAt?: string
  score?: number
  feedback?: string
  gradedAt?: string
}

interface AssignmentSubmission {
  id: string
  assignmentId: string
  content: string
  submittedAt: string
  status: 'draft' | 'submitted' | 'graded' | 'returned'
  score?: number
  feedback?: string
}

export function AssignmentsSection() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([])
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [submissionContent, setSubmissionContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [submissionDialog, setSubmissionDialog] = useState(false)

  useEffect(() => {
    // Mock data
    const mockAssignments: Assignment[] = [
      {
        id: '1',
        title: 'Quadratic Equations Problem Set',
        description: 'Solve the following quadratic equations using different methods: factoring, completing the square, and quadratic formula.',
        subject: 'Mathematics',
        teacherName: 'Mr. Johnson',
        dueDate: '2024-02-15T23:59:59',
        maxScore: 100,
        status: 'pending'
      },
      {
        id: '2',
        title: 'Cell Division Essay',
        description: 'Write a 500-word essay explaining the process of mitosis and meiosis, including their similarities and differences.',
        subject: 'Biology',
        teacherName: 'Ms. Smith',
        dueDate: '2024-02-18T23:59:59',
        maxScore: 50,
        status: 'submitted',
        submittedAt: '2024-02-10T14:30:00'
      },
      {
        id: '3',
        title: 'Chemical Bonding Lab Report',
        description: 'Complete the lab report on ionic and covalent bonding experiments conducted in class.',
        subject: 'Chemistry',
        teacherName: 'Dr. Brown',
        dueDate: '2024-02-20T23:59:59',
        maxScore: 75,
        status: 'graded',
        submittedAt: '2024-02-08T16:45:00',
        score: 68,
        feedback: 'Good understanding of concepts. Need to improve data analysis section.',
        gradedAt: '2024-02-12T10:00:00'
      },
      {
        id: '4',
        title: 'World War II Timeline',
        description: 'Create a detailed timeline of major events during World War II with explanations.',
        subject: 'History',
        teacherName: 'Mrs. Davis',
        dueDate: '2024-02-22T23:59:59',
        maxScore: 60,
        status: 'returned',
        submittedAt: '2024-02-05T12:00:00',
        score: 52,
        feedback: 'Well researched timeline. Consider adding more context to each event.',
        gradedAt: '2024-02-14T09:30:00'
      }
    ]

    // Simulate loading
    setTimeout(() => {
      setAssignments(mockAssignments)
      setLoading(false)
    }, 1000)
  }, [])

  const pendingAssignments = assignments.filter(a => a.status === 'pending')
  const submittedAssignments = assignments.filter(a => a.status === 'submitted')
  const gradedAssignments = assignments.filter(a => a.status === 'graded' || a.status === 'returned')

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'graded': return 'bg-green-100 text-green-800'
      case 'returned': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSubmitAssignment = async (assignmentId: string, content: string) => {
    try {
      // In real app, this would call the API
      const updatedAssignments = assignments.map(assignment =>
        assignment.id === assignmentId
          ? { ...assignment, status: 'submitted' as const, submittedAt: new Date().toISOString() }
          : assignment
      )
      setAssignments(updatedAssignments)
      setSubmissionDialog(false)
      setSubmissionContent('')
      setSelectedAssignment(null)
    } catch (error) {
      console.error('Failed to submit assignment:', error)
    }
  }

  const openSubmissionDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setSubmissionContent('')
    setSubmissionDialog(true)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
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
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600">Manage your assignments and submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            {pendingAssignments.length} Pending
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {submittedAssignments.length} Submitted
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {gradedAssignments.length} Graded
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({submittedAssignments.length})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({gradedAssignments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingAssignments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-600">You have no pending assignments at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingAssignments.map(assignment => {
                const daysUntilDue = getDaysUntilDue(assignment.dueDate)
                const isOverdue = daysUntilDue < 0
                const isDueSoon = daysUntilDue <= 2 && daysUntilDue >= 0

                return (
                  <Card key={assignment.id} className={`${isOverdue ? 'border-red-200 bg-red-50' : isDueSoon ? 'border-yellow-200 bg-yellow-50' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status}
                            </Badge>
                            {isOverdue && (
                              <Badge className="bg-red-100 text-red-800">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Overdue
                              </Badge>
                            )}
                            {isDueSoon && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Clock className="w-3 h-3 mr-1" />
                                Due Soon
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{assignment.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {assignment.teacherName}
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {assignment.subject}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              {assignment.maxScore} points
                            </div>
                          </div>
                        </div>
                        <Button onClick={() => openSubmissionDialog(assignment)}>
                          <Send className="w-4 h-4 mr-2" />
                          Submit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          {submittedAssignments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submitted assignments</h3>
                <p className="text-gray-600">Your submitted assignments will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {submittedAssignments.map(assignment => (
                <Card key={assignment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{assignment.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {assignment.teacherName}
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {assignment.subject}
                          </div>
                          <div className="flex items-center gap-1">
                            <Send className="w-4 h-4" />
                            Submitted: {assignment.submittedAt && new Date(assignment.submittedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Awaiting Grade</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          {gradedAssignments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No graded assignments</h3>
                <p className="text-gray-600">Your graded assignments will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {gradedAssignments.map(assignment => {
                const scorePercentage = assignment.score && assignment.maxScore ? (assignment.score / assignment.maxScore) * 100 : 0
                const gradeColor = scorePercentage >= 80 ? 'text-green-600' : scorePercentage >= 60 ? 'text-yellow-600' : 'text-red-600'

                return (
                  <Card key={assignment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status}
                            </Badge>
                            {assignment.score && assignment.maxScore && (
                              <Badge className={`${gradeColor} bg-transparent border-current`}>
                                {assignment.score}/{assignment.maxScore} ({scorePercentage.toFixed(0)}%)
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{assignment.description}</p>
                          {assignment.feedback && (
                            <Alert className="mb-3">
                              <MessageSquare className="w-4 h-4" />
                              <AlertDescription>
                                <strong>Teacher Feedback:</strong> {assignment.feedback}
                              </AlertDescription>
                            </Alert>
                          )}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {assignment.teacherName}
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {assignment.subject}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Graded: {assignment.gradedAt && new Date(assignment.gradedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Submission Dialog */}
      <Dialog open={submissionDialog} onOpenChange={setSubmissionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Assignment: {selectedAssignment?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Assignment Details</h4>
              <p className="text-sm text-gray-600 mb-2">{selectedAssignment?.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Subject: {selectedAssignment?.subject}</span>
                <span>Max Score: {selectedAssignment?.maxScore} points</span>
                <span>Due: {selectedAssignment?.dueDate && new Date(selectedAssignment.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Submission
              </label>
              <Textarea
                value={submissionContent}
                onChange={(e) => setSubmissionContent(e.target.value)}
                placeholder="Type your assignment submission here..."
                className="min-h-[200px]"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Attach Files
              </Button>
              <span className="text-sm text-gray-500">or drag and drop files here</span>
            </div>
            
            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Once you submit this assignment, it will be sent to your teacher for grading and you won't be able to edit it.
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSubmissionDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => selectedAssignment && handleSubmitAssignment(selectedAssignment.id, submissionContent)}
                disabled={!submissionContent.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Assignment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}