"use client"

import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

interface NewsStatsProps {
  totalArticles: number
  lastUpdate?: Date
}

export default function NewsStats({ totalArticles, lastUpdate }: NewsStatsProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const formatLastUpdate = () => {
    if (!lastUpdate) return "Nunca"

    const diffInMinutes = Math.floor((currentTime.getTime() - lastUpdate.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Agora há pouco"
    if (diffInMinutes < 60) return `${diffInMinutes}min atrás`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h atrás`

    return lastUpdate.toLocaleDateString("pt-BR")
  }

  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Ionicons name="newspaper-outline" size={16} color="#666" />
        <Text style={styles.statText}>{totalArticles} notícias</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.stat}>
        <Ionicons name="time-outline" size={16} color="#666" />
        <Text style={styles.statText}>Atualizado {formatLastUpdate()}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.stat}>
        <View style={[styles.statusDot, { backgroundColor: "#43A047" }]} />
        <Text style={styles.statText}>Online</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  separator: {
    width: 1,
    height: 12,
    backgroundColor: "#ddd",
    marginHorizontal: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
})
