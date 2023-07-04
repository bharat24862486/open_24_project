import { Box, Flex, Image, Text, Badge, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';

const ItemCard = ({ datas }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookingData, setBookingData] = useState({
    name: '',
    quantity: 0,
  });

  const handleNameChange = (e) => {
    setBookingData((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };

  const handleQuantityChange = (e) => {
    setBookingData((prevData) => ({
      ...prevData,
      quantity: e.target.value,
    }));
  };

  const handleBookNow = () => {
    console.log('Book Now clicked');
    onOpen();
  };

  const handleBookNowSubmit = () => {
    console.log('Booking data:', bookingData);
    onClose();
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: 'lg' }}
    >
      <Image src={datas.Img} alt="Item" w={'100%'} h={'200px'} objectFit="cover" />

      <Box p={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            {datas.Name}
          </Text>
          <Badge colorScheme="green">4.5</Badge>
        </Flex>

        <Text fontSize="sm" mt={2}>
          Delhi Darbar
        </Text>
        <Text fontSize="sm" color="gray.500">
          Delhi
        </Text>
        <Text fontSize="sm" mt={2}>
          Price Range: {datas.Price}
        </Text>

        <Button colorScheme="red" mt={4} onClick={handleBookNow}>
          Book Now
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Now</ModalHeader>
          <ModalBody>
            <Box>
              <label>Your Name:</label>
              <Input type="text" value={bookingData.name} onChange={handleNameChange} />
            </Box>
            <Box mt={4}>
              <label>Quantity:</label>
              <Input type="number" value={bookingData.quantity} onChange={handleQuantityChange} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleBookNowSubmit}>
              Confirm
            </Button>
            <Button ml={2} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ItemCard;
