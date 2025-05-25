// src/components/Payment.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Payment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>Заглушка: экран оплаты</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#555',
  },
});

export default Payment;
