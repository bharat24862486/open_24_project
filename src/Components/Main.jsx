import { Box, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ItemCard from './ItemCard';


const Main = () => {

    const [data,setData] = useState([])

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
                return <ItemCard datas={el}/>
            })}
            </SimpleGrid>
            

        </Box>
    )
}

export default Main