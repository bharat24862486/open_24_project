import logo from './logo.svg';
import './App.css';
import { Box } from '@chakra-ui/react';
import Nav from './Components/Nav';
import Main from './Components/Main';
import Footer from './Components/Footer';
import Admin from './Components/Admin';
import Routees from './Routees';
import MobNav from './Components/MobNav';

function App() {
  return (
    <Box >
      <Box display={['none','none','block','block']}><Nav /></Box>
      <Box display={['block','block','none','none']}><MobNav /></Box>
      <Routees />
      <Footer />
      
    </Box>
  );
}

export default App;
