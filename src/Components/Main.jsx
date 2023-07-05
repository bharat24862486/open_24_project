import { Box, SimpleGrid } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import ItemCard from './ItemCard';
import { Auth } from '../Context/Auth';


const Main = () => {

    const [data,setData] = useState([])
    let {auth,setAuth,type,setType,info,setInfo} = useContext(Auth)

    console.log(info,auth)

    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(response => {
                // Handle the successful response
                setData(response.data);
            })
            .catch(error => {
                // Handle the error
                console.error(error);
            });
    }, [])
    return (
        <Box >
            <SimpleGrid columns={['2','2','2','3']} gap={'10px'}  p={'2% 6%'}>
            {data && data.map((el)=>{
                return <ItemCard datas={el} data={data} setData={setData}/>
            })}
            </SimpleGrid>
            

        </Box>
    )
}

export default Main