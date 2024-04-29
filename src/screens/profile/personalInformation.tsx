import { HStack, Stack, Text, View } from 'native-base'
import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { bgColorMain } from '../getStarted/started'

const PersonalInformation = () => {
    const themeCheck=useAppSelector(state=>state.theme.lightMode)
  return (
<Stack flex={1} bgColor={themeCheck?"white":bgColorMain}  justifyContent={'space-around'} >
  <HStack justifyContent={'space-around'}>
    <Text color={themeCheck?bgColorMain:'white'}>First Name:</Text>
    <Text color={themeCheck?bgColorMain:'white'}>Etrokeh fadi</Text>

  </HStack>
  <HStack justifyContent={'space-around'}>
    <Text color={themeCheck?bgColorMain:'white'}>Last Name:</Text>
    <Text color={themeCheck?bgColorMain:'white'}>Etrokeh fadi</Text>

  </HStack>
  <HStack justifyContent={'space-around'}>
    <Text color={themeCheck?bgColorMain:'white'}>Email:</Text>
    <Text color={themeCheck?bgColorMain:'white'}>Etrokeh fadi</Text>

  </HStack>
  <HStack justifyContent={'space-around'}>
    <Text color={themeCheck?bgColorMain:'white'}>Phone Number:</Text>
    <Text color={themeCheck?bgColorMain:'white'}>Etrokeh fadi</Text>

  </HStack>
  <HStack justifyContent={'space-around'}>
    <Text color={themeCheck?bgColorMain:'white'}>City:</Text>
    <Text color={themeCheck?bgColorMain:'white'}>Etrokeh fadi</Text>

  </HStack>
</Stack>
  )
}

export default PersonalInformation
