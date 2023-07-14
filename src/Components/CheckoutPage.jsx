import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../Context/Auth";
import { Link, useNavigate } from "react-router-dom";

let url = "https://open24.onrender.com"

const CheckoutPage = () => {
    const [order,setOrder] = useState([])
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    address: "",
    city: "",
    zipCode: "",
  });
  let {auth,setAuth,type,setType,info,setInfo} = useContext(Auth)
  const navigate = useNavigate()
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the form data
    console.log(formData);
    onOpen(); // Open the modal
  };

  


  let total = 0
    for (let i = 0; i < order.length; i++) {
        console.log(order[i])
        total += order[i].Total
    }

  useEffect(() => {
    let obj = {
        Email: info.Email
    }
    axios.post(`${url}/get_orders`, obj).then((res) => setOrder(res.data)).catch((err) => console.log(err))
}, [])


function success(){
    let obj={
        Email: info.Email
    }
    axios.post(`${url}/confirm_order`,obj).then((res) => setOrder(res.data)).catch((err) => console.log(err))
    navigate("/successfull")
}

  return (
    <Box bg="white" mt={'10%'} mb={'10%'} minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box bg="white" rounded="md" p={8} maxW="md" w="full" boxShadow="md">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>
          Checkout
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Card Number</FormLabel>
              <Input
                type="text"
                placeholder="Enter card number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Expiration Date</FormLabel>
              <Input
                type="text"
                placeholder="MM/YY"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>CVC</FormLabel>
              <Input
                type="text"
                placeholder="Enter CVC"
                name="cvc"
                value={formData.cvc}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                placeholder="Enter city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Zip Code</FormLabel>
              <Input
                type="text"
                placeholder="Enter zip code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button colorScheme="red" size="lg" fontSize="md" mt={4} type="submit">
              Pay Now
            </Button>
          </Stack>
        </form>
      </Box>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{order.length}</Text> {/* Replace with the actual quantity */}
            <Text>Total Amount: ₹{total}</Text> {/* Replace with the actual total amount */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={success} variant="ghost">Confirm Payment</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CheckoutPage;
