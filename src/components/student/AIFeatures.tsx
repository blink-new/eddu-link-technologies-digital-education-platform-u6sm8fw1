import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Brain,
  Sparkles,
  FileQuestion,
  ClipboardCheck,
  GraduationCap,
  Loader2,
  Download,
  RefreshCw,
  BookOpen,
  Target,
  Clock,
  Star
} from 'lucide-react'
import { blink } from '@/blink/client'

interface AIGeneratedContent {
  id: string
  type: 'revision_questions' | 'test' | 'sample_exam'
  subject: string
  topic: string
  content: any
  createdAt: string
}

export function AIFeatures() {
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [customTopic, setCustomTopic] = useState('')
  const [questionCount, setQuestionCount] = useState(10)
  const [difficulty, setDifficulty] = useState('medium')
  const [loading, setLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<AIGeneratedContent | null>(null)
  const [contentHistory, setContentHistory] = useState<AIGeneratedContent[]>([])

  const subjects = [
    'Mathematics',
    'Biology',
    'Chemistry',
    'Physics',
    'English',
    'History',
    'Geography'
  ]

  const topicsBySubject: Record<string, string[]> = {
    'Mathematics': [
      'Algebra',
      'Quadratic Equations',
      'Geometry',
      'Trigonometry',
      'Calculus',
      'Statistics',
      'Probability'
    ],
    'Biology': [
      'Cell Biology',
      'Genetics',
      'Evolution',
      'Ecology',
      'Human Anatomy',
      'Plant Biology',
      'Microbiology'
    ],
    'Chemistry': [
      'Atomic Structure',
      'Chemical Bonding',
      'Acids and Bases',
      'Organic Chemistry',
      'Thermodynamics',
      'Electrochemistry',
      'Chemical Kinetics'
    ],
    'Physics': [
      'Mechanics',
      'Thermodynamics',
      'Electromagnetism',
      'Optics',
      'Quantum Physics',
      'Nuclear Physics',
      'Waves and Sound'
    ],
    'English': [
      'Grammar',
      'Literature Analysis',
      'Creative Writing',
      'Poetry',
      'Essay Writing',
      'Reading Comprehension',
      'Vocabulary'
    ],
    'History': [
      'World War I',
      'World War II',
      'Ancient Civilizations',
      'Colonial Period',
      'Independence Movements',
      'Modern History',
      'African History'
    ],
    'Geography': [
      'Physical Geography',
      'Human Geography',
      'Climate and Weather',
      'Natural Resources',
      'Population Studies',
      'Economic Geography',
      'Environmental Issues'
    ]
  }

  const generateRevisionQuestions = async () => {
    setLoading(true)
    try {
      const topic = customTopic || selectedTopic
      
      // Use Blink AI to generate revision questions
      const { text } = await blink.ai.generateText({
        prompt: `Generate ${questionCount} revision questions for ${selectedSubject} on the topic of "${topic}". 
        Difficulty level: ${difficulty}. 
        Format the questions as a numbered list with clear, educational questions that help students review key concepts.
        Include a mix of question types: multiple choice, short answer, and essay questions.`,
        maxTokens: 1000
      })

      const newContent: AIGeneratedContent = {
        id: Date.now().toString(),
        type: 'revision_questions',
        subject: selectedSubject,
        topic: topic,
        content: { questions: text },
        createdAt: new Date().toISOString()
      }

      setGeneratedContent(newContent)
      setContentHistory(prev => [newContent, ...prev])
    } catch (error) {
      console.error('Failed to generate revision questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateTest = async () => {
    setLoading(true)
    try {
      const topic = customTopic || selectedTopic
      
      const { text } = await blink.ai.generateText({
        prompt: `Create a comprehensive test for ${selectedSubject} on "${topic}". 
        Include ${questionCount} questions with the following structure:
        - Multiple choice questions (4 options each)
        - Short answer questions
        - One essay question
        Difficulty: ${difficulty}
        Include an answer key at the end.
        Format professionally as a test paper.`,
        maxTokens: 1500
      })

      const newContent: AIGeneratedContent = {
        id: Date.now().toString(),
        type: 'test',
        subject: selectedSubject,
        topic: topic,
        content: { test: text },
        createdAt: new Date().toISOString()
      }

      setGeneratedContent(newContent)
      setContentHistory(prev => [newContent, ...prev])
    } catch (error) {
      console.error('Failed to generate test:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateSampleExam = async () => {
    setLoading(true)
    try {
      const topic = customTopic || selectedTopic
      
      const { text } = await blink.ai.generateText({
        prompt: `Create a sample exam for ${selectedSubject} focusing on "${topic}". 
        This should be a comprehensive exam with:
        - ${Math.floor(questionCount * 0.6)} multiple choice questions
        - ${Math.floor(questionCount * 0.3)} short answer questions  
        - ${Math.floor(questionCount * 0.1)} essay questions
        Difficulty: ${difficulty}
        Include time allocation suggestions and marking scheme.
        Format as a formal examination paper.`,
        maxTokens: 2000
      })

      const newContent: AIGeneratedContent = {
        id: Date.now().toString(),
        type: 'sample_exam',
        subject: selectedSubject,
        topic: topic,
        content: { exam: text },
        createdAt: new Date().toISOString()
      }

      setGeneratedContent(newContent)
      setContentHistory(prev => [newContent, ...prev])
    } catch (error) {
      console.error('Failed to generate sample exam:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadContent = (content: AIGeneratedContent) => {
    const text = content.type === 'revision_questions' ? content.content.questions :
                 content.type === 'test' ? content.content.test :
                 content.content.exam

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${content.subject}_${content.topic}_${content.type}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'revision_questions': return <FileQuestion className="w-4 h-4" />
      case 'test': return <ClipboardCheck className="w-4 h-4" />
      case 'sample_exam': return <GraduationCap className="w-4 h-4" />
      default: return <Brain className="w-4 h-4" />
    }
  }

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'revision_questions': return 'Revision Questions'
      case 'test': return 'Practice Test'
      case 'sample_exam': return 'Sample Exam'
      default: return 'AI Content'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            AI Study Assistant
          </h1>
          <p className="text-gray-600">Generate personalized revision questions, tests, and exams</p>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700">
          <Sparkles className="w-3 h-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generation Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generate Study Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedSubject && (
                <div>
                  <Label htmlFor="topic">Topic</Label>
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topicsBySubject[selectedSubject]?.map(topic => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="customTopic">Or enter custom topic</Label>
                <Input
                  id="customTopic"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="e.g., Photosynthesis in plants"
                />
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="questionCount">Number of Questions</Label>
                <Select value={questionCount.toString()} onValueChange={(value) => setQuestionCount(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={generateRevisionQuestions}
                  disabled={!selectedSubject || (!selectedTopic && !customTopic) || loading}
                  className="w-full"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileQuestion className="w-4 h-4 mr-2" />}
                  Generate Revision Questions
                </Button>
                
                <Button 
                  onClick={generateTest}
                  disabled={!selectedSubject || (!selectedTopic && !customTopic) || loading}
                  variant="outline"
                  className="w-full"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ClipboardCheck className="w-4 h-4 mr-2" />}
                  Generate Practice Test
                </Button>
                
                <Button 
                  onClick={generateSampleExam}
                  disabled={!selectedSubject || (!selectedTopic && !customTopic) || loading}
                  variant="outline"
                  className="w-full"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <GraduationCap className="w-4 h-4 mr-2" />}
                  Generate Sample Exam
                </Button>
              </div>

              <Alert>
                <Sparkles className="w-4 h-4" />
                <AlertDescription>
                  AI-generated content is created to help with your studies. Always verify important information with your textbooks and teachers.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Generated Content Display */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="current" className="space-y-4">
            <TabsList>
              <TabsTrigger value="current">Current Generation</TabsTrigger>
              <TabsTrigger value="history">History ({contentHistory.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="current">
              {generatedContent ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {getContentTypeIcon(generatedContent.type)}
                        {getContentTypeLabel(generatedContent.type)}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{generatedContent.subject}</Badge>
                        <Badge variant="outline">{generatedContent.topic}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadContent(generatedContent)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
                        {generatedContent.type === 'revision_questions' && generatedContent.content.questions}
                        {generatedContent.type === 'test' && generatedContent.content.test}
                        {generatedContent.type === 'sample_exam' && generatedContent.content.exam}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No content generated yet</h3>
                    <p className="text-gray-600">Select a subject and topic, then click one of the generation buttons to create AI-powered study materials.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history">
              {contentHistory.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No history yet</h3>
                    <p className="text-gray-600">Your generated study materials will appear here for easy access.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {contentHistory.map(content => (
                    <Card key={content.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getContentTypeIcon(content.type)}
                            <div>
                              <h4 className="font-medium">{getContentTypeLabel(content.type)}</h4>
                              <p className="text-sm text-gray-600">
                                {content.subject} • {content.topic}
                              </p>
                              <p className="text-xs text-gray-500">
                                Generated {new Date(content.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setGeneratedContent(content)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadContent(content)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileQuestion className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revision Questions</p>
                <p className="text-xl font-bold">
                  {contentHistory.filter(c => c.type === 'revision_questions').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <ClipboardCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Practice Tests</p>
                <p className="text-xl font-bold">
                  {contentHistory.filter(c => c.type === 'test').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <GraduationCap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sample Exams</p>
                <p className="text-xl font-bold">
                  {contentHistory.filter(c => c.type === 'sample_exam').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}