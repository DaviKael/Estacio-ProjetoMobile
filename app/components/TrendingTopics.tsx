"use client"

import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface TrendingTopic {
  id: string
  title: string
  count: number
  trend: "up" | "down" | "stable"
  category: string
}

interface TrendingTopicsProps {
  onTopicPress: (topic: string) => void
}

export default function TrendingTopics({ onTopicPress }: TrendingTopicsProps) {
  const [topics, setTopics] = useState<TrendingTopic[]>([])

  useEffect(() => {
    // Simulando dados de trending topics
    // Em produção, isso viria de uma API de análise de tendências
    const mockTopics: TrendingTopic[] = [
      { id: "1", title: "Bitcoin", count: 245, trend: "up", category: "crypto" },
      { id: "2", title: "Petrobras", count: 189, trend: "down", category: "energy" },
      { id: "3", title: "Vale", count: 156, trend: "up", category: "mining" },
      { id: "4", title: "Nubank", count: 134, trend: "stable", category: "fintech" },
      { id: "5", title: "Magazine Luiza", count: 98, trend: "up", category: "retail" },
    ]
    setTopics(mockTopics)
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "trending-up"
      case "down":
        return "trending-down"
      default:
        return "remove"
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "#43A047"
      case "down":
        return "#E53935"
      default:
        return "#666"
    }
  }

  const renderTopic = ({ item }: { item: TrendingTopic }) => (
    <TouchableOpacity style={styles.topicCard} onPress={() => onTopicPress(item.title)} activeOpacity={0.8}>
      <View style={styles.topicHeader}>
        <Text style={styles.topicTitle}>{item.title}</Text>
        <View style={styles.trendContainer}>
          <Ionicons name={getTrendIcon(item.trend) as any} size={16} color={getTrendColor(item.trend)} />
          <Text style={[styles.trendCount, { color: getTrendColor(item.trend) }]}>{item.count}</Text>
        </View>
      </View>
      <Text style={styles.topicCategory}>{item.category}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trending Agora</Text>
        <Ionicons name="flame" size={20} color="#FF6B35" />
      </View>
      <FlatList
        data={topics}
        renderItem={renderTopic}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  topicCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    minWidth: 120,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  topicHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    flex: 1,
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  trendCount: {
    fontSize: 12,
    fontWeight: "600",
  },
  topicCategory: {
    fontSize: 11,
    color: "#666",
    textTransform: "uppercase",
    fontWeight: "500",
  },
})
