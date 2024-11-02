import React from 'react';
import { View, Text, Button, VStack, Icon } from 'native-base';
import { CommonActions, useNavigation } from '@react-navigation/native';

const OrderConfirmation = () => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };
  return (
    <View flex={1} justifyContent="center" alignItems="center" bg="white" p={4}>
      <VStack space={4} alignItems="center">
        <Text fontSize="2xl" fontWeight="bold" color="green.500">
          Order Created Successfully!
        </Text>
        <Text fontSize="md" color="gray.500" textAlign="center">
          Thank you for your order. We have successfully received your request and will process it shortly.
        </Text>
        <Button
          mt={4}
          size="lg"
          bg="blue.500"
          _text={{ color: 'white', fontWeight: 'bold' }}
          onPress={handleGoHome}
        >
          Go to Home
        </Button>
      </VStack>
    </View>
  );
};

export default OrderConfirmation;
