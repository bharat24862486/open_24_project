import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="red.500" color="white" py={6}>
        <Heading p={'2% '}>Open 24*7</Heading>
      <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap" p={['5%']}>
        <Flex direction="column" alignItems="flex-start" flex="1" mb={[4, 0]}>
          <Text fontSize="sm" fontWeight="bold" mb={2}>
            Company
          </Text>
          <Link href="#">About Us</Link>
          <Link href="#">Culture</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Careers</Link>
          <Link href="#">Contact</Link>
        </Flex>
        <Flex direction="column" alignItems="flex-start" flex="1" mb={[4, 0]}>
          <Text fontSize="sm" fontWeight="bold" mb={2}>
            For Foodies
          </Text>
          <Link href="#">Community</Link>
          <Link href="#">Code of Conduct</Link>
          <Link href="#">Developers</Link>
          <Link href="#">Mobile Apps</Link>
        </Flex>
        <Flex direction="column" alignItems="flex-start" flex="1">
          <Text fontSize="sm" fontWeight="bold" mb={2}>
            For Restaurants
          </Text>
          <Link href="#">Add a Restaurant</Link>
          <Link href="#">Claim your Listing</Link>
          <Link href="#">Business App</Link>
          <Link href="#">Restaurant Widgets</Link>
          <Link href="#">Products for Businesses</Link>
        </Flex>
      </Flex>
      <Text fontSize="sm" mt={6} textAlign="center">
        &copy; 2023 Open 24*7. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
