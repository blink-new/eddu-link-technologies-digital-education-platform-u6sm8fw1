import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Pen,
  Eraser,
  Undo,
  Redo,
  Save,
  Download,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  BookOpen,
  Grid3X3,
  Minus,
  SplitSquareHorizontal,
  Maximize,
  Eye,
  Settings
} from 'lucide-react'
import { blink } from '@/blink/client'

interface DrawingTool {
  type: 'pen' | 'eraser'
  size: number
  color: string
}

interface ExerciseBookData {
  id: string
  title: string
  subject: string
  bookType: 'lined' | 'squared' | 'blank'
  pages: string[]
  currentPage: number
  totalPages: number
}

interface SplitViewProps {
  leftContent: React.ReactNode
  rightContent: React.ReactNode
  onToggleView: () => void
  viewMode: 'split' | 'left' | 'right'
}

function SplitView({ leftContent, rightContent, onToggleView, viewMode }: SplitViewProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b">
        <h3 className="font-medium">Split View Mode</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onToggleView}>
            {viewMode === 'split' ? <Maximize className="w-4 h-4" /> : <SplitSquareHorizontal className="w-4 h-4" />}
            {viewMode === 'split' ? 'Full Screen' : 'Split View'}
          </Button>
        </div>
      </div>
      <div className="flex-1 flex">
        {(viewMode === 'split' || viewMode === 'left') && (
          <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} border-r`}>
            {leftContent}
          </div>
        )}
        {(viewMode === 'split' || viewMode === 'right') && (
          <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'}`}>
            {rightContent}
          </div>
        )}
      </div>
    </div>
  )
}

