import { Box, Flex, Image, Text, Badge, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { Auth } from '../Context/Auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ datas, data, setData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookingData, setBookingData] = useState({
    Quantity: 0,
  });
  const [updateData, setUpdateData] = useState({
    ID: datas.ID,
    Img: datas.Img,
    Name: datas.Name,
    Price: datas.Price,
    Quantity: datas.Quantity

  })
  const navigate = useNavigate();
  let { auth, setAuth, type, setType, info, setInfo } = useContext(Auth);

  const handleQuantityChange = (e) => {
    setBookingData((prevData) => ({
      ...prevData,
      Quantity: e.target.value,
    }));
  };

  const handleBookNow = () => {
    onOpen();
  };

  const handleBookNowSubmit = () => {
    if (auth) {
      bookingData.ID = datas.ID;
      bookingData.Email = info.Email;
      bookingData.Name = info.Name;
      bookingData.Quantity = +bookingData.Quantity;
      bookingData.Img = datas.Img;

      axios
        .post('http://localhost:5000/new_order', bookingData)
        .then((res) => {
          if (typeof res.data !== 'string') {
            alert('Item added successfully');
          } else {
            alert(res.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      navigate('/login');
    }

    onClose();
  };

  const handleDelete = () => {
    // Perform delete action
    axios.delete(`http://localhost:5000/delete/${datas.ID}`).then((res) => {
      axios.get('http://localhost:5000/')
        .then(response => {
          // Handle the successful response
          setData(response.data);
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });

      alert(res.data)
    }).catch((er) => console.log(er))
  };

  const handleUpdate = () => {
    // Perform update action
    onOpen();
  };

  function formValidator(e) {
    let { name, value } = e.target
    console.log(name, value)
    setUpdateData({ ...updateData, [name]: value })
  }

  function submit(e) {
    e.preventDefault()
    console.log(updateData)
    console.log(datas.ID)
    axios.patch(`http://localhost:5000/update/${datas.ID}`, updateData).then((res) => alert(res.data)).catch((err) => console.log(err))
    onClose()
  }

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

        {info.Role === 'Admin' ? 
          <Flex justifyContent="space-around">
          <Button colorScheme="red" mt={4} onClick={handleUpdate}>
            Update
          </Button>
          <Button colorScheme="red" mt={4} onClick={handleDelete}>
            Delete
          </Button>
        </Flex>
          
        : 
          <Button colorScheme="red" mt={4} onClick={handleBookNow}>
            Book Now
          </Button>
        }
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {info.Role == "Admin" ? <ModalContent>
          <ModalHeader>Update Now</ModalHeader>
          <ModalBody>
            <Box mt={4}>
              <label>Item name:</label>
              <Input type="text" value={updateData.Name} name='Name' onChange={(e) => formValidator(e)} />

              <label>Item Image:</label>
              <Input type="text" value={updateData.Img} name='Img' onChange={(e) => formValidator(e)} />
              <label>Item Price:</label>
              <Input type="number" value={updateData.Price} name='Price' onChange={(e) => formValidator(e)} />
              <label>Item Quantity:</label>
              <Input type="number" value={updateData.Quantity} name='Quantity' onChange={(e) => formValidator(e)} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={submit}>
              Confirm
            </Button>
            <Button ml={2} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent> :
          <ModalContent>
            <ModalHeader>Book Now</ModalHeader>
            <ModalBody>
              <Box mt={4}>
                <label>Quantity:</label>
                <Input type="number" value={bookingData.Quantity} onChange={handleQuantityChange} />
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
          </ModalContent>}
      </Modal>
    </Box>
  );
};

export default ItemCard;
