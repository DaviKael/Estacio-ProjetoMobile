import type { Category } from "../types/types"

export const categories: Category[] = [
  {
    id: "business",
    title: "Negócios",
    color: "#1E88E5",
    icon: "trending-up-outline",
    query: "business",
  },
  {
    id: "technology",
    title: "Tecnologia",
    color: "#8E24AA",
    icon: "hardware-chip-outline",
    query: "tecnologia",
  },
  {
    id: "markets",
    title: "Mercados",
    color: "#43A047",
    icon: "stats-chart-outline",
    query: "mercado financeiro",
  },
  {
    id: "crypto",
    title: "Crypto",
    color: "#FF9800",
    icon: "logo-bitcoin",
    query: "cryptocurrency",
  },
  {
    id: "economy",
    title: "Economia",
    color: "#E53935",
    icon: "cash-outline",
    query: "economia",
  },
  {
    id: "politics",
    title: "Política",
    color: "#795548",
    icon: "library-outline",
    query: "política",
  },
]

export const quickFilters = [
  { label: "Hoje", value: "today" },
  { label: "Esta semana", value: "week" },
  { label: "Este mês", value: "month" },
]

export const sortOptions = [
  { label: "Mais recentes", value: "publishedAt" },
  { label: "Mais relevantes", value: "relevancy" },
  { label: "Mais populares", value: "popularity" },
]
