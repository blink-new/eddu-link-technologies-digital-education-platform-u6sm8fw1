import { useState } from 'react'
import { Search, Filter, Download, Star, BookOpen, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Textbook {
  id: string
  title: string
  subject: string
  grade: string
  author: string
  publisher: string
  rating: number
  progress: number
  downloadStatus: 'downloaded' | 'downloading' | 'not-downloaded'
  coverImage: string
  description: string
  pages: number
  language: string
}

const sampleTextbooks: Textbook[] = [
  {
    id: '1',
    title: 'Advanced Mathematics Grade 12',
    subject: 'Mathematics',
    grade: 'Grade 12',
    author: 'Dr. Sarah Johnson',
    publisher: 'EduPress',
    rating: 4.8,
    progress: 65,
    downloadStatus: 'downloaded',
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=400&fit=crop',
    description: 'Comprehensive mathematics textbook covering calculus, algebra, and statistics.',
    pages: 456,
    language: 'English'
  },
  {
    id: '2',
    title: 'Biology: Life Sciences',
    subject: 'Biology',
    grade: 'Grade 11',
    author: 'Prof. Michael Chen',
    publisher: 'ScienceBooks',
    rating: 4.6,
    progress: 23,
    downloadStatus: 'downloading',
    coverImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=400&fit=crop',
    description: 'Explore the fascinating world of biology with detailed illustrations and experiments.',
    pages: 378,
    language: 'English'
  },
  {
    id: '3',
    title: 'World History Chronicles',
    subject: 'History',
    grade: 'Grade 10',
    author: 'Dr. Emily Rodriguez',
    publisher: 'HistoryPress',
    rating: 4.7,
    progress: 0,
    downloadStatus: 'not-downloaded',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    description: 'Journey through world history from ancient civilizations to modern times.',
    pages: 512,
    language: 'English'
  },
  {
    id: '4',
    title: 'Chemistry Fundamentals',
    subject: 'Chemistry',
    grade: 'Grade 11',
    author: 'Dr. James Wilson',
    publisher: 'ChemEd',
    rating: 4.5,
    progress: 45,
    downloadStatus: 'downloaded',
    coverImage: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=300&h=400&fit=crop',
    description: 'Master the principles of chemistry with practical experiments and clear explanations.',
    pages: 423,
    language: 'English'
  },
  {
    id: '5',
    title: 'English Literature Anthology',
    subject: 'English',
    grade: 'Grade 12',
    author: 'Prof. Amanda Thompson',
    publisher: 'LitPress',
    rating: 4.9,
    progress: 78,
    downloadStatus: 'downloaded',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    description: 'Classic and contemporary literature with analysis and critical thinking exercises.',
    pages: 567,
    language: 'English'
  },
  {
    id: '6',
    title: 'Physics: Mechanics & Waves',
    subject: 'Physics',
    grade: 'Grade 12',
    author: 'Dr. Robert Kim',
    publisher: 'PhysicsWorld',
    rating: 4.4,
    progress: 12,
    downloadStatus: 'not-downloaded',
    coverImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&h=400&fit=crop',
    description: 'Understand the fundamental principles of physics through theory and practical applications.',
    pages: 489,
    language: 'English'
  }
]

export function DigitalTextbooks() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedGrade, setSelectedGrade] = useState('all')

  const subjects = ['all', 'Mathematics', 'Biology', 'History', 'Chemistry', 'English', 'Physics']
  const grades = ['all', 'Grade 10', 'Grade 11', 'Grade 12']

  const filteredTextbooks = sampleTextbooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || book.subject === selectedSubject
    const matchesGrade = selectedGrade === 'all' || book.grade === selectedGrade
    
    return matchesSearch && matchesSubject && matchesGrade
  })

  const getDownloadStatusColor = (status: string) => {
    switch (status) {
      case 'downloaded': return 'bg-green-100 text-green-800'
      case 'downloading': return 'bg-yellow-100 text-yellow-800'
      case 'not-downloaded': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDownloadStatusText = (status: string) => {
    switch (status) {
      case 'downloaded': return 'Downloaded'
      case 'downloading': return 'Downloading...'
      case 'not-downloaded': return 'Not Downloaded'
      default: return 'Unknown'
    }
  }

  const handleDownload = (bookId: string) => {
    // Simulate download functionality
    console.log(`Downloading book ${bookId}`)
  }

  const handleOpenBook = (bookId: string) => {
    // Simulate opening book functionality
    console.log(`Opening book ${bookId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Digital Textbooks</h1>
          <p className="text-gray-600 mt-1">Access your digital library and download textbooks for offline reading</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {filteredTextbooks.length} books available
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by title, author, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
          
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {grades.map(grade => (
              <option key={grade} value={grade}>
                {grade === 'all' ? 'All Grades' : grade}
              </option>
            ))}
          </select>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Textbooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTextbooks.map((book) => (
          <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className={getDownloadStatusColor(book.downloadStatus)}>
                  {getDownloadStatusText(book.downloadStatus)}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{book.author}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{book.rating}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <Badge variant="secondary">{book.subject}</Badge>
                <span className="text-gray-600">{book.grade}</span>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {book.pages} pages
                </span>
                <span>{book.language}</span>
              </div>
              
              {book.progress > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Reading Progress</span>
                    <span className="text-blue-600">{book.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                {book.downloadStatus === 'downloaded' ? (
                  <Button
                    onClick={() => handleOpenBook(book.id)}
                    className="flex-1"
                    size="sm"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    {book.progress > 0 ? 'Continue Reading' : 'Start Reading'}
                  </Button>
                ) : book.downloadStatus === 'downloading' ? (
                  <Button disabled className="flex-1" size="sm">
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Downloading...
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleDownload(book.id)}
                    variant="outline"
                    className="flex-1"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTextbooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No textbooks found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  )
}