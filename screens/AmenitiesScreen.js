import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, Dimensions } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchAmenities } from '../apis/amenities';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import theme from '../themes/AppTheme';

const { width } = Dimensions.get('window');

/**
 * Tela de comodidades.
 * Exibe banners no topo e lista as comodidades disponíveis para reserva.
 */
export default function AmenitiesScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['amenities'],
    queryFn: fetchAmenities,
  });

  // Lista de imagens de banner que serão exibidas no topo
  const banners = [
    require('../assets/banner1.png'),
    require('../assets/banner2.png'),
    require('../assets/banner3.png'),
  ];

  const renderBanner = (image, index) => (
    <Image key={index} source={image} style={styles.bannerImage} />
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.bannerContainer}
      >
        {banners.map((img, idx) => renderBanner(img, idx))}
      </ScrollView>
      <Text style={styles.title}>{'Comodidades'}</Text>
      {isLoading ? (
        <Text style={styles.loading}>{'Carregando...'}</Text>
      ) : null}
      {error ? (
        <Text style={styles.error}>{'Erro ao carregar comodidades.'}</Text>
      ) : null }
      {!isLoading && data && (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            // Mapeia o nome do arquivo retornado para o recurso importado
            const images = {
              'pool.png': require('../assets/pool.png'),
              'gym.png': require('../assets/gym.png'),
            };
            return (
              <Card
                title={item.name}
                description={item.description}
                image={images[item.image]}
              >
                <AppButton
                  title="Reservar"
                  onPress={() => alert(`Reserva de ${item.name} solicitada!`)}
                />
              </Card>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingTop: 40,
  },
  bannerContainer: {
    height: 160,
  },
  bannerImage: {
    width: width,
    height: 160,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.colors.primary,
    marginVertical: 16,
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    marginTop: 16,
    color: theme.colors.textSecondary,
  },
  error: {
    textAlign: 'center',
    marginTop: 16,
    color: theme.colors.error,
  },
});