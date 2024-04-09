import {
  Button,
  CircleIcon,
  CloseIcon,
  FavouriteIcon,
  HStack,
  Image,
  InfoIcon,
  MinusIcon,
  PlayIcon,
  QuestionIcon,
  ScrollView,
  Stack,
  Text,
  ThreeDotsIcon,
  View,
} from 'native-base';
import {bgColorMain, profilePicture, salle7liLogo} from '../getStarted/started';

const Profile = () => {
  return (
    <View
      bgColor={bgColorMain}
      flex={1}
      flexDirection={'column'}
      justifyContent={'space-evenly'}>
        <ScrollView showsHorizontalScrollIndicator={false}>
      <View alignItems={'center'} width={'full'} justifyContent={'center'}>
        
        <Text color={'white'} fontWeight={'bold'} fontSize={'3xl'}>
          Profile
        </Text>
        <View
          bgColor={'white'}
          paddingTop={'5'}
          paddingBottom={'5'}
          width={'full'}
          justifyContent={'space-evenly'}
          flexDirection={'row'}>
          <View
            width={'100'}
            height={'100'}
            borderRadius={'50'}
            overflow={'hidden'}
            borderWidth={2}
            borderColor={'black'}>
            <Image
              source={profilePicture}
              width={'100%'}
              height={'100%'}
              resizeMode={'cover'}
            />
          </View>
          <View justifyContent={'space-evenly'}>
            <Text>Ali Aburumman</Text>
            <View flexDirection={'row'}>
              <View marginRight={'0.5'}>
                <FavouriteIcon />
              </View>
              <View marginRight={'0.5'}>
                <FavouriteIcon />
              </View>
              <View marginRight={'0.5'}>
                <FavouriteIcon />
              </View>
              <View marginRight={'0.5'}>
                <FavouriteIcon />
              </View>
            </View>
          </View>
        </View>

        <Stack space={7} width={'5/6'} marginTop={'10'}>
          <Button borderRadius={'3xl'} bgColor={'white'}>
            <View flexDirection={'row'} justifyContent={'space-between'}>
              <View width={'5/6'} >
                <Text color={'darkBlue.700'} alignSelf={'center'} paddingLeft={'10'}>Personal Information</Text>
              </View>
              <View justifyContent={'center'} alignItems={'flex-end'}  width={'1/6'}>
                <CircleIcon />
              </View>
            </View>
          </Button>
          <Button borderRadius={'3xl'} bgColor={'white'}>
            <View flexDirection={'row'} justifyContent={'space-between'}>
              <View width={'5/6'} >
                <Text color={'darkBlue.700'} alignSelf={'center'} paddingLeft={'10'}>Settings</Text>
              </View>
              <View justifyContent={'center'} alignItems={'flex-end'}  width={'1/6'}>
                <ThreeDotsIcon/>
              </View>
            </View>
          </Button>
          <Button borderRadius={'3xl'} bgColor={'white'}>
            <View flexDirection={'row'} justifyContent={'space-between'}>
              <View width={'5/6'} >
                <Text color={'darkBlue.700'} alignSelf={'center'} paddingLeft={'10'}>Change password</Text>
              </View>
              <View justifyContent={'center'} alignItems={'flex-end'}  width={'1/6'}>
                <MinusIcon/>
              </View>
            </View>
          </Button>
          <Button borderRadius={'3xl'} bgColor={'white'}>
            <View flexDirection={'row'} justifyContent={'space-between'}>
              <View width={'5/6'} >
                <Text color={'darkBlue.700'} alignSelf={'center'} paddingLeft={'10'}>Service History</Text>
              </View>
              <View justifyContent={'center'} alignItems={'flex-end'}  width={'1/6'}>
                <InfoIcon/>
              </View>
            </View>
          </Button>
          <Button borderRadius={'3xl'} bgColor={'white'}>
            <View flexDirection={'row'} justifyContent={'space-between'}>
              <View width={'5/6'} >
                <Text color={'darkBlue.700'} alignSelf={'center'} paddingLeft={'10'}>Help</Text>
              </View>
              <View justifyContent={'center'} alignItems={'flex-end'}  width={'1/6'}>
                <QuestionIcon />
              </View>
            </View>
          </Button>
          <Button borderRadius={'3xl'} bgColor={'white'}>
            <View flexDirection={'row'} justifyContent={'space-between'}>
              <View width={'5/6'} >
                <Text color={'darkBlue.700'} alignSelf={'center'} paddingLeft={'10'}>Apply to be a worker</Text>
              </View>
              <View justifyContent={'center'} alignItems={'flex-end'}  width={'1/6'}>
                <PlayIcon/>
              </View>
            </View>
          </Button>
          <Button borderRadius={'3xl'} bgColor={'white'}>
            <View flexDirection={'row'} justifyContent={'space-between'}>
              <View width={'5/6'} >
                <Text color={'darkBlue.700'} alignSelf={'center'} paddingLeft={'10'}>Log out</Text>
              </View>
              <View justifyContent={'center'} alignItems={'flex-end'}  width={'1/6'}>
                <CloseIcon />
              </View>
            </View>
          </Button>
        </Stack>
        
      </View>
      <View alignItems={'center'} marginTop={'10'}>
       <Image source={salle7liLogo} width={20} height={90}/>
       </View>
       </ScrollView>
    </View>
  );
};

export default Profile;
