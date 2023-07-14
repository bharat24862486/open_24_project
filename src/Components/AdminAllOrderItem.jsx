import { Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'


let url = "https://open24.onrender.com"

const AdminAllOrderItem = ({ el }) => {
    let total = 0;

    for (let i = 0; i < el.length; i++) {
        total += el[i].Total;
    }
    return (
        <Box
            key={el[0].order_id}
            bg="white"
            mt={'1%'}
            mb={'1%'}
            p={4}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent={'space-between'}
        // boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
        >
            <Box w={'100%'} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"} p={'3%'} pb={['5%','3%']}>
                <Flex direction="row" alignItems={'center'} flex="1" justifyContent={'space-between'} >
                    <SimpleGrid columns={['3', '2', '5']} gap={'4%'}>
                        {el.map((ele) => {
                            return <Image src={ele.Img} alt={"Image"} objectFit="cover" boxSize={["50px","60px","80px","80px"]} mr={4} />;
                        })}
                    </SimpleGrid>


                    <Flex w={'50%'} justifyContent={'space-between'} alignItems={'center'} direction={['column','column','row','row']}>
                        <Flex>
                            <Text fontWeight={'600'} fontSize={['1rem', '1.1rem', '1.2rem', '1.2rem']}>
                                Status:&nbsp;&nbsp;
                            </Text>
                            <Text fontWeight={'600'} p={'1% 5%'} borderRadius={'10px'} fontSize={['1rem', '1.1rem', '1.2rem', '1.2rem']} bgColor={'green.500'} color={'white'}>{el[0].Status}</Text>

                        </Flex>

                        <Flex direction={'column'} alignItems={'center'}>
                            <Text fontWeight={'600'} fontSize={['1rem', '1.1rem', '1.2rem', '1.2rem']}>Items: {el.length}</Text>
                            <Text fontWeight={'600'} fontSize={['1rem', '1.1rem', '1.2rem', '1.2rem']}>Total: ₹{total}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>


        </Box>
    )
}

export default AdminAllOrderItem
