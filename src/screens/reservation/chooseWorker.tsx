import {Text, View, Button, ScrollView} from 'native-base';
import {bgColorMain, salle7liLogo, wroker} from '../getStarted/started';
import {useGetWorkersByTimeQuery, useGetWorkersQuery} from '../../data/home/home';
import Loading from '../../components/Loading/Loading';
import dayjs from 'dayjs';
import CardComp from '../../components/card';
import {useState} from 'react';
import {useAppSelector} from '../../app/hooks';

const ChooseWorker = ({navigation, route}: any) => {
  const themeCheck = useAppSelector(state => state.user.theme);
  const {values} = route.params;
  const [selectedWorker, setSelectedWorker] = useState(null);

  function formatDateWithSpecificDate(dateString, specificDate) {
    const time = dayjs(dateString);
    const specificDateTime = dayjs(specificDate)
      .hour(time.hour())
      .minute(time.minute())
      .second(time.second())
      .millisecond(time.millisecond());
    return specificDateTime.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  const specificStartDate = formatDateWithSpecificDate(
    values.startTime,
    '2024-05-13',
  );
  const specificEndDate = formatDateWithSpecificDate(
    values.endTime,
    '2024-05-13',
  );

  const {data, isLoading, error} = useGetWorkersQuery();
  console.log('Route values:', data);

  if (isLoading) return <Loading />;
  if (error) return <Text>Error loading workers.</Text>;

  const handleSelectWorker = id => {
    console.log('Selected worker ID:', id);
    setSelectedWorker(id);
  };

  return (
    <View flex={1} bgColor={bgColorMain}>
      <View bgColor={themeCheck ? bgColorMain : 'white'}>
        
        <Text color={!themeCheck ? bgColorMain : 'white'} fontWeight={'bold'} marginBottom={'1'} alignSelf={'center'} marginTop={'2'}>
          Choose Your Worker
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} marginTop={'5'}>
        {data &&
          data.map((worker, index) => (
            <Button
              key={worker.workerId}
              bgColor={
                selectedWorker === worker.workerId
                  ? 'red.500'
                  : !themeCheck
                  ? bgColorMain
                  : 'white'
              }
              onPress={() => handleSelectWorker(worker.workerId)}>
              <CardComp
                text={worker.firstName}
                imageSrc={wroker[index % wroker.length]}
                rating={worker.rating}
              />
            </Button>
          ))}
      </ScrollView>
      {selectedWorker && (
        <Button
          onPress={() =>{navigation.navigate('orderSummary', {values: values,worker:selectedWorker})}}
          alignSelf="center"
          marginTop="5"
          marginBottom={'5'}
          bgColor="red.500">
          Next
        </Button>
      )}
    </View>
  );
};

export default ChooseWorker;
