
import React, { Children, isValidElement } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LogoHeader from './LogoHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GeneralLayout({ children }) {
  // Helper to wrap all string children in <Text>
  const renderChildren = (nodes) =>
    Children.map(nodes, (child) => {
      if (typeof child === 'string') return <Text>{child}</Text>;
      if (Array.isArray(child)) return renderChildren(child);
      return child;
    });
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <LogoHeader />
      <View style={styles.content}>{renderChildren(children)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
