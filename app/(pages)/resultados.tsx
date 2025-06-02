import { Stack, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNewsService } from "../api/services";
import { ArticleCard } from "../components/ArcticleCard";
import { Arcticle } from "../types/types";

const PAGE_SIZE = 10;

export default function ResultadosScreen() {
  const { data, title } = useLocalSearchParams();
  const { getNews } = useNewsService();
  const [articles, setArticles] = useState<Arcticle[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchTerm = title || data;

  const fetchArticles = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getNews(
          searchTerm as string,
          reset ? 1 : page,
          PAGE_SIZE
        );
        const newArticles = res.articles || [];
        setHasMore(newArticles.length === PAGE_SIZE);
        setArticles((prev) => (reset ? newArticles : [...prev, ...newArticles]));
      } catch (e: any) {
        setError("Erro ao buscar notícias.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [getNews, searchTerm, page, loading]
  );

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    fetchArticles(true);
  }, [searchTerm]);

  useEffect(() => {
    if (page > 1) fetchArticles();
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setArticles([]);
    setHasMore(true);
    fetchArticles(true);
  };

  const renderArticle = ({ item }: { item: Arcticle }) => (
    <ArticleCard article={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: `Resultados: ${searchTerm}` }} />
      {error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : articles.length === 0 && loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#1E88E5" />
        </View>
      ) : articles.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            Nenhuma notícia encontrada para sua busca.
          </Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={renderArticle}
          contentContainerStyle={styles.listContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListFooterComponent={
            loading && articles.length > 0 ? (
              <View style={{ padding: 16 }}>
                <ActivityIndicator size="small" color="#1E88E5" />
                <Text
                  style={{
                    color: "#888",
                    textAlign: "center",
                    marginTop: 6,
                  }}
                >
                  Carregando mais...
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  errorText: {
    color: "#E53935",
    textAlign: "center",
    fontSize: 16,
    marginTop: 40,
  },
  emptyText: {
    color: "#888",
    textAlign: "center",
    fontSize: 16,
    marginTop: 18,
  },
});
