import React, {useState} from 'react';
import TextModifiedInput from '../../inputs/textInput';
import PhoneInput from '../../inputs/phoneInput';
import {
  Button,
  CheckIcon,
  Image,
  Radio,
  ScrollView,
  Select,
  Stack,
  Text,
  View,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../app/hooks';
import {bgColorMain, salle7liLogo} from '../getStarted/started';
import {useUpdateProfileMutation} from '../../data/profile/profile';
import Loading from '../../components/Loading/Loading';
import {IGetEditUser} from '../../data/profile';

const UpdateInformation = ({route, navigation:{goBack}}: any) => {
  const {userData} = route.params;
  const [formData, setFormData] = useState(userData);
  const {t} = useTranslation();
  const [updateInfo] = useUpdateProfileMutation();
  const user = useAppSelector(state => state.user.userId);

  const handleSubmit = async () => {
    try {
      const response = await updateInfo({...formData, id: user}).unwrap();
      if (response.success && response) {
        goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const themeCheck = useAppSelector(state => state.user.theme);

  return (
    <View
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      bgColor={!themeCheck ? bgColorMain : 'white'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text color={'red.500'}>3abbi hon</Text>
        <TextModifiedInput
          value={formData.firstName}
          width={320}
          handleChange={text =>
            setFormData((prevFormData: IGetEditUser) => ({
              ...prevFormData,
              firstName: text,
            }))
          }
        />
        <Text color={'red.500'}>3abbi hon</Text>
        <TextModifiedInput
          value={formData.lastName}
          width={320}
          handleChange={text =>
            setFormData((prevFormData: IGetEditUser) => ({
              ...prevFormData,
              lastName: text,
            }))
          }
        />
        <Text color={'red.500'}>3abbi hon</Text>
        <TextModifiedInput
          value={formData.email}
          width={320}
          handleChange={text =>
            setFormData((prevFormData: IGetEditUser) => ({
              ...prevFormData,
              email: text,
            }))
          }
        />

        <Text color={'red.500'}>3abbi hon</Text>
        <View style={{marginBottom: 30}}>
          <Select
            minWidth="330"
            bgColor={'white'}
            borderRadius={'lg'}
            accessibilityLabel="Choose a city"
            placeholder="Choose a city"
            padding={'4'}
            onValueChange={text =>
              setFormData((prevFormData: IGetEditUser) => ({
                ...prevFormData,
                city: text,
              }))
            }
            selectedValue={formData.city}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size={5} />,
            }}>
            <Select.Item label={t('signup:amman')} value="amman" />
            <Select.Item label={t('signup:zarqa')} value="zarqa" />
            <Select.Item label={t('signup:irbid')} value="irbid" />
            <Select.Item label={t('signup:salt')} value="salt" />
            <Select.Item label={t('signup:madaba')} value="madaba" />
            <Select.Item label={t('signup:aqaba')} value="aqaba" />
            <Select.Item label={t('signup:karak')} value="karak" />
            <Select.Item label={t('signup:maan')} value="maan" />
            <Select.Item label={t('signup:jerash')} value="jerash" />
            <Select.Item label={t('signup:tafeleh')} value="tafeleh" />
            <Select.Item label={t('signup:mafraq')} value="mafraq" />
          </Select>
        </View>

        <View>
          <Text style={{color: !themeCheck ? 'white' : bgColorMain}}>
            {' '}
            3abbi hoon
          </Text>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            defaultValue="any"
            value={formData.gender}
            onChange={text =>
              setFormData((prevFormData: IGetEditUser) => ({
                ...prevFormData,
                gender: text,
              }))
            }>
            <Stack direction="row" alignSelf={'center'} space={4}>
              <Radio value="male" colorScheme={'darkBlue'} my={1}>
                <Text style={{color: !themeCheck ? 'white' : bgColorMain}}>
                  {' '}
                  {t('male')}{' '}
                </Text>
              </Radio>
              <Radio value="female" colorScheme={'pink'} my={1}>
                <Text style={{color: !themeCheck ? 'white' : bgColorMain}}>
                  {' '}
                  {t('female')}
                </Text>
              </Radio>
            </Stack>
          </Radio.Group>
        </View>

        <Button onPress={handleSubmit} marginTop={'7'} bgColor={'red.500'}>
          <Text>3abbi hon</Text>
        </Button>
        <Image
          source={salle7liLogo}
          alignSelf={'center'}
          marginTop={'1/5'}
          alt=""
          width={78}
          height={40}
        />
      </ScrollView>
    </View>
  );
};

export default UpdateInformation;
