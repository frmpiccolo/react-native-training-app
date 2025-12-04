import React, { Children } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import theme from '../themes/AppTheme';

/**
 * Componente de cartão genérico para exibir informações.
 * Pode receber título, descrição, imagem opcional e componentes filhos.
 */
export default function Card({ title, description, image, children, style }) {
  // Helper to wrap all string children in <Text>
  const renderChildren = (nodes) =>
    Children.map(nodes, (child) => {
      if (typeof child === 'string') return <Text>{child}</Text>;
      if (Array.isArray(child)) return renderChildren(child);
      return child;
    });
  return (
    <View style={[styles.card, style]}>
      {image ? (
        <Image source={image} style={styles.image} resizeMode="cover" />
      ) : null}
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {renderChildren(children)}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
});