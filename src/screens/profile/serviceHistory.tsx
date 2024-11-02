import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Pressable, View } from 'native-base';
import { useGetOrderHistoryQuery, useGetWorkerQuery } from '../../data/home/home';
import { useAppSelector } from '../../app/hooks';
import AlertDialogComponent from '../../components/alertDialog';
import Loading from '../../components/Loading/Loading';
import { bgColorMain } from '../getStarted/started';

const ServiceHistory = () => {
    const userId = useAppSelector(state => state.user.userId);
    const themeCheck = useAppSelector(state => state.user.theme);
    const { data: orderHistory, isLoading, isError, error } = useGetOrderHistoryQuery({ userId });

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAlertDialogVisible, setIsAlertDialogVisible] = useState(false);

    const { data: workerData, isFetching: isFetchingWorker } = useGetWorkerQuery({ workerId: selectedOrder?.worker_id }, { skip: !selectedOrder });

    const handleCardClick = (order) => {
        setSelectedOrder(order);
        setIsAlertDialogVisible(true);
    };

    const closeAlertDialog = () => {
        setIsAlertDialogVisible(false);
    };

    if (isLoading) return <Loading />;
    if (isError) {
        console.error('Failed to fetch order history:', error);
        return <Text>Error loading order history: {JSON.stringify(error)}</Text>;
    }

    const getBodyTitle = () => {
        if (!selectedOrder || !workerData) return '';
        return `Service Date: ${new Date(selectedOrder.dateOfService).toLocaleDateString()}
                \nWorker: ${workerData.firstName} ${workerData.lastName}`;
    };

    return (
        <View flex={1} bgColor={themeCheck === 'dark' ? bgColorMain : 'white'}>
            <VStack space={4} mt={4} px={4}>
                {orderHistory && orderHistory.$values && orderHistory.$values.map((order) => (
                    <Pressable key={order.id} onPress={() => handleCardClick(order)}>
                        <Box
                            bg="coolGray.100"
                            p="4"
                            rounded="md"
                            shadow={2}
                            marginBottom="2"
                        >
                            <Text bold fontSize="md" color={"red.400"}>{order.serviceType}</Text>
                            <Text>{new Date(order.dateOfService).toLocaleDateString()}</Text>
                        </Box>
                    </Pressable>
                ))}
                {selectedOrder && (
                    <AlertDialogComponent
                        isAlertDialogVisible={isAlertDialogVisible}
                        closeAlertDialog={closeAlertDialog}
                        title={selectedOrder.serviceType}
                        bodyTitle={getBodyTitle()}
                    />
                )}
            </VStack>
        </View>
    );
};

export default ServiceHistory;
