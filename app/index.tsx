import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';

export default function AtualizarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Categorias</Text>

      <View style={styles.buttonContainer}>
        <Link href="/esportes" asChild>
          <Button title="Esportes" color="#1E88E5" />
        </Link>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/ciencia" asChild>
          <Button title="Ciência" color="#43A047" />
        </Link>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/saude" asChild>
          <Button title="Saúde" color="#E53935" />
        </Link>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/tecnologia" asChild>
          <Button title="Tecnologia" color="#8E24AA" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,

    // Elevation for Android
    elevation: 3,
  },
});
