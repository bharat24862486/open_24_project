import { Box, Flex, Image, Text, Badge, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { Auth } from '../Context/Auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

let url = "https://open24.onrender.com"

const ItemCard = ({ datas, data, setData }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookingData, setBookingData] = useState({});
  const [updateData, setUpdateData] = useState({
    ID: datas.ID,
    Img: datas.Img,
    Name: datas.Name,
    Price: datas.Price,
    Quantity: datas.Quantity,
    _id: datas._id

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
      console.log(datas._id, "dish id")
      bookingData.dish_id = datas._id;
      bookingData.Email = info.Email;
      bookingData.Name = info.Name;
      bookingData.Quantity = 1;
      bookingData.Img = datas.Img;

      axios
        .post(`${url}/new_order`, bookingData)
        .then((res) => {
          if (typeof res.data !== 'string') {
            // toast({
            //   description: "Item Already exist",
            //   status: 'error',
            //   duration: 9000,
            //   isClosable: true,
            //   position: 'top-center'
            // })
            
          } else {
            if(res.data == "Item already exists"){
              toast({
                description: res.data,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-center'
              })

            } else{
              toast({
                description: res.data,
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-center'
              })

            }
            
            
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
    axios.delete(`${url}/delete/${datas._id}`).then((res) => {
      toast({
        description: 'Item Deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-center'
      })
      
      axios.get(`${url}`)
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
    updateData.Quantity = +updateData.Quantity
    console.log(datas._id)
    axios.patch(`${url}/update/${datas._id}`, updateData).then((res) => {
      toast({
        description: res.data,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-center'
      })
      }).catch((err) => console.log(err))
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
        <Text fontSize="md" mt={2} fontWeight={'600'}>
        Price: ₹{datas.Price}
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
          <Button colorScheme="red" mt={4} onClick={handleBookNowSubmit}>
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
            <Button bgColor="red.500" color={'white'} onClick={submit}>
              Confirm
            </Button>
            <Button bgColor="red.500" color={'white'} ml={2} onClick={onClose}>
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
