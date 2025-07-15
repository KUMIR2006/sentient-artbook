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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

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
        bg="rgba(0, 0, 0, 0.85)"
        color="white"
        p={4}
        opacity={0}
        transform="translateY(20px)"
        transition="all 0.3s ease-in-out"
        className="overlay-content">
        <Stack gap={3}>
          {/* Message */}
          <Text fontSize="md" fontWeight="semibold" lineHeight="1.4" gap={2}>
            {message}
          </Text>

          {/* Tags */}
          {tags.length > 0 && (
            <Box>
              {tags.map((tag) => (
                <Box
                  key={tag}
                  as="span"
                  display="inline-block"
                  px={2}
                  py={1}
                  mr={2}
                  mb={1}
                  bg="rgba(255, 255, 255, 0.2)"
                  color="white"
                  fontSize="sm"
                  rounded="md"
                  backdropFilter="blur(10px)">
                  #{tag}
                </Box>
              ))}
            </Box>
          )}

          {/* Social links and date */}
          {(twitter || discord || createdAt) && (
            <Stack gap={1} fontSize="sm" opacity={0.9}>
              {twitter && (
                <Link href={`https://twitter.com/${twitter.replace('@', '')}`} color="blue.400">
                  Twitter: {twitter}
                </Link>
              )}
              {discord && <Text>Discord: {discord}</Text>}
              {createdAt && (
                <Text fontSize="xs" opacity={0.7}>
                  Uploaded: {formatDate(createdAt)}
                </Text>
              )}
            </Stack>
          )}
        </Stack>
      </Box>

      {/* CSS for hover effect */}
      <style jsx>{`
        .snap-card:hover .overlay-content {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </Box>
  );
}
