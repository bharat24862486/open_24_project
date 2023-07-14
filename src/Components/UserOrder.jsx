import { Box, Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Auth } from '../Context/Auth'
import AdminAllOrderItem from './AdminAllOrderItem'

let url = "https://open24.onrender.com"

const UserOrder = () => {
    let { auth, setAuth, type, setType, info, setInfo } = useContext(Auth)
    const [data, setData] = useState([])

    useEffect(() => {
        let obj = {
            Email: info.Email
        }
        axios.post(`${url}/get_success_order_with_email`, obj).then((res) => setData(res.data)).catch((err) => console.log(err))
    }, [])


    let obj = {}

    for (let i = 0; i < data.length; i++) {
        if (obj[data[i].order_id] == undefined) {
            let a = []
            a.push(data[i])

            obj[data[i].order_id] = a

        } else {
            obj[data[i].order_id].push(data[i])
        }
    }

    console.log(obj)



    let boss = []
    for (let i in obj) {
        boss.push(obj[i])
    }


    let total = 0

    for(let i=0;i<boss.length;i++){
        for (let j=0; j<boss[i].length;j++){
            total+=boss[i][j].Total
        }
    }


    return (
        <Box m={'1%'}>

            <Flex justifyContent={'space-between'}>
                <Text fontSize="2xl" fontWeight="bold" color="red.500" mb={4}>All Orders</Text>
                <Text fontSize="2xl" fontWeight="bold" color="red.500" mb={4}>Total: ₹{total}</Text>
            </Flex>

            {boss.length != 0 ? boss.map((el) => {
                return <AdminAllOrderItem el={el} key={el[0].order_id} />

            }) : <Box>
                {/* <Heading mt={'5%'} fontSize={['4rem']} textAlign={'center'}>Nothing to Trace</Heading> */}
                <Image display={'block'} m={'auto'} mt={'5%'} mb={'5%'} src={'https://cdn.dribbble.com/userupload/5340198/file/original-7cc722a1eae79d28850dabb82c622819.jpg?compress=1&resize=1024x768'} />
            </Box>}

        </Box>
    )
}

export default UserOrder
