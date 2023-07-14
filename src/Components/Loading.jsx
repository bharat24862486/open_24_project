import { Box } from '@chakra-ui/react'
import React from 'react'
import Typed from "react-typed"

const Loading = () => {
    return (
        <Box bgColor={'red.500'} color={'white'} textAlign={'center'} h={'100vh'}>
            <Box bgColor={'red.500'} color={'white'} fontSize={['4rem']} pt={'20%'} >
                <Typed strings={[
                    "Open24",
                    "A Food Delivery App"
                ]}
                    typeSpeed={40}
                    backSpeed={40}
                    loop
                />
            </Box>

        </Box>
    )
}

export default Loading
