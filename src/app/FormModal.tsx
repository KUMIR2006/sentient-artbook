'use client';

import { useEffect } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';

const MotionBox = motion(Box);
type FormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    twitter: '',
    discord: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Здесь можно отправить данные на Supabase
    console.log('Submitted:', form);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
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
          justifyContent="center">
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
            w={{ base: '90vw', md: '500px', lg: '550px' }}
            maxH={{ base: '90vh', md: '85vh' }}
            overflow="auto"
            onClick={(e) => e.stopPropagation()}
            display="flex"
            flexDirection="column"
            gap={6}>
            <Box fontSize="xl" fontWeight="bold" mb={4}>
              Submit Your Art
            </Box>

            <FormControl mb={3}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={handleChange}
                bg="#1a1a1e"
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                placeholder="write the title of your art"
                value={form.title}
                onChange={handleChange}
                bg="#1a1a1e"
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Twitter</FormLabel>
              <Input
                name="twitter"
                placeholder="@username"
                value={form.twitter}
                onChange={handleChange}
                bg="#1a1a1e"
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Discord</FormLabel>
              <Input
                name="discord"
                placeholder="yourname#0000"
                value={form.discord}
                onChange={handleChange}
                bg="#1a1a1e"
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Tags (comma separated)</FormLabel>
              <Input
                name="tags"
                placeholder="dream, night, fog"
                value={form.tags}
                onChange={handleChange}
                bg="#1a1a1e"
              />
            </FormControl>

            <Box display="flex" justifyContent="flex-end" mt={4} gap={3}>
              <Button onClick={handleSubmit} colorScheme="blue">
                Submit
              </Button>
              <Button onClick={onClose} variant="ghost">
                Cancel
              </Button>
            </Box>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}
