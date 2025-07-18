'use client';
import SnapModal from './SnapModal';
import { Box, Image, Text, Stack, Link, useDisclosure, Badge } from '@chakra-ui/react';

type SnapCardProps = {
  image_url: string;
  title: string;
  tags: string[];
  twitter?: string;
  discord?: string;
  created_at?: string;
  setSearch: (value: string) => void;
};

export default function SnapCard({
  image_url,
  title,
  tags,
  twitter,
  discord,
  created_at,
  setSearch,
}: SnapCardProps) {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        maxW="auto"
        w="full"
        position="relative"
        rounded="lg"
        overflow="hidden"
        shadow="md"
        className="snap-card"
        onClick={onOpen}
        cursor="pointer">
        <Image src={image_url} alt="art" objectFit="cover" w="full" h="auto" />

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
            <Text fontSize="md" fontWeight="semibold" lineHeight="1.4" gap={2}>
              {title}
            </Text>

            <Stack direction="row" gap={2}>
              {tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  bg="#bc8634"
                  px={2}
                  py={1}
                  fontSize="xs"
                  rounded="sm"
                  _hover={{ bg: '#d6a664' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearch(tag);
                  }}>
                  #{tag}
                </Badge>
              ))}
            </Stack>

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

      <SnapModal
        isOpen={open}
        onClose={onClose}
        imageUrl={image_url}
        title={title}
        tags={tags}
        twitter={twitter}
        discord={discord}
        createdAt={created_at}
        setSearch={setSearch}
      />
    </>
  );
}
