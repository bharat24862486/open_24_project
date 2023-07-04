import logo from './logo.svg';
import './App.css';
import { Box } from '@chakra-ui/react';
import Nav from './Components/Nav';
import Main from './Components/Main';
import Footer from './Components/Footer';
import Admin from './Components/Admin';
import Routees from './Routees';

function App() {
  return (
    <Box >
      <Nav />
      <Routees />
      <Footer />
      
    </Box>
  );
}

export default App;
