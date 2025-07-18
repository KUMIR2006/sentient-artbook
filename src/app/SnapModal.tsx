'use client';
import { useEffect, useCallback } from 'react';
import { Box, Text, Image, VStack, HStack, Badge, Link } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

type SnapModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  tags: string[];
  twitter?: string;
  discord?: string;
  createdAt?: string;
  setSearch: (value: string) => void;
};

const MotionBox = motion(Box);

export default function SnapModal({
  isOpen,
  onClose,
  imageUrl,
  title,
  tags,
  twitter,
  discord,
  createdAt,
  setSearch,
}: SnapModalProps) {
  // Мемоизированная функция закрытия
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Функция для закрытия с задержкой для анимации
  const handleTagClick = useCallback(
    (tag: string) => {
      // Сначала ждем анимацию закрытия, потом устанавливаем поиск
      onClose();
      // Небольшая задержка для завершения анимации
      setTimeout(() => {
        setSearch(tag);
      }, 250); // 250ms = длительность анимации + небольшой буфер
    },
    [onClose, setSearch],
  );

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Предотвращаем скролл body когда модальное окно открыто
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  const formatDate = (iso: string | undefined) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="rgba(0,0,0,0.4)"
          zIndex="9999"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={handleClose}>
          <MotionBox
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            bg="#1F2022"
            color="white"
            p={6}
            borderRadius="lg"
            boxShadow="2xl"
            maxW="90vw"
            maxH="90vh"
            overflow="auto"
            onClick={(e) => e.stopPropagation()}
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            gap={6}>
            <Box minW={{ base: '100%', md: '300px' }} flexShrink={0}>
              <Text fontSize="lg" fontWeight="bold" mb={3}>
                {title}
              </Text>

              <Text fontSize="sm" color="gray.300" mb={4}>
                {formatDate(createdAt)}
              </Text>

              <VStack align="start" gap={3}>
                {/* Tags */}
                {tags?.length > 0 && (
                  <Box>
                    <Text fontWeight="semibold" mb={1}>
                      Tags
                    </Text>
                    <HStack wrap="wrap" gap={2}>
                      {tags.map((tag, index) => (
                        <Badge
                          key={index}
                          cursor="pointer"
                          bg="#bc8634"
                          px={2}
                          py={1}
                          fontSize="xs"
                          rounded="sm"
                          _hover={{ bg: '#d6a664' }}
                          onClick={() => handleTagClick(tag)}>
                          #{tag}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>
                )}

                {/* Socials */}
                {(twitter || discord) && (
                  <Box>
                    <Text fontWeight="semibold" mb={1}>
                      Social
                    </Text>
                    <VStack align="start" gap={1}>
                      {twitter && (
                        <Link
                          href={`https://twitter.com/${twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="underline"
                          color="#FFCF85"
                          _hover={{ textDecoration: 'underline', color: '#e2a74d' }}>
                          Twitter: {twitter}
                        </Link>
                      )}
                      {discord && <Text color="gray.300">Discord: {discord}</Text>}
                    </VStack>
                  </Box>
                )}
              </VStack>
            </Box>

            {/* Photo */}
            <Box
              flex="1"
              display="flex"
              alignItems="center"
              justifyContent="center"
              maxH="80vh"
              overflow="hidden">
              <Image
                src={imageUrl}
                alt="Snap"
                objectFit="contain"
                maxH="80vh"
                borderRadius="md"
                boxShadow="lg"
              />
            </Box>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}
