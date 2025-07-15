'use client';

import { Box, Heading, Text, Stack } from '@chakra-ui/react';

export default function HeroHeader() {
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

      <Stack
        position="relative"
        zIndex={1}
        h="100%"
        align="center"
        justify="center"
        textAlign="center"
        px={4}
        color="white">
        <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="bold">
          Sentient Artbook
        </Heading>
        <Text fontSize={{ base: 'sm', md: 'md' }} maxW="600px">
          Place where people can share art around the Sentient world Contribute, tag, and explore
          the art of others
        </Text>
      </Stack>
    </Box>
  );
}
