import { Ionicons } from "@expo/vector-icons"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { categories } from "../utils/categories"
import type { Category } from "../types/types"

interface CategoryTabsProps {
  selectedCategory: string
  onCategorySelect: (category: Category) => void
}

export default function CategoryTabs({ selectedCategory, onCategorySelect }: CategoryTabsProps) {
  const allCategory: Category = {
    id: "all",
    title: "Todas",
    color: "#666",
    icon: "grid-outline",
    query: "",
  }

  const allCategories = [allCategory, ...categories]

  const renderTab = ({ item }: { item: Category }) => {
    const isSelected = selectedCategory === item.id

    return (
      <TouchableOpacity
        style={[styles.tab, isSelected && { backgroundColor: item.color }]}
        onPress={() => onCategorySelect(item)}
        activeOpacity={0.8}
      >
        <Ionicons name={item.icon as any} size={20} color={isSelected ? "#fff" : item.color} />
        <Text style={[styles.tabText, { color: isSelected ? "#fff" : item.color }]}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={allCategories}
        renderItem={renderTab}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tabsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f8f9fa",
    gap: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
})
