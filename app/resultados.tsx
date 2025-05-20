import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function ResultadosScreen() {
  const { data, title } = useLocalSearchParams();
  let articles: any[] = [];

  try {
    articles = JSON.parse(data as string);
  } catch {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar os resultados.</Text>
      </View>
    );
  }

  const renderArticle = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Resultados: ${title}` }} />

      {!articles.length ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={renderArticle}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});
