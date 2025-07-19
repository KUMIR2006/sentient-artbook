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
          p={{ base: 2, sm: 3, md: 4 }}
          // Убираем фиксированную высоту и делаем адаптивную
          minH={{ base: '40%', sm: '45%', md: '50%' }}
          maxH="70%" // Ограничиваем максимальную высоту
          opacity={0}
          transform="translateY(20px)"
          transition="all 0.3s ease-in-out"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          className="overlay-content">
          <Stack gap={{ base: 2, sm: 2.5, md: 3 }}>
            <Text
              fontSize={{ base: 'sm', sm: 'md', md: 'md' }}
              fontWeight="semibold"
              lineHeight="1.3"
              // Используем lineClamp вместо noOfLines
              lineClamp={{ base: 2, sm: 3, md: 4 }}
              wordBreak="break-word">
              {title}
            </Text>

            {/* Адаптивное количество тегов */}
            <Stack direction="row" gap={{ base: 1, sm: 1.5, md: 2 }} flexWrap="wrap">
              {tags.slice(0, 2).map((tag, index) => (
                <Badge
                  key={index}
                  bg="#bc8634"
                  px={{ base: 1.5, sm: 2, md: 2 }}
                  py={1}
                  fontSize={{ base: '2xs', sm: 'xs', md: 'xs' }}
                  rounded="sm"
                  _hover={{ bg: '#d6a664' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearch(tag);
                  }}
                  // Ограничиваем ширину
                  maxW={{ base: '60px', sm: '80px', md: '100px' }}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap">
                  #{tag}
                </Badge>
              ))}
              {/* Показываем количество скрытых тегов */}
              {tags.length > 2 && (
                <Badge
                  bg="#bc8634"
                  px={{ base: 1.5, sm: 2, md: 2 }}
                  py={1}
                  fontSize={{ base: '2xs', sm: 'xs', md: 'xs' }}
                  rounded="sm">
                  +{tags.length - 2}
                </Badge>
              )}
            </Stack>

            {twitter && (
              <Link
                href={`https://twitter.com/${twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                color="#FFCF85"
                _hover={{ textDecoration: 'underline', color: '#e2a74d' }}
                fontSize={{ base: 'xs', sm: 'sm', md: 'sm' }}
                // Ограничиваем ширину и делаем текст усеченным
                maxW={{ base: '80px', sm: '100px', md: '120px' }}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap">
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
