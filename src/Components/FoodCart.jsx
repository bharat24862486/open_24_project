import { Box, Button, Flex, Heading, Image, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../Context/Auth";
import axios from "axios";
import { Link } from "react-router-dom";

let url = "https://open24.onrender.com"

const FoodCart = () => {
  const { auth, setAuth, type, setType, info, setInfo } = useContext(Auth);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    let obj = {
      Email: info.Email
    };
    axios
      .post(`${url}/get_orders`, obj)
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  }, []);

  function callData() {
    let obj = {
      Email: info.Email
    };
    axios
      .post(`${url}/get_orders`, obj)
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  }

  const handleDeleteItem = (itemId) => {
    axios
      .delete(`${url}/delete_order/${itemId}`)
      .then((res) => callData())
      .catch((err) => console.log(err));
    // let arr = order.filter((el) => el.ID !== itemId);
    // setOrder(arr);
  };

  const handleIncreaseQuantity = (itemId) => {
    order.map((el) => {
      if (el._id === itemId) {
        let obj = {
          Quantity: Number(el.Quantity) + 1,
          Value: -1,
          Email: el.Email
        };
        axios
          .patch(`${url}/order_update/${itemId}`, obj)
          .then((res) => callData())
          .catch((err) => console.log(err));
      }
    });
  };

  const handleDecreaseQuantity = (itemId) => {
    order.map((el) => {
      if (el._id === itemId) {
        let obj = {
          Quantity: Number(el.Quantity) - 1,
          Value: 1,
          Email: el.Email
        };
        axios
          .patch(`${url}/order_update/${itemId}`, obj)
          .then((res) => callData())
          .catch((err) => console.log(err));
      }
    });
  };

  let total = 0;
  for (let i = 0; i < order.length; i++) {
    total += order[i].Total;
  }

  const btnSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box>
      {order.length ? (
        <Box bg="white" p={6}>
          <Flex justifyContent="space-between">
            <Text fontSize="2xl" fontWeight="bold" color="red.500" mb={4}>
              Food Cart
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="red.500" mb={4}>
              Total: ₹ {total}
            </Text>
          </Flex>
          <Stack spacing={4}>
            {order.map((item) => (
              <Box
                key={item.ID}
                bg="white"
                p={4}
                borderRadius="md"
                boxShadow="md"
                display="flex"
                alignItems="center"
              >
                <Image src={item.Img} alt={item.ItemName} objectFit="cover" boxSize="100px" mr={4} />
                <Flex direction="column" flex="1">
                  <Text fontSize="lg" fontWeight="bold">
                    {item.ItemName}
                  </Text>
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    Delhi Darbar
                  </Text>
                  <Flex justifyContent="space-between" alignItems={["start","center","center","center"]} mb={2} flexDirection={['column','row','row','row']}>
                    <Text fontSize="lg" fontWeight="bold" textAlign="right">
                    ₹ {item.ItemPrice}
                    </Text>
                    <Flex alignItems="center">
                      <Button
                        colorScheme="red"
                        size={btnSize}
                        mr={2}
                        onClick={() => handleDecreaseQuantity(item._id)}
                      >
                        -
                      </Button>
                      <Text fontSize="lg" fontWeight="bold" mr={2}>
                        {item.Quantity}
                      </Text>
                      <Button
                        colorScheme="red"
                        size={btnSize}
                        mr={2}
                        onClick={() => handleIncreaseQuantity(item._id)}
                      >
                        +
                      </Button>
                      <Button colorScheme="red" size={btnSize} onClick={() => handleDeleteItem(item._id)}>
                        Delete
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Stack>
          <Box>
            <Link to="/checkout">
              <Button display="block" m="auto" mt="2%" mb="2%" colorScheme="red" size={btnSize}>
                Checkout
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <Image display={'block'} m={'auto'} mt={'10%'} mb={'10%'} src="https://t4.ftcdn.net/jpg/01/67/44/09/240_F_167440913_ai5ZyrlREVCvAwYvT04cJ8R2Ctwe6EUW.jpg" />
      )}
    </Box>
  );
};

export default FoodCart;
