import { Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import TraceOrderPage from './StatusPage';

const UserTraceItem = ({ el }) => {
    let total = 0;

    for (let i = 0; i < el.length; i++) {
        total += el[i].Total;
    }
    return (
        <Flex
            key={el[0].order_id}
            bg="white"
            mt={'1%'}
            mb={'1%'}
            p={4}
            direction={[
                'column', 'column','row','row'
            ]}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent={'space-between'}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
        >
            <Box w={['100%','100%','40%','40%']} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"} p={'3%'}>
                <Flex direction="row"  alignItems={'center'} flex="1" justifyContent={'space-between'} >
                    <SimpleGrid columns={['2', '2', '2']}>
                        {el.map((ele) => {
                            return <Image src={ele.Img} alt={"Image"} objectFit="cover" boxSize="100px" mr={4} />;
                        })}
                    </SimpleGrid>

                    <Flex direction={'column'} alignItems={'center'}>
                        <Text fontWeight={'600'} fontSize={['1rem', '1.1rem', '1.2rem', '1.3rem']}>Items: {el.length}</Text>
                        <Text fontWeight={'600'} fontSize={['1rem', '1.1rem', '1.2rem', '1.3rem']}>Total: ₹{total}</Text>
                    </Flex>
                </Flex>
            </Box>

            <Box w={['100%','100%','40%','40%']}><TraceOrderPage status={el[0].Status} /></Box>


        </Flex>
    )
}

export default UserTraceItem
