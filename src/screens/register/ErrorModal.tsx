import React from 'react';
import {Box, Text, WarningIcon} from 'native-base';


type Props = {
  title: string;
  stylingBox?: any;
  warningIcon?:boolean;
 
};
const WarningMessage: React.FC<Props> = ({stylingBox, title,warningIcon}) => {

  return (
    <Box flexDirection={'row'} alignItems={'center'} style={stylingBox}>
      {warningIcon!==false&&<WarningIcon color={'red.600'} size="xs" />}
      <Text color={'red.600'} zIndex={2} fontSize={10}>
        {'  '}
        {title}
      </Text>
    </Box>
  );
};
export default WarningMessage;
