import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
  Settings
} from 'lucide-react'

interface DrawingTool {
  type: 'pen' | 'eraser'
  size: number
  color: string
}

export function ExerciseBook() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(3)
  const [tool, setTool] = useState<DrawingTool>({
    type: 'pen',
    size: 2,
    color: '#1e40af'
  })
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null)

  const drawPaperBackground = (ctx: CanvasRenderingContext2D) => {
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
  }

  const saveToHistory = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Validate canvas dimensions before creating ImageData
    if (canvas.width <= 0 || canvas.height <= 0 || canvas.width > 2000 || canvas.height > 2000) {
      console.warn('Invalid canvas dimensions for history save:', canvas.width, canvas.height)
      return
    }

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      
      setHistory(prevHistory => {
        setHistoryIndex(prevIndex => {
          const newHistory = prevHistory.slice(0, prevIndex + 1)
          
          // Limit history size to prevent memory issues
          if (newHistory.length >= 20) {
            newHistory.shift() // Remove oldest entry
            return newHistory.length - 1 // Adjusted for shift
          }
          
          newHistory.push(imageData)
          return newHistory.length - 1
        })
        
        const newHistory = prevHistory.slice(0, historyIndex + 1)
        
        // Limit history size to prevent memory issues
        if (newHistory.length >= 20) {
          newHistory.shift() // Remove oldest entry
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
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set reasonable canvas size with bounds checking
    const maxWidth = 800
    const maxHeight = 600
    const containerWidth = Math.min(canvas.offsetWidth || maxWidth, maxWidth)
    const containerHeight = Math.min(canvas.offsetHeight || maxHeight, maxHeight)
    
    canvas.width = containerWidth > 0 ? containerWidth : maxWidth
    canvas.height = containerHeight > 0 ? containerHeight : maxHeight

    // Draw manila paper background
    drawPaperBackground(ctx)
    
    // Save initial state with error handling
    try {
      // Call saveToHistory directly to avoid dependency issues
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      setHistory([imageData])
      setHistoryIndex(0)
    } catch (error) {
      console.warn('Failed to save initial canvas state:', error)
    }
  }, [currentPage])

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

    // Set up drawing style
    ctx.lineWidth = tool.size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (tool.type === 'pen') {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = tool.color
    } else {
      ctx.globalCompositeOperation = 'destination-out'
    }

    // Start a new path for continuous drawing
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

    // Continue the path to current position (this creates smooth continuous lines)
    ctx.lineTo(currentPos.x, currentPos.y)
    ctx.stroke()

    // Update last point
    setLastPoint(currentPos)
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      setLastPoint(null)
      // Save to history with a small delay to ensure drawing is complete
      setTimeout(() => {
        saveToHistory()
      }, 10)
    }
  }

  const clearPage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaperBackground(ctx)
    saveToHistory()
  }

  const addNewPage = () => {
    setTotalPages(prev => prev + 1)
    setCurrentPage(totalPages + 1)
  }

  const exportPage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `exercise-book-page-${currentPage}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exercise Book</h1>
          <p className="text-gray-600">Write and draw just like on real manila paper</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            Page {currentPage} of {totalPages}
          </Badge>
          <Badge variant="secondary">
            Auto-saved
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tools Panel */}
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
                  onClick={undo}
                  disabled={historyIndex <= 0}
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                >
                  <Redo className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearPage}
                className="w-full"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear Page
              </Button>
            </div>

            <Separator />

            {/* Save & Export */}
            <div className="space-y-2">
              <Button size="sm" className="w-full">
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportPage}
                className="w-full"
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Canvas Area */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Page {currentPage}</CardTitle>
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
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addNewPage}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-inner">
              <canvas
                ref={canvasRef}
                className="w-full cursor-crosshair"
                style={{ 
                  backgroundColor: '#fef7ed',
                  height: '600px',
                  maxWidth: '800px'
                }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Click and drag to write or draw on the manila paper</p>
              <p>Use the tools on the left to customize your writing experience</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}