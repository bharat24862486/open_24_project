import { Box, Image } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SingleOrder from './SingleOrder'


let url="https://open24.onrender.com"


const AdminOrder = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`${url}/get_confirm_order`).then((res) => setData(res.data)).catch((err) => console.log(err))
    }, [])

    console.log(data)

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

   

    let boss = []
    for (let i in obj) {
        boss.push(obj[i])
    }

    function recall(){
        axios.get(`${url}/get_confirm_order`).then((res) => setData(res.data)).catch((err) => console.log(err))
    }

    console.log(boss, "boss")

    console.log(obj)

    return (
        <Box>
            {boss.length != 0? boss.map((el) => {
                console.log(el[0].order_id)
                    return(
                        <SingleOrder el={el} key={el[0].order_id} recall={recall}/>
                    )
            }): <Image display={'block'} m={'auto'} mt={'5%'} mb={'5%'} src={'https://cdn.dribbble.com/userupload/5340198/file/original-7cc722a1eae79d28850dabb82c622819.jpg?compress=1&resize=1024x768'} />}
        </Box >
    )
}

export default AdminOrder
