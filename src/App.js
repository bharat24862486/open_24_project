import logo from './logo.svg';
import './App.css';
import { Box } from '@chakra-ui/react';
import Nav from './Components/Nav';
import Main from './Components/Main';
import Footer from './Components/Footer';
import Admin from './Components/Admin';
import Routees from './Routees';
import MobNav from './Components/MobNav';
import { useContext, useEffect } from 'react';
import { Auth } from './Context/Auth';
import Loading from './Components/Loading';

function App() {
  const {loading,setLoading} = useContext(Auth)
  useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 5000);
    },[])
  if(loading){
    return <Loading />
  }
  return (
    <Box >
      <Box display={['none','none','none','block']}><Nav /></Box>
      <Box display={['block','block','block','none']}><MobNav /></Box>
      <Routees />
      <Footer />
      
    </Box>
  );
}

export default App;
