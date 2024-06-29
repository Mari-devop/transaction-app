import { Box, Flex, Link, HStack, Text } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg="gray.100" px={4} position="fixed" width="100%" zIndex={1} top={0}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize="xl" fontWeight="bold">Mari's test task</Text>
        <HStack as={'nav'} spacing={4}>
          <Link
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
              textDecoration: 'none',
              bg: 'gray.200',
            }}
            href={'#'}
          >
            Home
          </Link>
          <Link
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
              textDecoration: 'none',
              bg: 'gray.200',
            }}
            href={'#'}
          >
            Transactions
          </Link>
          <Link
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
              textDecoration: 'none',
              bg: 'gray.200',
            }}
            href={'#'}
          >
            About
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
