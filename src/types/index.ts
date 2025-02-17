export interface User {
    id: string
    name: string
    email: string
    role: 'reader' | 'publisher'
    avatar?: string
  }
  
  export interface Book {
    id: string
    title: string
    author: string
    coverUrl: string
    summary: string
    publishDate: string
    publisher: string
    isbn: string
    categories: string[]
    aiFeatures: {
      hasSummary: boolean
      hasAnalysis: boolean
      hasTranslation: boolean
      hasAudiobook: boolean
    }
  }
  
  export interface AIFeature {
    id: string
    name: string
    description: string
    icon: string
  }