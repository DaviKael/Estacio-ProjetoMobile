"use client"

import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

interface SearchHeaderProps {
  onSearch: (query: string) => void
  onFilterPress: () => void
  onFavoritesPress: () => void
  favoritesCount?: number
  placeholder?: string
}

export default function SearchHeader({
  onSearch,
  onFilterPress,
  onFavoritesPress,
  favoritesCount = 0,
  placeholder = "Buscar notícias, empresas, setores...",
}: SearchHeaderProps) {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    onSearch(query.trim())
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>NewsHub</Text>
        <Text style={styles.subtitle}>Para investidores e profissionais</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            placeholderTextColor="#999"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={handleClear}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.favoritesButton} onPress={onFavoritesPress}>
          <Ionicons name="heart" size={20} color="#E53935" />
          {favoritesCount > 0 && (
            <View style={styles.favoriteBadge}>
              <Text style={styles.favoriteBadgeText}>{favoritesCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Ionicons name="options-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#222",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  filterButton: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  favoritesButton: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  favoriteBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#1E88E5",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 16,
    alignItems: "center",
  },
  favoriteBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
})
