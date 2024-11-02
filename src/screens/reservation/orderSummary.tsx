import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  VStack,
  Box,
  HStack,
  Icon,
  Divider,
  Button,
} from 'native-base';
import { bgColorMain } from '../getStarted/started';
import { useAppSelector } from '../../app/hooks';
import {
  
  useLazyCheckPromoCodeQuery,
  useCreateOrderMutation,
  useGetWorkerQuery,
} from '../../data/home/home';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { t } from 'i18next';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Loading from '../../components/Loading/Loading';
import dayjs from 'dayjs';
import TextModifiedInput from '../../inputs/textInput';

const OrderSummary = ({ route, navigation }: any) => {
  const { values, worker } = route.params;
  const { data: workerData, isLoading } = useGetWorkerQuery({ workerId: worker });
  const themeCheck = useAppSelector(state => state.user.theme);
  const [promoCode, setPromoCode] = useState('-');
  const [percentage, setPercentage] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const [applyButtonText, setApplyButtonText] = useState('Apply');
  const [isApplyButtonDisabled, setIsApplyButtonDisabled] = useState(false);
  const user = useAppSelector(state => state.user.userId);
  const [triggerCheckPromoCode, { data: checkPromoCode }] = useLazyCheckPromoCodeQuery();
  const [createOrder] = useCreateOrderMutation();

  const calculateTotal = (timeSlot: string) => {
    if (!timeSlot) return 0;

    const times = timeSlot.split('To').map(Number);

    if (times.length === 2) {
      const [startTime, endTime] = times;
      const duration = endTime - startTime;

      switch (duration) {
        case 2:
          return 20;
        case 4:
          return 40;
        default:
          return 0;
      }
    }

    return 0;
  };

  useEffect(() => {
    let timer: any;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const showError = (error: unknown) => {
    let message = 'An unexpected error occurred';
    if (error && typeof error === 'object' && 'data' in error) {
      const errorData = (error as any).data;
      message = errorData.message || JSON.stringify(errorData);
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    setErrorMessage(message);
    setApplyButtonText('Apply');
    setIsApplyButtonDisabled(false);
  };

  const totalCost = calculateTotal(values.availabilityTime) * (1 - percentage / 100);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    setAmount(totalCost);
  }, [totalCost, applyButtonText]);

  const handleCheckPromoCode = async () => {
    try {
      const response = await triggerCheckPromoCode({ promoCode: promoCode }).unwrap();
      if (response && response.success) {
        setPercentage(response.percentage);
        setApplyButtonText('Applied');
        setIsApplyButtonDisabled(true);
      } else {
        setPromoCode('-');
        setPercentage(0);
        showError('Invalid promo code');
      }
    } catch (error) {
      setPromoCode('-');
      setPercentage(0);
      showError(error);
    }
  };

  const HandleCreateOrder = async () => {
    console.log("promo",values)
    try {
      if (values.availabilityTime == '8To10') {
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: true,
          availability_10_12: false,
          availability_12_14: false,
          availability_14_16: false,
          availability_16_18: false,
          availability_18_20: false,
          availability_20_22: false,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted: false
        }).unwrap();
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");
        }
      } else if (values.availabilityTime == '10To12') {
        console.log("efae")
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: false,
          availability_10_12: true,
          availability_12_14: false,
          availability_14_16: false,
          availability_16_18: false,
          availability_18_20: false,
          availability_20_22: false,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted:false,
        }).unwrap();
        console.log("res",response)
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");

        }else{console.log("failed")}
      } else if (values.availabilityTime == '12To14') {
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: false,
          availability_10_12: false,
          availability_12_14: true,
          availability_14_16: false,
          availability_16_18: false,
          availability_18_20: false,
          availability_20_22: false,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted: false
        }).unwrap();
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");

        }
      } else if (values.availabilityTime == '14To16') {
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: false,
          availability_10_12: false,
          availability_12_14: false,
          availability_14_16: true,
          availability_16_18: false,
          availability_18_20: false,
          availability_20_22: false,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted: false
        }).unwrap();
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");
        }
      } else if (values.availabilityTime == '16To18') {
  
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: false,
          availability_10_12: false,
          availability_12_14: false,
          availability_14_16: false,
          availability_16_18: true,
          availability_18_20: false,
          availability_20_22: false,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted: false
        }).unwrap();
        console.log('asaaaa',response)
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");
        }
      } else if (values.availabilityTime == '18To20') {
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: false,
          availability_10_12: false,
          availability_12_14: false,
          availability_14_16: false,
          availability_16_18: false,
          availability_18_20: true,
          availability_20_22: false,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted: false
        }).unwrap();
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");
        }
      } else if (values.availabilityTime == '20To22') {
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: false,
          availability_10_12: false,
          availability_12_14: false,
          availability_14_16: false,
          availability_16_18: false,
          availability_18_20: false,
          availability_20_22: true,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted: false
        }).unwrap();
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");
        }
      } else if (values.availabilityTime == '8To12') {
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: true,
          availability_10_12: true,
          availability_12_14: false,
          availability_14_16: false,
          availability_16_18: false,
          availability_18_20: false,
          availability_20_22: false,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted: false
        }).unwrap();
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");
        }
      } else if (values.availabilityTime == '12To16') {
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: false,
          availability_10_12: false,
          availability_12_14: true,
          availability_14_16: true,
          availability_16_18: false,
          availability_18_20: false,
          availability_20_22: false,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted: false
        }).unwrap();
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");
        }
      } else if (values.availabilityTime == '16To20') {
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: false,
          availability_10_12: false,
          availability_12_14: false,
          availability_14_16: false,
          availability_16_18: true,
          availability_18_20: true,
          availability_20_22: false,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted: false
        }).unwrap();
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");
        }
      } else if (values.availabilityTime == '10To14') {
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: false,
          availability_10_12: true,
          availability_12_14: true,
          availability_14_16: false,
          availability_16_18: false,
          availability_18_20: false,
          availability_20_22: false,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted: false
        }).unwrap();
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");
        }
      } else if (values.availabilityTime == '14To18') {
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: false,
          availability_10_12: false,
          availability_12_14: false,
          availability_14_16: true,
          availability_16_18: true,
          availability_18_20: false,
          availability_20_22: false,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted: false
        }).unwrap();
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");
        }
      } else {
        const response = await createOrder({
          promoCode: promoCode,
          dateOfService: values.date,
          serviceType: values.service,
          availability_8_10: false,
          availability_10_12: false,
          availability_12_14: false,
          availability_14_16: false,
          availability_16_18: false,
          availability_18_20: true,
          availability_20_22: true,
          worker_id: worker,
          user_id: user,
          amount: amount,
          isCompleted: false
        }).unwrap();
        if (response && response.success) {
          console.log('order Successfully Created');
          navigation.navigate("OrderConfirmation");
        }
      }
    } catch (error:any) {
      console.log("error",error)
      setErrorMessage(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View
      flex={1}
      p="5"
      bgColor={themeCheck === 'bright' ? 'white' : bgColorMain}
    >
      <VStack space={5}>
        <Box
          bg={themeCheck === 'dark' ? 'blueGray.50' : 'blueGray.700'}
          p="4"
          rounded="md"
        >
          <Text
            fontSize="xl"
            bold
            color={themeCheck === 'dark' ? 'coolGray.900' : 'white'}
          >
            {t('order:orderDet')}
          </Text>
          <Divider my="2" />
          <HStack space={2} alignItems="center">
            <IconFontisto
              name="date"
              color={themeCheck === 'dark' ? bgColorMain : 'white'}
            />
            <Text
              color={themeCheck === 'dark' ? 'coolGray.600' : 'coolGray.200'}
            >
              {t('order:date')} {dayjs(values.date).format('YYYY-MM-DD')}
            </Text>
          </HStack>
          <HStack space={2} alignItems="center" mt="2">
            <IconEntypo
              name="time-slot"
              color={themeCheck === 'dark' ? bgColorMain : 'white'}
            />
            <Text
              color={themeCheck === 'dark' ? 'coolGray.600' : 'coolGray.200'}
            >
              {t('order:servtime')} {values.availabilityTime}
            </Text>
          </HStack>
          <HStack space={2} alignItems="center" mt="2">
            <IconMaterialIcons
              name="settings-suggest"
              color={themeCheck === 'dark' ? bgColorMain : 'white'}
            />
            <Text
              color={themeCheck === 'dark' ? 'coolGray.600' : 'coolGray.200'}
            >
              {t('order:service')} {values.service}
            </Text>
          </HStack>
          <HStack space={2} alignItems="center" mt="2">
            <IconMaterialIcons
              name="payment"
              color={themeCheck === 'dark' ? bgColorMain : 'white'}
            />
            <Text
              color={themeCheck === 'dark' ? 'coolGray.600' : 'coolGray.200'}
            >
              {t('order:pay')} {values.paymentMethod}
            </Text>
          </HStack>
          <HStack space={2} alignItems="center" mt="2">
            <IconMaterialIcons
              name="details"
              color={themeCheck === 'dark' ? bgColorMain : 'white'}
            />
            <Text
              color={themeCheck === 'dark' ? 'coolGray.600' : 'coolGray.200'}
            >
              {t('order:probDet')} {values.problemDetails}
            </Text>
          </HStack>
        </Box>

        <Box
          bg={themeCheck === 'dark' ? 'blueGray.50' : 'blueGray.700'}
          p="4"
          rounded="md"
        >
          <Text
            fontSize="xl"
            bold
            color={themeCheck === 'dark' ? 'coolGray.800' : 'white'}
          >
            {t('order:workDet')}
          </Text>
          <Divider my="2" />
          <HStack space={2} alignItems="center">
            <IconAntDesign
              name="user"
              color={themeCheck === 'dark' ? 'coolGray.800' : 'white'}
            />
            <Text
              color={themeCheck === 'dark' ? 'coolGray.600' : 'coolGray.200'}
            >
              {t('name')} {workerData?.firstName} {workerData?.lastName}
            </Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <IconAntDesign
              name="user"
              color={themeCheck === 'dark' ? 'coolGray.800' : 'white'}
            />
            <Text
              color={themeCheck === 'dark' ? 'coolGray.600' : 'coolGray.200'}
            >
              {t('num')} {workerData?.phoneNumber}
            </Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <IconAntDesign
              name="user"
              color={themeCheck === 'dark' ? 'coolGray.800' : 'white'}
            />
            <Text
              color={themeCheck === 'dark' ? 'coolGray.600' : 'coolGray.200'}
            >
              {t('city')} {workerData?.city}
            </Text>
          </HStack>
        </Box>
        <Divider my="2" />
        <HStack space={2} alignItems="center">
          <TextModifiedInput
            width={300}
            placeholder="Promo Code"
            handleChange={value => setPromoCode(value)}
            bgColor={themeCheck === 'dark' ? 'white' : bgColorMain}
          />
          <Button
            width={20}
            bgColor={isApplyButtonDisabled ? 'green.500' : 'red.500'}
            marginBottom={'4'}
            onPress={handleCheckPromoCode}
            disabled={isApplyButtonDisabled}
          >
            {applyButtonText}
          </Button>
        </HStack>
        <Divider my="2" />
        <Box
          bg={themeCheck === 'dark' ? 'blueGray.50' : 'blueGray.700'}
          p="4"
          rounded="md"
        >
          <Text
            fontSize="xl"
            bold
            color={themeCheck === 'dark' ? 'coolGray.900' : 'white'}
          >
            {t('order:Total')}
          </Text>
          <HStack>
            <Text
              color={themeCheck === 'dark' ? 'coolGray.600' : 'coolGray.200'}
            >
              {totalCost} JOD
            </Text>
          </HStack>
        </Box>
        <Button onPress={HandleCreateOrder} bgColor={'blue.400'}>
          Create Order
        </Button>
      </VStack>
    </View>
  );
};

export default OrderSummary;
