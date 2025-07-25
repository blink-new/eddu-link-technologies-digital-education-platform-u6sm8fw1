import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Award,
  BookOpen,
  PenTool,
  Calendar,
  Users,
  Star,
  ChevronRight,
  Trophy,
  Zap,
  Brain
} from 'lucide-react'

interface SubjectData {
  name: string
  timeSpent: number
  totalTime: number
  grade: number
  assignments: number
  completedAssignments: number
  color: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  earned: boolean
  date?: string
}

export function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  // Mock data for demonstration
  const subjectData: SubjectData[] = [
    {
      name: 'Mathematics',
      timeSpent: 12.5,
      totalTime: 20,
      grade: 85,
      assignments: 8,
      completedAssignments: 6,
      color: '#3b82f6'
    },
    {
      name: 'Biology',
      timeSpent: 8.2,
      totalTime: 15,
      grade: 92,
      assignments: 5,
      completedAssignments: 5,
      color: '#10b981'
    },
    {
      name: 'History',
      timeSpent: 6.8,
      totalTime: 12,
      grade: 78,
      assignments: 4,
      completedAssignments: 3,
      color: '#f59e0b'
    },
    {
      name: 'Chemistry',
      timeSpent: 9.1,
      totalTime: 18,
      grade: 88,
      assignments: 6,
      completedAssignments: 4,
      color: '#8b5cf6'
    },
    {
      name: 'English',
      timeSpent: 7.3,
      totalTime: 14,
      grade: 90,
      assignments: 7,
      completedAssignments: 6,
      color: '#ef4444'
    },
    {
      name: 'Physics',
      timeSpent: 5.4,
      totalTime: 16,
      grade: 82,
      assignments: 5,
      completedAssignments: 3,
      color: '#06b6d4'
    }
  ]

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Perfect Week',
      description: 'Completed all assignments for a week',
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      earned: true,
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Math Master',
      description: 'Scored 90+ in 5 consecutive math assignments',
      icon: <Target className="w-6 h-6 text-blue-500" />,
      earned: true,
      date: '2024-01-10'
    },
    {
      id: '3',
      title: 'Speed Reader',
      description: 'Read 10 textbook chapters in one week',
      icon: <Zap className="w-6 h-6 text-orange-500" />,
      earned: false
    },
    {
      id: '4',
      title: 'Consistent Learner',
      description: 'Study for 30 days straight',
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      earned: false
    }
  ]

  const totalTimeSpent = subjectData.reduce((sum, subject) => sum + subject.timeSpent, 0)
  const averageGrade = Math.round(subjectData.reduce((sum, subject) => sum + subject.grade, 0) / subjectData.length)
  const totalAssignments = subjectData.reduce((sum, subject) => sum + subject.assignments, 0)
  const completedAssignments = subjectData.reduce((sum, subject) => sum + subject.completedAssignments, 0)
  const classPosition = 12 // Mock position
  const totalStudents = 45 // Mock total students

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600">Track your academic progress and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Calendar className="w-3 h-3 mr-1" />
            Week 3, Term 1
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Users className="w-3 h-3 mr-1" />
            Class 10A
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900">{averageGrade}%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5% from last week
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Class Position</p>
                <p className="text-2xl font-bold text-gray-900">#{classPosition}</p>
                <p className="text-xs text-gray-500">out of {totalStudents} students</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-gray-900">{totalTimeSpent}h</p>
                <p className="text-xs text-blue-600">this week</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assignments</p>
                <p className="text-2xl font-bold text-gray-900">{completedAssignments}/{totalAssignments}</p>
                <p className="text-xs text-purple-600">completed</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <PenTool className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
          <TabsTrigger value="time">Time Analytics</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Subject Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectData.map((subject) => (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: subject.color }}
                        />
                        <span className="font-medium">{subject.name}</span>
                        <Badge variant="outline">{subject.grade}%</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {subject.completedAssignments}/{subject.assignments} assignments
                      </div>
                    </div>
                    <Progress 
                      value={(subject.grade / 100) * 100} 
                      className="h-2"
                      style={{ 
                        backgroundColor: `${subject.color}20`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Time Spent by Subject
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectData.map((subject) => {
                  const percentage = (subject.timeSpent / totalTimeSpent) * 100
                  return (
                    <div key={subject.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: subject.color }}
                          />
                          <span className="font-medium">{subject.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {subject.timeSpent}h ({percentage.toFixed(1)}%)
                        </div>
                      </div>
                      <Progress 
                        value={percentage} 
                        className="h-2"
                        style={{ 
                          backgroundColor: `${subject.color}20`,
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Goals Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Weekly Study Goal</span>
                    <span className="text-sm text-gray-600">{totalTimeSpent}/25 hours</span>
                  </div>
                  <Progress value={(totalTimeSpent / 25) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Assignment Completion</span>
                    <span className="text-sm text-gray-600">{completedAssignments}/{totalAssignments}</span>
                  </div>
                  <Progress value={(completedAssignments / totalAssignments) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Achievements & Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.earned ? 'bg-white' : 'bg-gray-200'
                      }`}>
                        {achievement.earned ? achievement.icon : (
                          <div className="w-6 h-6 bg-gray-400 rounded" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          achievement.earned ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${
                          achievement.earned ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-green-600 mt-1">
                            Earned on {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {achievement.earned && (
                        <Badge className="bg-green-100 text-green-800">
                          <Star className="w-3 h-3 mr-1" />
                          Earned
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
              <BookOpen className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Continue Reading</div>
                <div className="text-sm text-gray-600">Biology Chapter 5</div>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <PenTool className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Pending Assignment</div>
                <div className="text-sm text-gray-600">Math Problem Set 3</div>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <BarChart3 className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">View Full Analytics</div>
                <div className="text-sm text-gray-600">Detailed performance report</div>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}