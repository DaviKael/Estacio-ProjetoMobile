"use client"

import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface QuickAction {
  id: string
  title: string
  icon: string
  color: string
  query: string
}

interface QuickActionsProps {
  onActionPress: (query: string) => void
}

export default function QuickActions({ onActionPress }: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      id: "breaking",
      title: "Breaking News",
      icon: "flash",
      color: "#E53935",
      query: "breaking news brasil",
    },
    {
      id: "bovespa",
      title: "Bovespa",
      icon: "stats-chart",
      color: "#1E88E5",
      query: "bovespa ibovespa",
    },
    {
      id: "dolar",
      title: "Dólar",
      icon: "cash",
      color: "#43A047",
      query: "dólar cotação",
    },
    {
      id: "startups",
      title: "Startups",
      icon: "rocket",
      color: "#8E24AA",
      query: "startups brasil",
    },
  ]

  const renderAction = (action: QuickAction) => (
    <TouchableOpacity
      key={action.id}
      style={[styles.actionButton, { borderColor: action.color }]}
      onPress={() => onActionPress(action.query)}
      activeOpacity={0.8}
    >
      <Ionicons name={action.icon as any} size={24} color={action.color} />
      <Text style={[styles.actionText, { color: action.color }]}>{action.title}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesso Rápido</Text>
      <View style={styles.actionsGrid}>{actions.map(renderAction)}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: "45%",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "#f8f9fa",
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },
})
