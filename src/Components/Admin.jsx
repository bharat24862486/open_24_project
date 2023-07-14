import { Box, Button, Input, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

let url="https://open24.onrender.com"


let init = {
  Name: "",
  Price: 0,
  Quantity: 0,
  Img: "",
}

const Admin = () => {
  const [formData, setFormData] = useState(init);
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post(`${url}/add_dish`,formData).then((res)=>{
      toast({
        description: "New Item added",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-center'
      })
      setFormData(init)
      alert(res.data)}).catch((err)=>console.log(err))
  };

  return (
    <Box maxWidth="400px" margin="0 auto" mb={'2%'} mt={'2%'}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
          />
        </FormControl>
  
        <FormControl mb={4}>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="number"
            name="Quantity"
            value={formData.Quantity}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Image</FormLabel>
          <Input
            type="text"
            name="Img"
            value={formData.Img}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="red" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Admin;

