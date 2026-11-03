import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Filme, RootStackParamList } from '../types/navigation';
import type { BuscaOMDb } from '../types/omdb';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
const URL = 'https://www.omdbapi.com/?s=spider%20man&apikey=1cd66749';

export default function HomeScreen({ navigation }: Props) {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const resposta = await fetch(URL);
      if (!resposta.ok) throw new Error('Falha de conexão com a API.');
      const dados: BuscaOMDb = await resposta.json();
      if (dados.Response === 'False') throw new Error(dados.Error);
      setFilmes(dados.Search);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível buscar os filmes.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => { void carregar(); }, [carregar]);

  if (carregando) return (
    <View style={styles.centro}>
      <ActivityIndicator size="large" />
      <Text>Carregando filmes...</Text>
    </View>
  );

  if (erro) return (
    <View style={styles.centro}>
      <Text variant="titleMedium">Não foi possível carregar os filmes.</Text>
      <Text style={styles.secundario}>{erro}</Text>
      <Button mode="contained" onPress={() => void carregar()}>Tentar novamente</Button>
    </View>
  );

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.conteudo}
      data={filmes}
      keyExtractor={(item) => item.imdbID}
      ListHeaderComponent={
        <View style={styles.cabecalho}>
          <Text variant="headlineMedium" style={styles.titulo}>Filmes do Homem-Aranha</Text>
          <Text style={styles.secundario}>Explore os filmes encontrados na OMDb API.</Text>
        </View>
      }
      ListEmptyComponent={<Text>Nenhum filme encontrado.</Text>}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          {item.Poster !== 'N/A' ? (
            <Image source={{ uri: item.Poster }} style={styles.poster} resizeMode="contain" />
          ) : (
            <View style={[styles.poster, styles.semPoster]}><Text>Sem pôster</Text></View>
          )}
          <Card.Content style={styles.info}>
            <Text variant="titleLarge">{item.Title}</Text>
            <Text style={styles.secundario}>Ano: {item.Year}</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => navigation.navigate('Details', { filme: item })}>
              Ver detalhes
            </Button>
          </Card.Actions>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: { flex: 1, backgroundColor: '#101116' },
  conteudo: { padding: 16, paddingBottom: 28 },
  cabecalho: { marginBottom: 20, gap: 6 },
  titulo: { fontWeight: 'bold' },
  secundario: { color: '#c5c5ce' },
  card: { marginBottom: 18, overflow: 'hidden' },
  poster: { width: '100%', height: 320, backgroundColor: '#15151c' },
  semPoster: { alignItems: 'center', justifyContent: 'center' },
  info: { paddingTop: 14, gap: 6 },
  centro: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center', gap: 16 },
});
