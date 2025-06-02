import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNewsService } from "../api/services";
import { ArticleCard } from "../components/ArcticleCard";
import { Arcticle } from "../types/types";

interface CategoryNewsScreenProps {
  category: string;
  title: string;
}

export function CategoryNewsScreen({ category, title }: CategoryNewsScreenProps) {
  const [articles, setArticles] = useState<Arcticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const { getNews } = useNewsService();

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getNews(category);
      setArticles(res.articles);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [category]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchArticles();
    setRefreshing(false);
  };

  const renderArticle = ({ item }: { item: Arcticle }) => (
    <ArticleCard article={item} />
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title }} />
      {loading && <ActivityIndicator size="large" color="#1E88E5" style={{ marginTop: 30 }} />}
      {error && <Text style={styles.errorText}>Erro: {error.message}</Text>}
      {!loading && !error && (
        <FlatList
          data={articles}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={renderArticle}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma notícia encontrada.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F7FA",
  },
  listContent: {
    paddingBottom: 16,
  },
  errorText: {
    color: "#E53935",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  emptyText: {
    color: "#888",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
