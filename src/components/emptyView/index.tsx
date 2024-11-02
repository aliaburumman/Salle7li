import {Box, Text, useTheme} from "native-base";
import React from "react";
import {useTranslation} from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import { bgColorMain } from "../../screens/getStarted/started";

interface IProps {
    description: string
}

const EmptyView = ({description}: IProps) => {
    
    const {t} = useTranslation('emptyCart');
    const themeCheck=useAppSelector(state=>state.user.theme)

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            w={"100%"}
            justifyContent={"center"}
            alignItems="center"
        >
            <Text
                fontSize={24}
                fontWeight={700}
                
                color={themeCheck?'white':bgColorMain}>
                {t('empty')}
            </Text>
            <Text  color={themeCheck?'white':bgColorMain}>

                {description}
            </Text>
        </Box>
    )
}
export default EmptyView
