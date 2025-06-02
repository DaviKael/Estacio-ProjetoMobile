"use client"

import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native"
import { useNewsService } from "./api/services"
import CategoryTabs from "./components/CategoryTabs"
import FilterModal from "./components/FilterModal"
import NewsCard from "./components/NewsCard"
import SearchHeader from "./components/SearchHeader"
import type { Article, Category, NewsFilter } from "./types/types"
import FavoritesSheet from "./components/FavoritesSheet"
import NewsStats from "./components/NewsStats"
import QuickActions from "./components/QuickActions"
import TrendingTopics from "./components/TrendingTopics"

export default function IndexScreen() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<NewsFilter>({})
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [showFavorites, setShowFavorites] = useState(false)
  const [favoriteArticles, setFavoriteArticles] = useState<Article[]>([])
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const { getNews } = useNewsService()

  const fetchNews = useCallback(
    async (reset = false) => {
      if (loading && !reset) return

      setLoading(true)
      try {
        const query = searchQuery || (selectedCategory === "all" ? "brasil" : selectedCategory)
        const currentPage = reset ? 1 : page

        const response = await getNews(query, currentPage, 20)
        const newArticles = response.articles || []

        if (reset) {
          setArticles(newArticles)
          setPage(2)
        } else {
          setArticles((prev) => [...prev, ...newArticles])
          setPage((prev) => prev + 1)
        }

        setHasMore(newArticles.length === 20)
        setLastUpdate(new Date())
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    [getNews, searchQuery, selectedCategory, page, loading],
  )

  useEffect(() => {
    setPage(1)
    setHasMore(true)
    fetchNews(true)
  }, [selectedCategory, searchQuery])

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category.id)
    setSearchQuery("")
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelectedCategory("all")
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setPage(1)
    setHasMore(true)
    fetchNews(true)
  }

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchNews(false)
    }
  }

  const handleFavorite = (article: Article) => {
    const articleId = article.url
    const newFavorites = new Set(favorites)
    let newFavoriteArticles = [...favoriteArticles]

    if (favorites.has(articleId)) {
      newFavorites.delete(articleId)
      newFavoriteArticles = favoriteArticles.filter((fav) => fav.url !== articleId)
    } else {
      newFavorites.add(articleId)
      newFavoriteArticles.push(article)
    }

    setFavorites(newFavorites)
    setFavoriteArticles(newFavoriteArticles)
  }

  const renderArticle = ({ item }: { item: Article }) => (
    <NewsCard article={item} onFavorite={handleFavorite} isFavorite={favorites.has(item.url)} />
  )

  const handleQuickAction = (query: string) => {
    setSearchQuery(query)
    setSelectedCategory("all")
  }

  const renderHeader = () => (
    <>
      <SearchHeader
        onSearch={handleSearch}
        onFilterPress={() => setShowFilters(true)}
        onFavoritesPress={() => setShowFavorites(true)}
        favoritesCount={favoriteArticles.length}
      />
      <NewsStats totalArticles={articles.length} lastUpdate={lastUpdate} />
      <CategoryTabs selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
      <TrendingTopics onTopicPress={handleQuickAction} />
      <QuickActions onActionPress={handleQuickAction} />
    </>
  )

  const renderFooter = () => {
    if (!loading || articles.length === 0) return null

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#1E88E5" />
        <Text style={styles.footerText}>Carregando mais notícias...</Text>
      </View>
    )
  }

  const renderEmpty = () => {
    if (loading) return null

    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          {searchQuery ? `Nenhuma notícia encontrada para "${searchQuery}"` : "Nenhuma notícia disponível no momento"}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["#1E88E5"]} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={articles.length === 0 ? styles.emptyContainer : undefined}
      />

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={setFilters}
        currentFilters={filters}
      />

      {loading && articles.length === 0 && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1E88E5" />
          <Text style={styles.loadingText}>Carregando notícias...</Text>
        </View>
      )}

      <FavoritesSheet
        visible={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favoriteArticles}
        onRemoveFavorite={handleFavorite}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  emptyContainer: {
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(248, 249, 250, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
})
