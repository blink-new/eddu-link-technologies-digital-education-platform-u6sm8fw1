import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Eye,
  Star,
  Clock,
  Users,
  Bookmark
} from 'lucide-react'

interface Textbook {
  id: string
  title: string
  subject: string
  grade: string
  author: string
  publisher: string
  coverImage: string
  rating: number
  downloads: number
  lastAccessed?: string
  isBookmarked: boolean
  accessType: 'full' | 'preview' | 'rental'
  price: number
}

export function DigitalTextbooks() {
  const [textbooks, setTextbooks] = useState<Textbook[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for textbooks
    const mockTextbooks: Textbook[] = [
      {
        id: '1',
        title: 'Advanced Mathematics Grade 12',
        subject: 'Mathematics',
        grade: 'Grade 12',
        author: 'Dr. Sarah Johnson',
        publisher: 'Academic Press',
        coverImage: '/api/placeholder/150/200',
        rating: 4.7,
        downloads: 2340,
        lastAccessed: '2024-02-14T10:30:00',
        isBookmarked: true,
        accessType: 'full',
        price: 0
      },
      {
        id: '2',
        title: 'Biology Fundamentals',
        subject: 'Biology',
        grade: 'Grade 10',
        author: 'Prof. Michael Chen',
        publisher: 'Science Publications',
        coverImage: '/api/placeholder/150/200',
        rating: 4.5,
        downloads: 1890,
        lastAccessed: '2024-02-13T14:15:00',
        isBookmarked: false,
        accessType: 'rental',
        price: 15.99
      },
      {
        id: '3',
        title: 'World History: Modern Era',
        subject: 'History',
        grade: 'Grade 11',
        author: 'Dr. Emily Rodriguez',
        publisher: 'Historical Studies Inc.',
        coverImage: '/api/placeholder/150/200',
        rating: 4.3,
        downloads: 1456,
        isBookmarked: true,
        accessType: 'preview',
        price: 12.50
      },
      {
        id: '4',
        title: 'Chemistry Lab Manual',
        subject: 'Chemistry',
        grade: 'Grade 11',
        author: 'Dr. James Wilson',
        publisher: 'Lab Sciences',
        coverImage: '/api/placeholder/150/200',
        rating: 4.6,
        downloads: 1234,
        isBookmarked: false,
        accessType: 'full',
        price: 0
      },
      {
        id: '5',
        title: 'English Literature Anthology',
        subject: 'English',
        grade: 'Grade 9',
        author: 'Prof. Lisa Thompson',
        publisher: 'Literary Works',
        coverImage: '/api/placeholder/150/200',
        rating: 4.4,
        downloads: 1678,
        lastAccessed: '2024-02-12T16:45:00',
        isBookmarked: true,
        accessType: 'rental',
        price: 18.75
      },
      {
        id: '6',
        title: 'Physics Principles',
        subject: 'Physics',
        grade: 'Grade 12',
        author: 'Dr. Robert Kim',
        publisher: 'Physics Today',
        coverImage: '/api/placeholder/150/200',
        rating: 4.8,
        downloads: 2156,
        isBookmarked: false,
        accessType: 'preview',
        price: 22.00
      }
    ]

    setTimeout(() => {
      setTextbooks(mockTextbooks)
      setLoading(false)
    }, 1000)
  }, [])

  const subjects = ['all', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'History', 'English']
  
  const filteredTextbooks = textbooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || book.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  const recentlyAccessed = textbooks
    .filter(book => book.lastAccessed)
    .sort((a, b) => new Date(b.lastAccessed!).getTime() - new Date(a.lastAccessed!).getTime())
    .slice(0, 3)

  const bookmarkedBooks = textbooks.filter(book => book.isBookmarked)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
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
          <h1 className="text-2xl font-bold text-gray-900">Digital Textbooks</h1>
          <p className="text-gray-600">Access your curriculum textbooks and educational resources</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <BookOpen className="w-3 h-3 mr-1" />
            {textbooks.length} Books Available
          </Badge>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search textbooks, authors, or subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Books</TabsTrigger>
          <TabsTrigger value="recent">Recently Accessed</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTextbooks.map(book => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg leading-tight">{book.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setTextbooks(prev => prev.map(b => 
                          b.id === book.id ? { ...b, isBookmarked: !b.isBookmarked } : b
                        ))
                      }}
                    >
                      <Bookmark className={`w-4 h-4 ${book.isBookmarked ? 'fill-current text-blue-600' : 'text-gray-400'}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{book.subject}</Badge>
                      <Badge variant="outline">{book.grade}</Badge>
                      <Badge 
                        className={
                          book.accessType === 'full' ? 'bg-green-100 text-green-800' :
                          book.accessType === 'rental' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {book.accessType}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{book.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{book.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    {book.lastAccessed && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>Last read: {new Date(book.lastAccessed).toLocaleDateString()}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      <Button className="flex-1" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        {book.accessType === 'preview' ? 'Preview' : 'Read'}
                      </Button>
                      {book.accessType !== 'full' && (
                        <Button variant="outline" size="sm">
                          ${book.price}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyAccessed.map(book => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg leading-tight">{book.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{book.subject}</Badge>
                      <Badge variant="outline">{book.grade}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Last read: {new Date(book.lastAccessed!).toLocaleDateString()}</span>
                    </div>

                    <Button className="w-full" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Continue Reading
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarked" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedBooks.map(book => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg leading-tight">{book.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                    </div>
                    <Bookmark className="w-5 h-5 fill-current text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{book.subject}</Badge>
                      <Badge variant="outline">{book.grade}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{book.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{book.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button className="w-full" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Read Book
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}