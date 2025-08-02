import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  Upload,
  Eye,
  Download,
  Calendar
} from 'lucide-react'

interface BookData {
  id: string
  title: string
  subject: string
  grade: string
  status: 'approved' | 'pending' | 'rejected'
  sales: number
  revenue: number
  downloads: number
  rating: number
  reviews: number
  publishDate: string
}

interface SalesMetrics {
  totalRevenue: number
  totalSales: number
  totalDownloads: number
  averageRating: number
  activeBooks: number
  pendingApproval: number
}

export function PublisherDashboard() {
  const [books, setBooks] = useState<BookData[]>([])
  const [salesMetrics, setSalesMetrics] = useState<SalesMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for publisher dashboard
    const mockBooks: BookData[] = [
      {
        id: '1',
        title: 'Advanced Mathematics Grade 12',
        subject: 'Mathematics',
        grade: 'Grade 12',
        status: 'approved',
        sales: 1250,
        revenue: 18750,
        downloads: 2340,
        rating: 4.7,
        reviews: 89,
        publishDate: '2024-01-15'
      },
      {
        id: '2',
        title: 'Biology Fundamentals Grade 10',
        subject: 'Biology',
        grade: 'Grade 10',
        status: 'approved',
        sales: 980,
        revenue: 14700,
        downloads: 1890,
        rating: 4.5,
        reviews: 67,
        publishDate: '2024-02-01'
      },
      {
        id: '3',
        title: 'World History Grade 11',
        subject: 'History',
        grade: 'Grade 11',
        status: 'pending',
        sales: 0,
        revenue: 0,
        downloads: 0,
        rating: 0,
        reviews: 0,
        publishDate: '2024-02-20'
      },
      {
        id: '4',
        title: 'Chemistry Lab Manual Grade 11',
        subject: 'Chemistry',
        grade: 'Grade 11',
        status: 'approved',
        sales: 756,
        revenue: 11340,
        downloads: 1456,
        rating: 4.3,
        reviews: 45,
        publishDate: '2024-01-28'
      },
      {
        id: '5',
        title: 'English Literature Grade 9',
        subject: 'English',
        grade: 'Grade 9',
        status: 'rejected',
        sales: 0,
        revenue: 0,
        downloads: 0,
        rating: 0,
        reviews: 0,
        publishDate: '2024-02-10'
      }
    ]

    const mockSalesMetrics: SalesMetrics = {
      totalRevenue: 44790,
      totalSales: 2986,
      totalDownloads: 5686,
      averageRating: 4.5,
      activeBooks: 3,
      pendingApproval: 1
    }

    setTimeout(() => {
      setBooks(mockBooks)
      setSalesMetrics(mockSalesMetrics)
      setLoading(false)
    }, 1000)
  }, [])

  const approvedBooks = books.filter(book => book.status === 'approved')
  const pendingBooks = books.filter(book => book.status === 'pending')
  const rejectedBooks = books.filter(book => book.status === 'rejected')
  const topPerformingBook = approvedBooks.sort((a, b) => b.revenue - a.revenue)[0]

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
          <h1 className="text-2xl font-bold text-gray-900">Publisher Dashboard</h1>
          <p className="text-gray-600">Manage your textbook catalog and track sales performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Calendar className="w-3 h-3 mr-1" />
            Q1 2024
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <BookOpen className="w-3 h-3 mr-1" />
            {salesMetrics?.activeBooks} Active Books
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${salesMetrics?.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5% this month
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">{salesMetrics?.totalSales.toLocaleString()}</p>
                <p className="text-xs text-blue-600">Books sold</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Downloads</p>
                <p className="text-2xl font-bold text-gray-900">{salesMetrics?.totalDownloads.toLocaleString()}</p>
                <p className="text-xs text-purple-600">Digital access</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{salesMetrics?.averageRating.toFixed(1)}</p>
                <p className="text-xs text-orange-600 flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  Customer satisfaction
                </p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="catalog" className="space-y-4">
        <TabsList>
          <TabsTrigger value="catalog">Book Catalog</TabsTrigger>
          <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
          <TabsTrigger value="approval">Approval Status</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Published Books</h3>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload New Book
            </Button>
          </div>
          
          <div className="space-y-4">
            {books.map(book => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{book.title}</h4>
                        <Badge variant="outline">{book.subject}</Badge>
                        <Badge variant="outline">{book.grade}</Badge>
                        <Badge 
                          className={
                            book.status === 'approved' ? 'bg-green-100 text-green-800' :
                            book.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {book.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {book.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                          {book.status === 'rejected' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {book.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Sales</p>
                          <p className="font-medium">{book.sales.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Revenue</p>
                          <p className="font-medium">${book.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Downloads</p>
                          <p className="font-medium">{book.downloads.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Rating</p>
                          <p className="font-medium flex items-center">
                            {book.rating > 0 ? (
                              <>
                                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                {book.rating.toFixed(1)} ({book.reviews})
                              </>
                            ) : (
                              'No ratings yet'
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Published</p>
                          <p className="font-medium">{new Date(book.publishDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Book</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedBooks
                    .sort((a, b) => b.revenue - a.revenue)
                    .map((book, index) => {
                      const maxRevenue = Math.max(...approvedBooks.map(b => b.revenue))
                      const percentage = (book.revenue / maxRevenue) * 100
                      
                      return (
                        <div key={book.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">#{index + 1}</span>
                              <span className="font-medium">{book.title}</span>
                            </div>
                            <span className="text-sm text-gray-600">${book.revenue.toLocaleString()}</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformingBook && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Top Performer</span>
                      </div>
                      <h4 className="font-semibold text-green-900">{topPerformingBook.title}</h4>
                      <p className="text-sm text-green-700">
                        ${topPerformingBook.revenue.toLocaleString()} revenue • {topPerformingBook.sales.toLocaleString()} sales
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-900">Average Revenue per Book</p>
                        <p className="text-sm text-blue-700">
                          ${(salesMetrics?.totalRevenue / salesMetrics?.activeBooks).toLocaleString()}
                        </p>
                      </div>
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium text-purple-900">Download-to-Sale Ratio</p>
                        <p className="text-sm text-purple-700">
                          {((salesMetrics?.totalDownloads / salesMetrics?.totalSales) || 0).toFixed(1)}:1
                        </p>
                      </div>
                      <Download className="w-5 h-5 text-purple-600" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium text-orange-900">Customer Satisfaction</p>
                        <p className="text-sm text-orange-700">
                          {salesMetrics?.averageRating.toFixed(1)}/5.0 average rating
                        </p>
                      </div>
                      <Star className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="approval" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-900">{approvedBooks.length}</p>
                  <p className="text-sm text-green-700">Approved Books</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-900">{pendingBooks.length}</p>
                  <p className="text-sm text-yellow-700">Pending Review</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-red-900">{rejectedBooks.length}</p>
                  <p className="text-sm text-red-700">Rejected</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Approval Status Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {books.map(book => (
                  <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{book.title}</h4>
                      <p className="text-sm text-gray-600">{book.subject} • {book.grade}</p>
                      <p className="text-xs text-gray-500">Submitted: {new Date(book.publishDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={
                          book.status === 'approved' ? 'bg-green-100 text-green-800' :
                          book.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {book.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {book.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {book.status === 'rejected' && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {book.status}
                      </Badge>
                      {book.status === 'pending' && (
                        <p className="text-xs text-gray-500 mt-1">Est. review: 3-5 days</p>
                      )}
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
                <CardTitle>Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Mathematics', 'Biology', 'Chemistry', 'History', 'English'].map(subject => {
                    const subjectBooks = approvedBooks.filter(book => book.subject === subject)
                    const subjectRevenue = subjectBooks.reduce((sum, book) => sum + book.revenue, 0)
                    const maxSubjectRevenue = Math.max(
                      ...['Mathematics', 'Biology', 'Chemistry', 'History', 'English']
                        .map(s => approvedBooks.filter(b => b.subject === s).reduce((sum, book) => sum + book.revenue, 0))
                    )
                    const percentage = maxSubjectRevenue > 0 ? (subjectRevenue / maxSubjectRevenue) * 100 : 0
                    
                    return (
                      <div key={subject} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{subject}</span>
                          <span className="text-sm text-gray-600">
                            ${subjectRevenue.toLocaleString()} ({subjectBooks.length} books)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Level Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(grade => {
                    const gradeBooks = approvedBooks.filter(book => book.grade === grade)
                    const gradeSales = gradeBooks.reduce((sum, book) => sum + book.sales, 0)
                    const maxGradeSales = Math.max(
                      ...['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
                        .map(g => approvedBooks.filter(b => b.grade === g).reduce((sum, book) => sum + book.sales, 0))
                    )
                    const percentage = maxGradeSales > 0 ? (gradeSales / maxGradeSales) * 100 : 0
                    
                    return (
                      <div key={grade} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{grade}</span>
                          <span className="text-sm text-gray-600">
                            {gradeSales.toLocaleString()} sales ({gradeBooks.length} books)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}