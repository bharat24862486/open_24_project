import { Box, SimpleGrid } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import ItemCard from './ItemCard';
import { Auth } from '../Context/Auth';

// import io from "socket.io-client"
// let ENDPOINT = "http://localhost:5000/"

let url = "https://open247.onrender.com"


const Main = () => {

    const [data, setData] = useState([])
    let { auth, setAuth, type, setType, info, setInfo,hamburger, setHamburger } = useContext(Auth)

    // console.log(info, auth)

    useEffect(() => {
        axios.get(`${url}`)
            .then(response => {
                // Handle the successful response
                setData(response.data);
            })
            .catch(error => {
                // Handle the error
                console.error(error);
            });
    }, [])


    // useEffect(() => {
    //     let socket = io(ENDPOINT, { transports: ["websocket"] });

    //     socket.on("connect", (msg) => {
    //         console.log('hello', msg)
            
    //     })
    //     socket.on("status_update", (msg)=>{
    //         console.log(msg)
    //     })


    //     // return () => {
    //     //     socket.emit('disconnect')
    //     //     socket.off()
    //     // }

    // }, [])




    return (
        <Box >
            {!hamburger? <SimpleGrid columns={['1', '2', '2', '3']} gap={'10px'} p={'2% 6%'}>
                {data.length != 0 && data.map((el) => {
                    return <ItemCard datas={el} data={data} setData={setData} />
                })}
            </SimpleGrid>: ''}


        </Box>
    )
}

export default Main