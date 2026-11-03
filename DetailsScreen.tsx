import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import type { DetalhesOMDb } from '../types/omdb';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;
const valor = (v?: string) => v && v !== 'N/A' ? v : 'Não informado';

export default function DetailsScreen({ route, navigation }: Props) {
  const { filme } = route.params;
  const [detalhes, setDetalhes] = useState<DetalhesOMDb | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;
    async function carregar() {
      try {
        const resposta = await fetch(`https://www.omdbapi.com/?i=${encodeURIComponent(filme.imdbID)}&apikey=1cd66749`);
        if (!resposta.ok) throw new Error('Falha de conexão com a API.');
        const dados: DetalhesOMDb = await resposta.json();
        if (dados.Response === 'False') throw new Error(dados.Error || 'Detalhes indisponíveis.');
        if (ativo) setDetalhes(dados);
      } catch (e) {
        if (ativo) setErro(e instanceof Error ? e.message : 'Erro ao buscar detalhes.');
      } finally {
        if (ativo) setCarregando(false);
      }
    }
    void carregar();
    return () => { ativo = false; };
  }, [filme.imdbID]);

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Card style={styles.card}>
        {filme.Poster !== 'N/A' ? (
          <Image source={{ uri: filme.Poster }} style={styles.poster} resizeMode="contain" />
        ) : (
          <View style={[styles.poster, styles.semPoster]}><Text>Sem pôster</Text></View>
        )}
        <Card.Content style={styles.info}>
          <Text variant="headlineSmall" style={styles.titulo}>{filme.Title}</Text>
          <Text>Ano: {filme.Year}</Text>
          {carregando ? (
            <View style={styles.loading}><ActivityIndicator size="large" /><Text>Buscando detalhes...</Text></View>
          ) : erro ? (
            <Text>{erro}</Text>
          ) : detalhes ? (
            <View style={styles.detalhes}>
              <Text><Text style={styles.rotulo}>Gênero: </Text>{valor(detalhes.Genre)}</Text>
              <Text><Text style={styles.rotulo}>Direção: </Text>{valor(detalhes.Director)}</Text>
              <Text><Text style={styles.rotulo}>Elenco: </Text>{valor(detalhes.Actors)}</Text>
              <Text><Text style={styles.rotulo}>Duração: </Text>{valor(detalhes.Runtime)}</Text>
              <Text><Text style={styles.rotulo}>Avaliação IMDb: </Text>{valor(detalhes.imdbRating)}</Text>
              <Text variant="titleMedium" style={styles.rotulo}>Sinopse</Text>
              <Text>{valor(detalhes.Plot)}</Text>
            </View>
          ) : null}
          <Button mode="outlined" style={styles.botao} onPress={() => navigation.goBack()}>Voltar para a lista</Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#101116' },
  conteudo: { padding: 16, paddingBottom: 30 },
  card: { overflow: 'hidden' },
  poster: { width: '100%', height: 360, backgroundColor: '#15151c' },
  semPoster: { alignItems: 'center', justifyContent: 'center' },
  info: { paddingTop: 18, gap: 10 },
  titulo: { fontWeight: 'bold' },
  rotulo: { fontWeight: 'bold' },
  detalhes: { marginTop: 14, gap: 12 },
  loading: { padding: 22, alignItems: 'center', gap: 10 },
  botao: { marginTop: 20, marginBottom: 10 },
});
