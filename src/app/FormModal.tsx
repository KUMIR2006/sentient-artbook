'use client';

import { useEffect } from 'react';
import { Box, Button, Input, FileUpload, Icon } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { HiUpload } from 'react-icons/hi';

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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `artworks/${fileName}`; // можно добавить user_id в путь

    const { data, error } = await supabase.storage
      .from('artworks') // название bucket'а
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from('artworks').getPublicUrl(filePath);

    const publicUrl = publicUrlData?.publicUrl;
    console.log('Image uploaded at:', publicUrl);

    // теперь ты можешь использовать publicUrl как значение поля image_url
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

            <FormControl mb={3} colorScheme="blue" alignSelf="center">
              <FileUpload.Root>
                <FileUpload.HiddenInput accept=".png, .jpg, .jpeg .webp .avif" />
                <FileUpload.Trigger asChild>
                  <Button size="sm">
                    <Icon>
                      <HiUpload />
                    </Icon>
                    Upload file
                  </Button>
                </FileUpload.Trigger>
                <FileUpload.List />
              </FileUpload.Root>
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
