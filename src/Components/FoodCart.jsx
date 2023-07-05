import { Box, Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../Context/Auth";
import axios from "axios";
import { Link } from "react-router-dom";

const FoodCart = () => {
    let { auth, setAuth, type, setType, info, setInfo } = useContext(Auth)
    const [order, setOrder] = useState([]);


    function callData() {
        let obj = {
            Email: info.Email
        }
        axios.post('http://localhost:5000/get_orders', obj).then((res) => setOrder(res.data)).catch((err) => console.log(err))
    }





    console.log(order)

    const handleDeleteItem = (itemId) => {
        console.log(itemId)
        // setOr?der([])
        axios.delete(`http://localhost:5000/delete_order/${itemId}`).then((res) => console.log(res)).catch((err) => console.log(err))
        let arr = order.filter((el) => {
            return el.ID != itemId
        })
        setOrder(arr)

    };

    const handleIncreaseQuantity = (itemId) => {

        order.map((el) => {
            if (el.ID == itemId) {
                let obj = {
                    Quantity: Number(el.Quantity) + 1,
                    Value: 1,
                    Email: el.Email
                }
                axios.patch(`http://localhost:5000/order_update/${itemId}`, obj).then((res) => callData()).catch((err) => console.log(err))
            }
        })

        // axios.patch('').then((res)=>console.log(res)).catch((err)=>console.log(err))


    };

    const handleDecreaseQuantity = (itemId) => {
        order.map((el) => {
            if (el.ID == itemId) {
                let obj = {
                    Quantity: Number(el.Quantity) - 1,
                    Value: -1,
                    Email: el.Email
                }
                axios.patch(`http://localhost:5000/order_update/${itemId}`, obj).then((res) => callData()).catch((err) => console.log(err))
            }
        })
    };

    useEffect(() => {
        let obj = {
            Email: info.Email
        }
        axios.post('http://localhost:5000/get_orders', obj).then((res) => setOrder(res.data)).catch((err) => console.log(err))
    }, [])

    let total = 0
    for (let i = 0; i < order.length; i++) {
        console.log(order[i])
        total += order[i].Total
    }

    return (
        <Box>
            {order ? <Box bg="white" p={6}>
                <Flex justifyContent={'space-between'}>
                    <Text fontSize="2xl" fontWeight="bold" color="red.500" mb={4}>
                        Food Cart
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="red.500" mb={4}>
                        Total: {total}
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
                            <Image src={item.Img} alt={item.ItemName} boxSize="100px" mr={4} />
                            <Flex direction="column" flex="1">
                                <Text fontSize="lg" fontWeight="bold">
                                    {item.ItemName}
                                </Text>
                                <Text fontSize="sm" color="gray.500" mb={2}>
                                    Delhi Darbar
                                </Text>
                                <Flex justifyContent="space-between" alignItems="center" mb={2}>
                                    <Text fontSize="lg" fontWeight="bold" textAlign="right">
                                        {item.ItemPrice}
                                    </Text>
                                    <Flex alignItems="center">
                                        <Button
                                            colorScheme="red"
                                            size="sm"
                                            mr={2}
                                            onClick={() => handleDecreaseQuantity(item.ID)}
                                        >
                                            -
                                        </Button>
                                        <Text fontSize="lg" fontWeight="bold" mr={2}>
                                            {item.Quantity}
                                        </Text>
                                        <Button
                                            colorScheme="red"
                                            size="sm"
                                            mr={2}
                                            onClick={() => handleIncreaseQuantity(item.ID)}
                                        >
                                            +
                                        </Button>
                                        <Button
                                            colorScheme="red"
                                            size="sm"
                                            onClick={() => handleDeleteItem(item.ID)}
                                        >
                                            Delete
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Box>
                    ))}
                </Stack>
                <Box>
                    <Link to={'/checkout'}><Button display={'block'} m={'auto'} mt={'2%'} mb={'2%'} colorScheme="red" size="sm">Checkout</Button></Link>
                </Box>
            </Box> : <Heading textAlign={'center'} m={'10% 0%'}>Your cart is empty</Heading>}
        </Box>
    );
};

export default FoodCart;
