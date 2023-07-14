import { Box, Heading, Image } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import io from "socket.io-client"
import UserTraceItem from './UserTraceItem'
import { Auth } from '../Context/Auth'
let ENDPOINT = "https://open24.onrender.com"
let url = "https://open24.onrender.com"

const UserTrace = () => {
    let { auth, setAuth, type, setType, info, setInfo } = useContext(Auth)
    const [data, setData] = useState([])
    // const [final, setData] = useState([])



    useEffect(() => {
        let socket = io(ENDPOINT, { transports: ["websocket"] });

        socket.on("connect", (msg) => {
            console.log('hello')

        })
        socket.on("updater", (msg) => {
            console.log(msg)
            let arr = []
            for(let i=0; i<msg.length;i++){
                if(msg[i].Email == info.Email){
                    
                    arr.push(msg[i])
                }
                
            }
            console.log(msg)
            setData(arr)
        })


        // return () => {
        //     socket.emit('disconnect')
        //     socket.off()
        // }

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


    return (
        <Box>

            {boss.length != 0?  boss.map((el) => {
                return <UserTraceItem el={el} key={el[0].order_id}/>

            }): <Box>
                {/* <Heading mt={'5%'} fontSize={['4rem']} textAlign={'center'}>Nothing to Trace</Heading> */}
                <Image  display={'block'} m={'auto'} mt={'5%'} mb={'5%'} src={'https://cdn.dribbble.com/userupload/5340198/file/original-7cc722a1eae79d28850dabb82c622819.jpg?compress=1&resize=1024x768'} />
                </Box>}

        </Box>
    )
}

export default UserTrace
