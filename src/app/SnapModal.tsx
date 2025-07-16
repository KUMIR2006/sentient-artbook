'use client';
import { useEffect } from 'react';
import { Box, Text, IconButton, Image, VStack, HStack, Badge, Link } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
type SnapModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  message: string;
  tags: string[];
  twitter?: string;
  discord?: string;
  createdAt?: string;
};

const MotionBox = motion(Box);

export default function SnapModal({
  isOpen,
  onClose,
  imageUrl,
  message,
  tags,
  twitter,
  discord,
  createdAt,
}: SnapModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  const formatDate = (iso: string | undefined) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
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
          onClick={onClose}>
          <MotionBox
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
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
                {message}
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
                        <Badge key={index} cursor="pointer">
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
