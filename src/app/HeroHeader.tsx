'use client';
import { Button, Box, Heading, Text, Stack, Input, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { InputGroup } from '@chakra-ui/input';
import FormModal from './FormModal';
type HeroHeaderProps = {
  search: string;
  setSearch: (value: string) => void;
};
export default function HeroHeader({ search, setSearch }: HeroHeaderProps) {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <Box position="relative" w="full" h="500px" overflow="hidden" rounded="lg">
      <Box
        position="absolute"
        inset="0"
        backgroundImage="url('/baner.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        filter="invert(1)"
        zIndex={0}
      />
      <FormModal isOpen={open} onClose={onClose} />
      <Stack
        position="relative"
        zIndex={1}
        h="100%"
        align="center"
        justify="center"
        textAlign="center"
        color="white">
        <Heading fontSize={{ base: '3xl', md: '5xl' }} mt={{ base: 10, md: 20 }} fontWeight="bold">
          Sentient Artbook
        </Heading>
        <Text fontSize={{ base: 'sm', md: 'md' }} maxW="600px">
          Place where people can share art around the Sentient world Contribute, tag, and explore
          the art of others
        </Text>
        <Button
          onClick={onOpen}
          mt={{ base: 2, md: 4 }}
          bg="#bc8634"
          color="white"
          _hover={{ bg: '#d6a664' }}>
          Submit your art
        </Button>
        <Box w="full" maxW={{ base: '100%', md: '350px', lg: '500px' }} mt={10} pb={4} mx="auto">
          <InputGroup>
            <Input
              placeholder="Search by tag or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="gray.800"
              color="white"
              _placeholder={{ color: 'gray.500' }}
              border="none"
              px={4}
              py={3}
              borderRadius="2xl" // большое скругление
              fontSize="lg"
              _hover={{ bg: 'gray.700' }}
              _focus={{ bg: 'gray.700', boxShadow: '0 0 0 1px #63b3ed' }}
              boxShadow="inset 2px 2px 5px rgba(0,0,0,0.6), inset -2px -2px 5px rgba(255,255,255,0.05)"
              transition="all 0.2s ease"
            />
          </InputGroup>
        </Box>
      </Stack>
    </Box>
  );
}
