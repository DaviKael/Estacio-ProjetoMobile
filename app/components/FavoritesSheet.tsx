"use client"

import { Ionicons } from "@expo/vector-icons"
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { Article } from "../types/types"
import NewsCard from "./NewsCard"

interface FavoritesSheetProps {
  visible: boolean
  onClose: () => void
  favorites: Article[]
  onRemoveFavorite: (article: Article) => void
}

export default function FavoritesSheet({ visible, onClose, favorites, onRemoveFavorite }: FavoritesSheetProps) {
  const renderFavorite = ({ item }: { item: Article }) => (
    <NewsCard article={item} onFavorite={onRemoveFavorite} isFavorite={true} />
  )

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Ionicons name="heart-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
      <Text style={styles.emptyText}>Toque no coração das notícias para salvá-las aqui</Text>
    </View>
  )

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
          <Text style={styles.title}>Favoritos</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{favorites.length}</Text>
          </View>
        </View>

        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={favorites.length === 0 ? styles.emptyContainer : styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  badge: {
    backgroundColor: "#1E88E5",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  listContainer: {
    paddingTop: 16,
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
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    lineHeight: 24,
  },
})
