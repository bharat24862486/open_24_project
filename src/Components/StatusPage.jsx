import { Box, Text, Progress, Stack, Flex, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";


let url = "https://open24.onrender.com"


const TraceOrderPage = ({status}) => {


  

  

    

  const getStatusText = () => {
    switch (status) {
      case "Confirm":
        return "Food is Getting Ready";
      case "Ready":
        return "Food is Ready";
      case "Out of Delivery":
        return "Out for Delivery";
      case "Delivered":
        return "Order Delivered";
      default:
        return "";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "Confirm":
        return "gray";
      case "Ready":
        return "orange";
      case "Out of Delivery":
        return "blue";
      case "Delivered":
        return "green";
      default:
        return "";
    }
  };

  const renderCardOption = () => {
    if (status === "Delivered") {
      return (
        <Flex align="center">
          <Icon as={MdCheckCircle} boxSize={6} color={`${getStatusColor()}.500`} />
          <Text ml={2} color={`${getStatusColor()}.500`} fontWeight="bold">
            {getStatusText()}
          </Text>
        </Flex>
      );
    } else {
      return (
        <Flex align="center">
          <Box boxSize={6} borderRadius="full" bgColor={`${getStatusColor()}.500`} />
          <Text ml={2} color="gray.600">
            {getStatusText()}
          </Text>
        </Flex>
      );
    }
  };

  return (
    <Box bg="gray.100" p={6} maxW="md" mx="auto" mt={10}>
      <Stack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Track Your Order
        </Text>
        <Flex align="center">
          <Icon as={FaMapMarkerAlt} boxSize={8} color="gray.400" />
          <Text ml={2} color="gray.600">
            Delivery Address: A/16 Brahmpuri
          </Text>
        </Flex>
        <Progress
          colorScheme={`${getStatusColor()}`}
          size="lg"

          value={status === "Confirm" ? 25 : status === "Ready" ? 50 : status === "Out of Delivery" ? 75 : 100}
          transition="width 0.5s ease-in-out"
        />
        {renderCardOption()}
        
      </Stack>
    </Box>
  );
};

export default TraceOrderPage;
