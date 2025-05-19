import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';

export default function AtualizarScreen() {
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleAtualizar = async () => {
    setLoading(true);
    setMensagem('');
    try {
      const response = await fetch('http://10.0.2.2:8000');
      if (!response.ok) throw new Error('Erro na resposta da API');
      const data = await response.json();
      setMensagem(data.mensagem || 'Atualização realizada com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível se conectar à API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Atualizar" onPress={handleAtualizar} disabled={loading} />
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
      {mensagem ? <Text style={styles.texto}>{mensagem}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  texto: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
