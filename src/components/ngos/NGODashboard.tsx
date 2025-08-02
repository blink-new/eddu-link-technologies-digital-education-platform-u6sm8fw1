import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  Heart,
  Users,
  BookOpen,
  TrendingUp,
  Target,
  DollarSign,
  MapPin,
  Calendar,
  Award,
  CheckCircle,
  Clock,
  Zap,
  BarChart3
} from 'lucide-react'

interface SponsorshipProgram {
  id: string
  name: string
  targetType: 'students' | 'schools' | 'regions'
  beneficiaries: number
  totalFunding: number
  utilized: number
  impact: number
  status: 'active' | 'completed' | 'pending'
  startDate: string
  endDate: string
}

interface ImpactMetrics {
  studentsSupported: number
  schoolsReached: number
  booksSponsored: number
  regionsServed: number
  totalInvestment: number
  averageImpactScore: number
}

export function NGODashboard() {
  const [programs, setPrograms] = useState<SponsorshipProgram[]>([])
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for NGO dashboard
    const mockPrograms: SponsorshipProgram[] = [
      {
        id: '1',
        name: 'Rural Education Initiative',
        targetType: 'schools',
        beneficiaries: 45,
        totalFunding: 250000,
        utilized: 187500,
        impact: 87.5,
        status: 'active',
        startDate: '2024-01-15',
        endDate: '2024-12-31'
      },
      {
        id: '2',
        name: 'Digital Literacy for All',
        targetType: 'students',
        beneficiaries: 1250,
        totalFunding: 180000,
        utilized: 180000,
        impact: 92.3,
        status: 'completed',
        startDate: '2023-09-01',
        endDate: '2024-01-31'
      },
      {
        id: '3',
        name: 'Teacher Training Program',
        targetType: 'schools',
        beneficiaries: 28,
        totalFunding: 120000,
        utilized: 84000,
        impact: 78.9,
        status: 'active',
        startDate: '2024-02-01',
        endDate: '2024-08-31'
      },
      {
        id: '4',
        name: 'Underserved Communities Support',
        targetType: 'regions',
        beneficiaries: 3,
        totalFunding: 300000,
        utilized: 45000,
        impact: 65.2,
        status: 'pending',
        startDate: '2024-03-01',
        endDate: '2025-02-28'
      }
    ]

    const mockImpactMetrics: ImpactMetrics = {
      studentsSupported: 8450,
      schoolsReached: 156,
      booksSponsored: 23400,
      regionsServed: 8,
      totalInvestment: 850000,
      averageImpactScore: 81.2
    }

    setTimeout(() => {
      setPrograms(mockPrograms)
      setImpactMetrics(mockImpactMetrics)
      setLoading(false)
    }, 1000)
  }, [])

  const activePrograms = programs.filter(p => p.status === 'active').length
  const completedPrograms = programs.filter(p => p.status === 'completed').length
  const totalFunding = programs.reduce((sum, program) => sum + program.totalFunding, 0)
  const totalUtilized = programs.reduce((sum, program) => sum + program.utilized, 0)
  const averageImpact = programs.reduce((sum, program) => sum + program.impact, 0) / programs.length

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
          <h1 className="text-2xl font-bold text-gray-900">NGO Dashboard</h1>
          <p className="text-gray-600">Track sponsorship programs and educational impact</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-pink-50 text-pink-700">
            <Calendar className="w-3 h-3 mr-1" />
            2024 Programs
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Heart className="w-3 h-3 mr-1" />
            {activePrograms} Active
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Students Supported</p>
                <p className="text-2xl font-bold text-gray-900">{impactMetrics?.studentsSupported.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15% this year
                </p>
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
                <p className="text-sm text-gray-600">Schools Reached</p>
                <p className="text-2xl font-bold text-gray-900">{impactMetrics?.schoolsReached}</p>
                <p className="text-xs text-purple-600">Across {impactMetrics?.regionsServed} regions</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Books Sponsored</p>
                <p className="text-2xl font-bold text-gray-900">{impactMetrics?.booksSponsored.toLocaleString()}</p>
                <p className="text-xs text-orange-600">Educational resources</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Investment</p>
                <p className="text-2xl font-bold text-gray-900">${impactMetrics?.totalInvestment.toLocaleString()}</p>
                <p className="text-xs text-green-600">{((totalUtilized / totalFunding) * 100).toFixed(1)}% utilized</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="programs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="programs">Sponsorship Programs</TabsTrigger>
          <TabsTrigger value="impact">Impact Analytics</TabsTrigger>
          <TabsTrigger value="beneficiaries">Beneficiaries</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programs.map(program => {
              const utilizationRate = (program.utilized / program.totalFunding) * 100
              const daysRemaining = Math.ceil((new Date(program.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
              
              return (
                <Card key={program.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge 
                        variant="outline"
                        className={
                          program.status === 'active' ? 'bg-green-50 text-green-700' :
                          program.status === 'completed' ? 'bg-blue-50 text-blue-700' :
                          'bg-yellow-50 text-yellow-700'
                        }
                      >
                        {program.status === 'active' && <Zap className="w-3 h-3 mr-1" />}
                        {program.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {program.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {program.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Target</span>
                          <p className="font-medium capitalize">{program.targetType}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Beneficiaries</span>
                          <p className="font-medium">{program.beneficiaries.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Impact Score</span>
                          <p className="font-medium">{program.impact}%</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration</span>
                          <p className="font-medium">
                            {program.status === 'completed' ? 'Completed' : 
                             program.status === 'pending' ? 'Not started' :
                             `${daysRemaining} days left`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Budget Utilization</span>
                          <span className="font-medium">
                            ${program.utilized.toLocaleString()} / ${program.totalFunding.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={utilizationRate} className="h-2" />
                        <p className="text-xs text-gray-500">{utilizationRate.toFixed(1)}% utilized</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Award className="w-4 h-4 mr-2" />
                          Impact Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Impact Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programs
                    .sort((a, b) => b.impact - a.impact)
                    .map((program, index) => (
                      <div key={program.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">#{index + 1}</span>
                            <span className="font-medium">{program.name}</span>
                          </div>
                          <span className="text-sm text-gray-600">{program.impact}%</span>
                        </div>
                        <Progress value={program.impact} className="h-2" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">High Impact Achievement</p>
                      <p className="text-sm text-green-700">Digital Literacy program reached 92.3% impact score</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Beneficiary Growth</p>
                      <p className="text-sm text-blue-700">15% increase in students supported this year</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Target className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-900">Regional Expansion</p>
                      <p className="text-sm text-purple-700">Now serving 8 regions across the country</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-orange-900">Resource Distribution</p>
                      <p className="text-sm text-orange-700">23,400 educational books sponsored to date</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="beneficiaries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Beneficiary Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-900">{impactMetrics?.studentsSupported.toLocaleString()}</p>
                    <p className="text-sm text-blue-700">Students Supported</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-900">{impactMetrics?.schoolsReached}</p>
                    <p className="text-sm text-purple-700">Schools Reached</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-900">{impactMetrics?.regionsServed}</p>
                    <p className="text-sm text-green-700">Regions Served</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Program Type Distribution</h4>
                  {['students', 'schools', 'regions'].map(type => {
                    const typePrograms = programs.filter(p => p.targetType === type)
                    const typeBeneficiaries = typePrograms.reduce((sum, p) => sum + p.beneficiaries, 0)
                    const totalBeneficiaries = programs.reduce((sum, p) => sum + p.beneficiaries, 0)
                    const percentage = (typeBeneficiaries / totalBeneficiaries) * 100

                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium capitalize">{type} Programs</span>
                          <span className="text-gray-600">{typeBeneficiaries.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <BarChart3 className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Impact Assessment Report</div>
                    <div className="text-sm text-gray-600">Comprehensive program impact analysis</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <DollarSign className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Financial Summary</div>
                    <div className="text-sm text-gray-600">Budget utilization and ROI analysis</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <Users className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Beneficiary Report</div>
                    <div className="text-sm text-gray-600">Detailed beneficiary demographics</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <Award className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Success Stories</div>
                    <div className="text-sm text-gray-600">Case studies and testimonials</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}