import { Box, SimpleGrid } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import ItemCard from './ItemCard';
import { Auth } from '../Context/Auth';
import Loading from './Loading';

// import io from "socket.io-client"
// let ENDPOINT = "http://localhost:5000/"

let url = "https://open24.onrender.com"


const Main = () => {

    

    const [data, setData] = useState([])
    let { auth, setAuth, type, setType, info, setInfo,hamburger, setHamburger,loading,setLoading } = useContext(Auth)

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

    // if(loading){
    //     return <Loading />
    // }


 




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