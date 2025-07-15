'use client';

import { Box, Image, Text, Stack, Link } from '@chakra-ui/react';

type SnapCardProps = {
  imageUrl: string;
  message: string;
  tags: string[];
  twitter?: string;
  discord?: string;
  createdAt?: string;
};

export default function SnapCard({
  imageUrl,
  message,
  tags,
  twitter,
  discord,
  createdAt,
}: SnapCardProps) {
  return (
    <Box
      maxW="sm"
      w="full"
      position="relative"
      cursor="pointer"
      rounded="lg"
      overflow="hidden"
      shadow="md"
      className="snap-card">
      {/* Image - Always visible */}
      <Image src={imageUrl} alt="art" objectFit="cover" w="full" h="auto" />

      {/* Overlay content - Hidden by default, shows on hover */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        bg="linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent)"
        color="white"
        p={4}
        minH="50%"
        opacity={0}
        transform="translateY(20px)"
        transition="all 0.3s ease-in-out"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        className="overlay-content">
        <Stack gap={3}>
          {/* Message */}
          <Text fontSize="md" fontWeight="semibold" lineHeight="1.4" gap={2}>
            {message}
          </Text>

          {/* Tags */}
          <Stack direction="row" gap={2}>
            {tags.map((tag) => (
              <Box
                key={tag}
                bg="#d89b3e"
                px={2}
                py={1}
                fontSize="xs"
                rounded="sm"
                _hover={{ bg: '#f2c37d' }}>
                #{tag}
              </Box>
            ))}
          </Stack>

          {/* Social links and date */}

          {twitter && (
            <Link
              href={`https://twitter.com/${twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="underline"
              color="#FFCF85"
              _hover={{ textDecoration: 'underline', color: '#e2a74d' }}
              w="100px">
              {twitter}
            </Link>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
