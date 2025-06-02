"use client"

import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Alert, Image, Linking, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { Article } from "../types/types"

interface NewsCardProps {
  article: Article
  onFavorite?: (article: Article) => void
  isFavorite?: boolean
  showCategory?: boolean
}

export default function NewsCard({ article, onFavorite, isFavorite = false, showCategory = true }: NewsCardProps) {
  const [imageError, setImageError] = useState(false)

  const handlePress = () => {
    if (article.url) {
      Linking.openURL(article.url)
    }
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.url}`,
        title: article.title,
      })
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar a notícia")
    }
  }

  const handleFavorite = () => {
    onFavorite?.(article)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Agora há pouco"
    if (diffInHours < 24) return `${diffInHours}h atrás`
    if (diffInHours < 48) return "Ontem"
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    })
  }

  const getSourceColor = () => {
    const colors = ["#1E88E5", "#43A047", "#E53935", "#8E24AA", "#FF9800"]
    const hash = article.source?.name?.charCodeAt(0) || 0
    return colors[hash % colors.length]
  }

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={handlePress}>
      <View style={styles.header}>
        {article.source?.name && (
          <View style={[styles.sourceBadge, { backgroundColor: getSourceColor() }]}>
            <Text style={styles.sourceText}>{article.source.name}</Text>
          </View>
        )}
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleFavorite} style={styles.actionButton}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={20} color={isFavorite ? "#E53935" : "#666"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Ionicons name="share-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {article.urlToImage && !imageError ? (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.image}
            onError={() => setImageError(true)}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={32} color="#ccc" />
          </View>
        )}

        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={3}>
            {article.title}
          </Text>

          {article.description && (
            <Text style={styles.description} numberOfLines={2}>
              {article.description}
            </Text>
          )}

          <View style={styles.footer}>
            <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
            {article.author && (
              <Text style={styles.author} numberOfLines={1}>
                {article.author}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingBottom: 8,
  },
  sourceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flex: 1,
  },
  sourceText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  content: {
    flexDirection: "row",
    padding: 12,
    paddingTop: 0,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    lineHeight: 22,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  date: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  author: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    flex: 1,
    textAlign: "right",
    marginLeft: 8,
  },
})