export function EnhancedExerciseBook() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [exerciseBooks, setExerciseBooks] = useState<ExerciseBookData[]>([])
  const [currentBookId, setCurrentBookId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [tool, setTool] = useState<DrawingTool>({
    type: 'pen',
    size: 2,
    color: '#1e40af'
  })
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null)
  const [splitViewMode, setSplitViewMode] = useState<'split' | 'left' | 'right'>('split')
  const [showSplitView, setShowSplitView] = useState(false)
  const [newBookDialog, setNewBookDialog] = useState(false)

  useEffect(() => {
    // Mock exercise books data
    const mockExerciseBooks: ExerciseBookData[] = [
      {
        id: '1',
        title: 'Mathematics Exercise Book',
        subject: 'Mathematics',
        bookType: 'squared',
        pages: ['', '', ''],
        currentPage: 1,
        totalPages: 3
      },
      {
        id: '2',
        title: 'English Composition',
        subject: 'English',
        bookType: 'lined',
        pages: ['', '', '', ''],
        currentPage: 1,
        totalPages: 4
      },
      {
        id: '3',
        title: 'Science Lab Notes',
        subject: 'Biology',
        bookType: 'blank',
        pages: ['', ''],
        currentPage: 1,
        totalPages: 2
      },
      {
        id: '4',
        title: 'Physics Calculations',
        subject: 'Physics',
        bookType: 'squared',
        pages: ['', '', '', '', ''],
        currentPage: 1,
        totalPages: 5
      },
      {
        id: '5',
        title: 'History Essays',
        subject: 'History',
        bookType: 'lined',
        pages: ['', '', ''],
        currentPage: 1,
        totalPages: 3
      }
    ]
    
    setExerciseBooks(mockExerciseBooks)
    setCurrentBookId(mockExerciseBooks[0].id)
  }, [])

  const currentBook = exerciseBooks.find(book => book.id === currentBookId)

  const drawPaperBackground = (ctx: CanvasRenderingContext2D, bookType: 'lined' | 'squared' | 'blank') => {
    const canvas = ctx.canvas
    
    // Manila paper background color
    ctx.fillStyle = '#fef7ed'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw margin line (red)
    ctx.strokeStyle = '#ef4444'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(60, 0)
    ctx.lineTo(60, canvas.height)
    ctx.stroke()
    
    if (bookType === 'lined') {
      // Draw horizontal lines (light blue)
      ctx.strokeStyle = '#93c5fd'
      ctx.lineWidth = 0.5
      const lineSpacing = 25
      for (let y = lineSpacing; y < canvas.height; y += lineSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    } else if (bookType === 'squared') {
      // Draw grid pattern (light blue)
      ctx.strokeStyle = '#93c5fd'
      ctx.lineWidth = 0.3
      const gridSize = 20
      
      // Vertical lines
      for (let x = gridSize; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      
      // Horizontal lines
      for (let y = gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }
    // For 'blank' type, only margin line is drawn
  }

  const saveToHistory = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (canvas.width <= 0 || canvas.height <= 0 || canvas.width > 2000 || canvas.height > 2000) {
      console.warn('Invalid canvas dimensions for history save:', canvas.width, canvas.height)
      return
    }

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      
      setHistory(prevHistory => {
        setHistoryIndex(prevIndex => {
          const newHistory = prevHistory.slice(0, prevIndex + 1)
          
          if (newHistory.length >= 20) {
            newHistory.shift()
            return newHistory.length - 1
          }
          
          newHistory.push(imageData)
          return newHistory.length - 1
        })
        
        const newHistory = prevHistory.slice(0, historyIndex + 1)
        
        if (newHistory.length >= 20) {
          newHistory.shift()
        }
        
        newHistory.push(imageData)
        return newHistory
      })
    } catch (error) {
      console.error('Failed to save canvas state to history:', error)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !currentBook) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const maxWidth = 800
    const maxHeight = 600
    const containerWidth = Math.min(canvas.offsetWidth || maxWidth, maxWidth)
    const containerHeight = Math.min(canvas.offsetHeight || maxHeight, maxHeight)
    
    canvas.width = containerWidth > 0 ? containerWidth : maxWidth
    canvas.height = containerHeight > 0 ? containerHeight : maxHeight

    drawPaperBackground(ctx, currentBook.bookType)
    
    try {
      // Call saveToHistory directly to avoid dependency issues
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      setHistory([imageData])
      setHistoryIndex(0)
    } catch (error) {
      console.warn('Failed to save initial canvas state:', error)
    }
  }, [currentPage, currentBookId, currentBook])

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const newIndex = historyIndex - 1
      try {
        ctx.putImageData(history[newIndex], 0, 0)
        setHistoryIndex(newIndex)
      } catch (error) {
        console.error('Failed to restore canvas state:', error)
      }
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const newIndex = historyIndex + 1
      try {
        ctx.putImageData(history[newIndex], 0, 0)
        setHistoryIndex(newIndex)
      } catch (error) {
        console.error('Failed to restore canvas state:', error)
      }
    }
  }

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setIsDrawing(true)
    const pos = getMousePos(e)
    setLastPoint(pos)

    ctx.lineWidth = tool.size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (tool.type === 'pen') {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = tool.color
    } else {
      ctx.globalCompositeOperation = 'destination-out'
    }

    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const currentPos = getMousePos(e)
    ctx.lineTo(currentPos.x, currentPos.y)
    ctx.stroke()
    setLastPoint(currentPos)
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      setLastPoint(null)
      setTimeout(() => {
        saveToHistory()
      }, 10)
    }
  }

  const clearPage = () => {
    const canvas = canvasRef.current
    if (!canvas || !currentBook) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaperBackground(ctx, currentBook.bookType)
    saveToHistory()
  }

  const addNewPage = () => {
    if (!currentBook) return
    
    const updatedBooks = exerciseBooks.map(book => 
      book.id === currentBookId 
        ? { ...book, totalPages: book.totalPages + 1, pages: [...book.pages, ''] }
        : book
    )
    setExerciseBooks(updatedBooks)
    setCurrentPage(currentBook.totalPages + 1)
  }

  const createNewBook = (title: string, subject: string, bookType: 'lined' | 'squared' | 'blank') => {
    const newBook: ExerciseBookData = {
      id: Date.now().toString(),
      title,
      subject,
      bookType,
      pages: [''],
      currentPage: 1,
      totalPages: 1
    }
    
    setExerciseBooks([...exerciseBooks, newBook])
    setCurrentBookId(newBook.id)
    setNewBookDialog(false)
  }

  const exportPage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `${currentBook?.title}-page-${currentPage}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const toggleSplitView = () => {
    setShowSplitView(!showSplitView)
  }

  const toggleViewMode = () => {
    const modes: ('split' | 'left' | 'right')[] = ['split', 'left', 'right']
    const currentIndex = modes.indexOf(splitViewMode)
    const nextIndex = (currentIndex + 1) % modes.length
    setSplitViewMode(modes[nextIndex])
  }

  const renderExerciseBookCanvas = () => (
    <div className="space-y-4">
      {/* Book Selection */}
      <div className="flex items-center justify-between">
        <Select value={currentBookId || ''} onValueChange={setCurrentBookId}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select exercise book" />
          </SelectTrigger>
          <SelectContent>
            {exerciseBooks.map(book => (
              <SelectItem key={book.id} value={book.id}>
                <div className="flex items-center gap-2">
                  {book.bookType === 'lined' && <Minus className="w-4 h-4" />}
                  {book.bookType === 'squared' && <Grid3X3 className="w-4 h-4" />}
                  {book.bookType === 'blank' && <BookOpen className="w-4 h-4" />}
                  {book.title}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {currentBook?.bookType === 'lined' && 'Lined Paper'}
            {currentBook?.bookType === 'squared' && 'Squared Paper'}
            {currentBook?.bookType === 'blank' && 'Blank Paper'}
          </Badge>
          <Badge variant="outline">
            Page {currentPage} of {currentBook?.totalPages || 1}
          </Badge>
        </div>
      </div>

      {/* Canvas */}
      <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-inner">
        <canvas
          ref={canvasRef}
          className="w-full cursor-crosshair"
          style={{ 
            backgroundColor: '#fef7ed',
            height: '500px',
            maxWidth: '100%'
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      {/* Page Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(currentBook?.totalPages || 1, currentPage + 1))}
            disabled={currentPage === (currentBook?.totalPages || 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={addNewPage}
          >
            <Plus className="w-4 h-4" />
            Add Page
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={clearPage}>
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={exportPage}>
            <Download className="w-4 h-4" />
          </Button>
          <Button size="sm">
            <Save className="w-4 h-4 mr-1" />
            Auto-saved
          </Button>
        </div>
      </div>
    </div>
  )

  const renderTextbookViewer = () => (
    <div className="h-full bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow h-full p-6">
        <h3 className="text-lg font-semibold mb-4">Mathematics Textbook - Chapter 5</h3>
        <div className="prose max-w-none">
          <h4>Quadratic Equations</h4>
          <p>A quadratic equation is a polynomial equation of degree 2. The general form is:</p>
          <div className="bg-gray-100 p-4 rounded my-4 text-center">
            <strong>ax² + bx + c = 0</strong>
          </div>
          <p>Where a, b, and c are constants and a ≠ 0.</p>
          
          <h5>Methods of Solving Quadratic Equations:</h5>
          <ol>
            <li><strong>Factoring:</strong> Express the equation as a product of linear factors</li>
            <li><strong>Completing the Square:</strong> Rewrite the equation in perfect square form</li>
            <li><strong>Quadratic Formula:</strong> Use the formula x = (-b ± √(b²-4ac))/2a</li>
          </ol>
          
          <div className="bg-blue-50 p-4 rounded my-4">
            <strong>Example:</strong> Solve x² - 5x + 6 = 0
            <br />
            Solution: (x - 2)(x - 3) = 0
            <br />
            Therefore: x = 2 or x = 3
          </div>
        </div>
      </div>
    </div>
  )

  if (!currentBook) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No exercise books yet</h3>
            <p className="text-gray-600 mb-4">Create your first exercise book to start writing</p>
            <Dialog open={newBookDialog} onOpenChange={setNewBookDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Exercise Book
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Exercise Book</DialogTitle>
                </DialogHeader>
                <NewBookForm onSubmit={createNewBook} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exercise Books</h1>
          <p className="text-gray-600">Interactive exercise books with manila paper feel</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={newBookDialog} onOpenChange={setNewBookDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New Book
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Exercise Book</DialogTitle>
              </DialogHeader>
              <NewBookForm onSubmit={createNewBook} />
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={toggleSplitView}>
            <SplitSquareHorizontal className="w-4 h-4 mr-2" />
            {showSplitView ? 'Exit Split View' : 'Split View'}
          </Button>
        </div>
      </div>

      {showSplitView ? (
        <Card className="h-[800px]">
          <SplitView
            leftContent={renderTextbookViewer()}
            rightContent={
              <div className="h-full p-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
                  <ToolsPanel tool={tool} setTool={setTool} onUndo={undo} onRedo={redo} historyIndex={historyIndex} historyLength={history.length} />
                  <div className="lg:col-span-3">
                    {renderExerciseBookCanvas()}
                  </div>
                </div>
              </div>
            }
            onToggleView={toggleViewMode}
            viewMode={splitViewMode}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <ToolsPanel tool={tool} setTool={setTool} onUndo={undo} onRedo={redo} historyIndex={historyIndex} historyLength={history.length} />
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {currentBook.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderExerciseBookCanvas()}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

function ToolsPanel({ tool, setTool, onUndo, onRedo, historyIndex, historyLength }: {
  tool: DrawingTool
  setTool: (tool: DrawingTool) => void
  onUndo: () => void
  onRedo: () => void
  historyIndex: number
  historyLength: number
}) {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drawing Tools */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Drawing Tools</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={tool.type === 'pen' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTool(prev => ({ ...prev, type: 'pen' }))}
            >
              <Pen className="w-4 h-4 mr-1" />
              Pen
            </Button>
            <Button
              variant={tool.type === 'eraser' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTool(prev => ({ ...prev, type: 'eraser' }))}
            >
              <Eraser className="w-4 h-4 mr-1" />
              Eraser
            </Button>
          </div>
        </div>

        <Separator />

        {/* Pen Settings */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Pen Settings</h4>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-600">Size: {tool.size}px</label>
              <input
                type="range"
                min="1"
                max="10"
                value={tool.size}
                onChange={(e) => setTool(prev => ({ ...prev, size: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Color</label>
              <div className="flex gap-2 mt-1">
                {['#1e40af', '#dc2626', '#16a34a', '#ca8a04', '#9333ea', '#000000'].map(color => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded border-2 ${
                      tool.color === color ? 'border-gray-400' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setTool(prev => ({ ...prev, color }))}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onUndo}
              disabled={historyIndex <= 0}
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onRedo}
              disabled={historyIndex >= historyLength - 1}
            >
              <Redo className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function NewBookForm({ onSubmit }: { onSubmit: (title: string, subject: string, bookType: 'lined' | 'squared' | 'blank') => void }) {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [bookType, setBookType] = useState<'lined' | 'squared' | 'blank'>('lined')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && subject) {
      onSubmit(title, subject, bookType)
      setTitle('')
      setSubject('')
      setBookType('lined')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Book Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Mathematics Exercise Book"
          required
        />
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Biology">Biology</SelectItem>
            <SelectItem value="Chemistry">Chemistry</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="History">History</SelectItem>
            <SelectItem value="Geography">Geography</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="bookType">Paper Type</Label>
        <Select value={bookType} onValueChange={(value: 'lined' | 'squared' | 'blank') => setBookType(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lined">
              <div className="flex items-center gap-2">
                <Minus className="w-4 h-4" />
                Lined Paper (for writing)
              </div>
            </SelectItem>
            <SelectItem value="squared">
              <div className="flex items-center gap-2">
                <Grid3X3 className="w-4 h-4" />
                Squared Paper (for mathematics)
              </div>
            </SelectItem>
            <SelectItem value="blank">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Blank Paper (for drawing)
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Create Exercise Book
      </Button>
    </form>
  )
}