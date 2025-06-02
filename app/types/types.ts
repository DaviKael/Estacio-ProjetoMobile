export interface Article {
  id?: string
  source?: {
    id: string
    name: string
    banana: string
  }
  author?: string
  title: string
  description?: string
  url: string
  urlToImage?: string
  publishedAt: string
  content?: string
  category?: string
}

export interface NewsResponse {
  status: string
  totalResults: number
  articles: Article[]
}

export interface Category {
  id: string
  title: string
  color: string
  icon: string
  query: string
}

export interface UserPreferences {
  favoriteCategories: string[]
  watchlist: string[]
  notifications: boolean
  darkMode: boolean
}

export interface NewsFilter {
  category?: string
  dateRange?: "today" | "week" | "month"
  sortBy?: "publishedAt" | "relevancy" | "popularity"
  sources?: string[]
}
