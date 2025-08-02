import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MapPin,
  Users,
  BookOpen,
  TrendingUp,
  School,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Target,
  DollarSign,
  FileText,
  Calendar
} from 'lucide-react'

interface RegionalData {
  region: string
  schools: number
  students: number
  teachers: number
  booksDistributed: number
  averagePerformance: number
  budgetUtilized: number
  totalBudget: number
}

interface DistributionMetrics {
  totalBooks: number
  distributed: number
  pending: number
  regions: number
  averageDeliveryTime: number
}

export function GovernmentDashboard() {
  const [regionalData, setRegionalData] = useState<RegionalData[]>([])
  const [distributionMetrics, setDistributionMetrics] = useState<DistributionMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for government dashboard
    const mockRegionalData: RegionalData[] = [
      {
        region: 'Northern Province',
        schools: 245,
        students: 45680,
        teachers: 2340,
        booksDistributed: 89500,
        averagePerformance: 78.5,
        budgetUtilized: 2450000,
        totalBudget: 3000000
      },
      {
        region: 'Central Province',
        schools: 189,
        students: 38920,
        teachers: 1980,
        booksDistributed: 76400,
        averagePerformance: 82.1,
        budgetUtilized: 1980000,
        totalBudget: 2500000
      },
      {
        region: 'Southern Province',
        schools: 156,
        students: 29340,
        teachers: 1560,
        booksDistributed: 58200,
        averagePerformance: 75.8,
        budgetUtilized: 1560000,
        totalBudget: 2000000
      },
      {
        region: 'Eastern Province',
        schools: 134,
        students: 25680,
        teachers: 1340,
        booksDistributed: 51200,
        averagePerformance: 73.2,
        budgetUtilized: 1340000,
        totalBudget: 1800000
      }
    ]

    const mockDistributionMetrics: DistributionMetrics = {
      totalBooks: 275300,
      distributed: 275300,
      pending: 12400,
      regions: 4,
      averageDeliveryTime: 14
    }

    setTimeout(() => {
      setRegionalData(mockRegionalData)
      setDistributionMetrics(mockDistributionMetrics)
      setLoading(false)
    }, 1000)
  }, [])

  const totalSchools = regionalData.reduce((sum, region) => sum + region.schools, 0)
  const totalStudents = regionalData.reduce((sum, region) => sum + region.students, 0)
  const totalTeachers = regionalData.reduce((sum, region) => sum + region.teachers, 0)
  const totalBooksDistributed = regionalData.reduce((sum, region) => sum + region.booksDistributed, 0)
  const averagePerformance = regionalData.reduce((sum, region) => sum + region.averagePerformance, 0) / regionalData.length
  const totalBudgetUtilized = regionalData.reduce((sum, region) => sum + region.budgetUtilized, 0)
  const totalBudget = regionalData.reduce((sum, region) => sum + region.totalBudget, 0)

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
          <h1 className="text-2xl font-bold text-gray-900">Government Dashboard</h1>
          <p className="text-gray-600">Monitor educational initiatives and regional performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Calendar className="w-3 h-3 mr-1" />
            Q1 2024
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <MapPin className="w-3 h-3 mr-1" />
            4 Provinces
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Schools</p>
                <p className="text-2xl font-bold text-gray-900">{totalSchools.toLocaleString()}</p>
                <p className="text-xs text-blue-600">Across all provinces</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <School className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5.2% from last year
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Books Distributed</p>
                <p className="text-2xl font-bold text-gray-900">{totalBooksDistributed.toLocaleString()}</p>
                <p className="text-xs text-purple-600">This academic year</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Budget Utilization</p>
                <p className="text-2xl font-bold text-gray-900">{((totalBudgetUtilized / totalBudget) * 100).toFixed(1)}%</p>
                <p className="text-xs text-orange-600">${totalBudgetUtilized.toLocaleString()} / ${totalBudget.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="regional" className="space-y-4">
        <TabsList>
          <TabsTrigger value="regional">Regional Overview</TabsTrigger>
          <TabsTrigger value="distribution">Book Distribution</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
          <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="regional" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regionalData.map(region => (
              <Card key={region.region} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{region.region}</CardTitle>
                    <Badge variant="outline">
                      {region.averagePerformance >= 80 ? (
                        <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                      ) : region.averagePerformance >= 75 ? (
                        <Target className="w-3 h-3 mr-1 text-yellow-600" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 mr-1 text-red-600" />
                      )}
                      {region.averagePerformance}% avg
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Schools</span>
                        <p className="font-medium">{region.schools}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Students</span>
                        <p className="font-medium">{region.students.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Teachers</span>
                        <p className="font-medium">{region.teachers.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Books</span>
                        <p className="font-medium">{region.booksDistributed.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Budget Utilization</span>
                        <span className="font-medium">{((region.budgetUtilized / region.totalBudget) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(region.budgetUtilized / region.totalBudget) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          {distributionMetrics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Distribution Rate</p>
                    <p className="text-2xl font-bold text-green-600">
                      {((distributionMetrics.distributed / distributionMetrics.totalBooks) * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500">
                      {distributionMetrics.distributed.toLocaleString()} / {distributionMetrics.totalBooks.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Pending Distribution</p>
                    <p className="text-2xl font-bold text-orange-600">{distributionMetrics.pending.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Books awaiting delivery</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Avg Delivery Time</p>
                    <p className="text-2xl font-bold text-blue-600">{distributionMetrics.averageDeliveryTime}</p>
                    <p className="text-xs text-gray-500">Days from order to delivery</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Distribution by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionalData.map(region => (
                  <div key={region.region} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{region.region}</span>
                      <span className="text-sm text-gray-600">{region.booksDistributed.toLocaleString()} books</span>
                    </div>
                    <Progress 
                      value={(region.booksDistributed / totalBooksDistributed) * 100} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionalData
                  .sort((a, b) => b.averagePerformance - a.averagePerformance)
                  .map((region, index) => (
                    <div key={region.region} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{region.region}</h4>
                          <p className="text-sm text-gray-600">{region.students.toLocaleString()} students</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{region.averagePerformance}%</p>
                        <p className="text-sm text-gray-600">Average performance</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation & Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionalData.map(region => {
                  const utilizationRate = (region.budgetUtilized / region.totalBudget) * 100
                  return (
                    <div key={region.region} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{region.region}</span>
                        <div className="text-right">
                          <span className="text-sm font-medium">${region.budgetUtilized.toLocaleString()}</span>
                          <span className="text-sm text-gray-600"> / ${region.totalBudget.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={utilizationRate} className="flex-1 h-2" />
                        <span className="text-sm text-gray-600 w-12">{utilizationRate.toFixed(0)}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}