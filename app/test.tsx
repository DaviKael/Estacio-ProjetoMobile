import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Noticias = {
  title: string;
  description: string;
};

export default function App() {
  const [dados, setDados] = useState<Noticias | null>(null);

  useEffect(() => {
    fetch('http://10.0.2.2:8000/')
      .then(response => response.json())
      .then(json => setDados(json))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  return (
    <View style={styles.container}>
      {dados ? (
        <>
          <Text style={styles.texto}>Titulo: {dados.title}</Text>
          <Text style={styles.texto}>Descricao: {dados.description}</Text>
        </>
      ) : (
        <Text style={styles.texto}>Carregando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    margin: 8,
  },
});
