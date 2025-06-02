"use client"

import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import type { NewsFilter } from "../types/types"
import { quickFilters, sortOptions } from "../utils/categories"

interface FilterModalProps {
  visible: boolean
  onClose: () => void
  onApply: (filters: NewsFilter) => void
  currentFilters: NewsFilter
}

export default function FilterModal({ visible, onClose, onApply, currentFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<NewsFilter>(currentFilters)

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters: NewsFilter = {}
    setFilters(resetFilters)
    onApply(resetFilters)
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
          <Text style={styles.title}>Filtros</Text>
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.resetText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Período</Text>
            <View style={styles.optionsGrid}>
              {quickFilters.map((filter) => (
                <TouchableOpacity
                  key={filter.value}
                  style={[styles.option, filters.dateRange === filter.value && styles.selectedOption]}
                  onPress={() => setFilters({ ...filters, dateRange: filter.value as any })}
                >
                  <Text style={[styles.optionText, filters.dateRange === filter.value && styles.selectedOptionText]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ordenar por</Text>
            <View style={styles.optionsGrid}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.option, filters.sortBy === option.value && styles.selectedOption]}
                  onPress={() => setFilters({ ...filters, sortBy: option.value as any })}
                >
                  <Text style={[styles.optionText, filters.sortBy === option.value && styles.selectedOptionText]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  resetText: {
    fontSize: 16,
    color: "#1E88E5",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f8f9fa",
  },
  selectedOption: {
    backgroundColor: "#1E88E5",
    borderColor: "#1E88E5",
  },
  optionText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  selectedOptionText: {
    color: "#fff",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  applyButton: {
    backgroundColor: "#1E88E5",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
})
