import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Category = {
  title: string;
  color: string;
  route: string;
};

const categories: Category[] = [
  { title: 'ESPORTES',   color: '#1E88E5', route: '/esportes'   },
  { title: 'CIÊNCIA',    color: '#43A047', route: '/ciencia'    },
  { title: 'SAÚDE',      color: '#E53935', route: '/saude'      },
  { title: 'TECNOLOGIA', color: '#8E24AA', route: '/tecnologia' },
];

export default function IndexScreen() {
  const [query, setQuery] = useState('');
  const router            = useRouter();

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      Alert.alert('Erro', 'Digite algo para buscar.');
      return;
    }

    try {
      const res  = await fetch(`http://10.0.2.2:8000/${trimmed}`);
      const json = await res.json();

      router.push({
        pathname: '/resultados',
        params: {
          data : JSON.stringify(json.articles || []),
          termo: trimmed,
        },
      });
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao buscar dados.');
    }
  };

  const handleCategoryPress = (route: string) => {
    router.push(route as any);
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[styles.card, { borderColor: item.color }]}
      onPress={() => handleCategoryPress(item.route)}
      activeOpacity={0.7}
    >
      <Ionicons name="newspaper-outline" size={34} color={item.color} />
      <Text style={[styles.cardText, { color: item.color }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>NewsAPI</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar categoria ou palavra-chave..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>BUSCAR</Text>
      </TouchableOpacity>

      {/* Espaçamento entre o botão BUSCAR e o grid de categorias.
         Ajuste o height conforme desejar. */}
      <View style={{ height: 30 }} />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.route}
        renderItem={renderCategory}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    backgroundColor: '#F5F7FA',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  /* ---------- GRID DAS CATEGORIAS ---------- */
  gridContainer: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  cardText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
