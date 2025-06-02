import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { categories } from '@/app/utils/categories';

export default function IndexScreen() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      Alert.alert('Busca vazia', 'Digite algo para buscar.');
      return;
    }
    setSearching(true);
    Keyboard.dismiss();
    try {
      const res  = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/${trimmed}`);
      const json = await res.json();
      router.push({
        pathname: '/resultados',
        params: {
          data : JSON.stringify(json.articles || []),
          title: trimmed,
        },
      });
    } catch (err) {
      Alert.alert('Erro', 'Falha ao buscar dados.');
    } finally {
      setSearching(false);
    }
  };

  const handleCategoryPress = (route: string) => {
    router.push(route as any);
  };

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={[styles.card, { borderColor: item.color }]}
      onPress={() => handleCategoryPress(item.route)}
      activeOpacity={0.8}
    >
      <Ionicons name={item.icon as any} size={32} color={item.color} style={{ marginBottom: 8 }} />
      <Text style={[styles.cardText, { color: item.color }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NewsAPI</Text>
      <Text style={styles.subtitle}>Atualize-se com as principais manchetes do Brasil e do mundo</Text>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por palavra-chave ou tema..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={searching}>
          <Ionicons name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.route}
        renderItem={renderCategory}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Categorias</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 18,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 28,
    fontWeight: '400',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 24,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#222',
    backgroundColor: 'transparent',
  },
  searchButton: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 8,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 16,
    marginTop: 8,
    textAlign: 'left',
  },
  gridContainer: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    marginBottom: 0,
  },
  cardText: {
    marginTop: 2,
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.2,
  },
});
