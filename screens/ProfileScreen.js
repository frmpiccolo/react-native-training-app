import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useGlobalValues } from '../context/GlobalVariableContext';
import AppButton from '../components/AppButton';
import theme from '../themes/AppTheme';
import GeneralLayout from '../components/GeneralLayout';

/**
 * Tela de perfil do usuário.
 * Permite visualizar informações básicas e atualizar a foto de perfil usando o Expo Image Picker.
 */
export default function ProfileScreen() {
  const { userName, selectedCondoId } = useGlobalValues();
  const [imageUri, setImageUri] = React.useState(null);

  // Solicita permissão e abre a galeria para selecionar uma foto
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à sua biblioteca de fotos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (    
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <View style={styles.avatarContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholderAvatar]}>
            <Text style={styles.placeholderAvatarText}>{'Foto'}</Text>
          </View>
        )}
      </View>
      <AppButton title="Atualizar foto" onPress={pickImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Nome: {userName || 'Não disponível'}</Text>
        <Text style={styles.infoLabel}>ID do Condomínio: {selectedCondoId || 'N/A'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderAvatar: {
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderAvatarText: {
    color: theme.colors.primary,
    fontSize: 18,
  },
  infoContainer: {
    marginTop: 24,
  },
  infoLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
});