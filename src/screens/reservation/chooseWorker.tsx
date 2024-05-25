import {Text, View, Button, ScrollView} from 'native-base';
import {bgColorMain, salle7liLogo, wroker} from '../getStarted/started';
import Loading from '../../components/Loading/Loading';
import dayjs from 'dayjs';
import CardComp from '../../components/card';
import {useState} from 'react';
import {useAppSelector} from '../../app/hooks';
import {
  useGetWorkers10To12Query,
  useGetWorkers10To14Query,
  useGetWorkers12To14Query,
  useGetWorkers12To16Query,
  useGetWorkers14To16Query,
  useGetWorkers14To18Query,
  useGetWorkers16To18Query,
  useGetWorkers18To22Query,
  useGetWorkers20To22Query,
  useGetWorkers8To10Query,
  useGetWorkers8To12Query,
} from './workerTime';

const ChooseWorker = ({navigation, route}: any) => {
  const themeCheck = useAppSelector(state => state.user.theme);
  const {values} = route.params;
  let data, isLoading, error;
  console.log('values', values);
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

  if (values.availabilityTime == '10To12') {
    ({data, isLoading, error} = useGetWorkers10To12Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
      
    }));
  } else if (values.availabilityTime == '12To14') {
    ({data, isLoading, error} = useGetWorkers12To14Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
      
    }));
  } else if (values.availabilityTime == '14To16') {
    ({data, isLoading, error} = useGetWorkers14To16Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
    }));
  } else if (values.availabilityTime == '16To18') {
    ({data, isLoading, error} = useGetWorkers16To18Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
    }));
  } else if (values.availabilityTime == '20To22') {
    ({data, isLoading, error} = useGetWorkers20To22Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
    }));
  } else if (values.availabilityTime == '8To12') {
    ({data, isLoading, error} = useGetWorkers8To12Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
    }));
  } else if (values.availabilityTime == '12To16') {
    ({data, isLoading, error} = useGetWorkers12To16Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
    }));
  } else if (values.availabilityTime == '16To18') {
    ({data, isLoading, error} = useGetWorkers16To18Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
    }));
  } else if (values.availabilityTime == '18To22') {
    ({data, isLoading, error} = useGetWorkers18To22Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
    }));
  } else if (values.availabilityTime == '10To14') {
    ({data, isLoading, error} = useGetWorkers10To14Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
    }));
  } else if (values.availabilityTime == '14To18') {
    ({data, isLoading, error} = useGetWorkers14To18Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
    }));
  } else if (values.availabilityTime == '18To22') {
    ({data, isLoading, error} = useGetWorkers18To22Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
    }));
  } else {
    ({data, isLoading, error} = useGetWorkers8To10Query({
      date: dayjs(values.date).format('YYYY-MM-DD'),
      gender: values.workerGender,
      serviceName:values.service
    }));
  }
  console.log('data', data);

  if (isLoading) return <Loading />;
  if (error) return <Text>Error loading workers.</Text>;

  const handleSelectWorker = id => {
    console.log('Selected worker ID:', id);
    setSelectedWorker(id);
  };

  return (
    <View flex={1} bgColor={bgColorMain}>
      <View bgColor={themeCheck == 'dark' ? bgColorMain : 'white'}>
        <Text
          color={themeCheck == 'bright' ? bgColorMain : 'white'}
          fontWeight={'bold'}
          marginBottom={'1'}
          alignSelf={'center'}
          marginTop={'2'}>
          Choose Your Worker
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} marginTop={'5'}>
        {data &&
          data.$values &&
          data.$values.map((worker: any, index) => (
            <Button
              key={worker.workerId}
              bgColor={
                selectedWorker === worker.workerId
                  ? 'red.500'
                  : themeCheck == 'dark'
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
          onPress={() => {
            navigation.navigate('orderSummary', {
              values: values,
              worker: selectedWorker,
            });
          }}
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
