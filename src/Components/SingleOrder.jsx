import React, { useRef, useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Select,
    Text,
    useDisclosure,
    SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios';

let url = "https://open24.onrender.com"

const SingleOrder = ({ el, recall }) => {
    let total = 0;

    for (let i = 0; i < el.length; i++) {
        total += el[i].Total;
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    let ref1 = useRef(null)



    function submit() {
        console.log(ref1.current.value)
        let obj = {
            Status: ref1.current.value
        }
        console.log(el.length)
        console.log(el[0].order_id)
        axios.patch(`${url}/status_change/${el[0].order_id}`, obj).then((res) => {
            recall()
        }).catch((err) => {
            console.log(err)
        })
        onClose()
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
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
        >
            <Flex direction="row" alignItems={'center'} flex="1" justifyContent={'space-between'}>
                <SimpleGrid columns={['2', '2', '3']} gap={'2%'}>
                    {el.map((ele) => {
                        return <Image src={ele.Img} alt={"Image"} objectFit="cover" boxSize="60px" mr={4} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"} />;
                    })}
                </SimpleGrid>

                <Flex w={['20%','40%','40%','40%']} justifyContent={'space-around'} alignItems={'center'} direction={['column','column','row','row']}>
                    <Text fontWeight={'600'} fontSize={['0.8rem', '1.1rem', '1.2rem', '1.3rem']}>
                        Status: {el[0].Status === "Confirm" ? "Processing" : el[0].Status}
                    </Text>
                    <Button fontSize={['0.8rem', '1.1rem', '1.2rem', '1.3rem']} bgColor={'red.500'} color={'white'} onClick={onOpen}>
                        Change Status
                    </Button>
                </Flex>

                <Flex direction={'column'} alignItems={'center'}>
                    <Text fontWeight={'600'} fontSize={['1rem', '1.1rem', '1.2rem', '1.3rem']}>Items: {el.length}</Text>
                    <Text fontWeight={'600'} fontSize={['1rem', '1.1rem', '1.2rem', '1.3rem']}>Total: ₹{total}</Text>
                </Flex>
            </Flex>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent mt={'15%'}>
                    <ModalHeader>Select Status</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Select placeholder="Select status" ref={ref1}>

                            <option value="Ready">Ready</option>
                            <option value="Out of Delivery">Out of Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </Select>
                        <Flex justifyContent={'space-around'} mt={4} alignItems={'center'}>

                            <Button mt={4} bgColor="red.500" color={'white'} onClick={submit}>
                                Submit
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default SingleOrder;
