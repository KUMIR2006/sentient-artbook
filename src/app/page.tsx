'use client';
import { useEffect, useState } from 'react';

import Masonry from 'react-masonry-css';
import { Box, Skeleton } from '@chakra-ui/react';
import { supabase } from '@/lib/supabaseClient';

import SnapCard from './SnapCard';
import HeroHeader from './HeroHeader';

type Artwork = {
  id: number;
  title: string;
  image_url: string;
  twitter: string;
  discord: string;
  tags: string[]; // если это массив
};

const breakpointColumnsObj = {
  default: 4,
  640: 2,
  400: 1,
};

export default function SnapGallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const fetchArtworks = async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Ошибка при загрузке артов:', error);
      } else {
        setArtworks(data || []);
      }

      setLoading(false);
    };

    fetchArtworks();
  }, []);

  const filteredArtworks = artworks.filter((artwork) => {
    if (!search) return true;

    const keyword = search.toLowerCase();
    return (
      artwork.title?.toLowerCase().includes(keyword) ||
      artwork.twitter?.toLowerCase().includes(keyword) ||
      artwork.discord?.toLowerCase().includes(keyword) ||
      artwork.tags?.some((tag) => tag.toLowerCase().includes(keyword))
    );
  });

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  if (loading) {
    return (
      <>
        <HeroHeader search={search} setSearch={setSearch} />
        <Box pt={0} mx="auto" pb={{ base: 8, md: 16 }} px={{ base: 4, md: 8 }}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} height="200px" />
            ))}
          </Masonry>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <HeroHeader search={search} setSearch={setSearch} />
        <Box pt={0} mx="auto" pb={{ base: 8, md: 16 }} px={{ base: 4, md: 8 }}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column">
            {filteredArtworks.map((card, index) => (
              <SnapCard key={index} {...card} setSearch={setSearch} />
            ))}
          </Masonry>
        </Box>
      </>
    );
  }
}
