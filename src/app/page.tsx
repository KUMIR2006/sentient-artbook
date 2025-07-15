'use client';

import Masonry from 'react-masonry-css';
import { Box } from '@chakra-ui/react';
import SnapCard from './SnapCard';
import { useEffect, useState } from 'react';

const cards = [
  {
    imageUrl: 'https://pm1.aminoapps.com/6538/0ad43962642def3abd95c195860e261b849c4f1f_hq.jpg',
    message: 'A foggy night in Tokyo',
    tags: ['fog', 'city', 'neon'],
    twitter: '@fogmaster',
    discord: 'foggy#1234',
    createdAt: '2025-07-14T10:00:00Z',
  },
  {
    imageUrl: 'https://pm1.aminoapps.com/6538/49caa759b4ec145270879aae88e5f786e72e17f4_hq.jpg',
    message: 'Rainy reflections in Osaka',
    tags: ['rain', 'reflections', 'lights'],
    twitter: '@rainartist',
    discord: 'rainy#4321',
    createdAt: '2025-07-13T12:00:00Z',
  },
  {
    imageUrl:
      'https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg',
    message: 'Neon blur',
    tags: ['blur', 'vaporwave', 'japan'],
    twitter: '@blurwave',
    discord: 'neon#9999',
    createdAt: '2025-07-12T09:00:00Z',
  },
  {
    imageUrl:
      'https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg',
    message: 'Rainy reflections in Osaka',
    tags: ['rain', 'reflections', 'lights'],
    twitter: '@rainartist',
    discord: 'rainy#4321',
    createdAt: '2025-07-13T12:00:00Z',
  },
  {
    imageUrl:
      'https://i0.wp.com/blog.sunyulster.edu/wp-content/uploads/2019/07/anna-kolosyuk-D5nh6mCW52c-unsplash.jpg?w=2340',
    message: 'Neon blur',
    tags: ['blur', 'vaporwave', 'japan'],
    twitter: '@blurwave',
    discord: 'neon#9999',
    createdAt: '2025-07-12T09:00:00Z',
  },
  {
    imageUrl:
      'https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg',
    message: 'Rainy reflections in Osaka',
    tags: ['rain', 'reflections', 'lights'],
    twitter: '@rainartist',
    discord: 'rainy#4321',
    createdAt: '2025-07-13T12:00:00Z',
  },
  {
    imageUrl:
      'https://i0.wp.com/blog.sunyulster.edu/wp-content/uploads/2019/07/anna-kolosyuk-D5nh6mCW52c-unsplash.jpg?w=2340',
    message: 'Neon blur',
    tags: ['blur', 'vaporwave', 'japan'],
    twitter: '@blurwave',
    discord: 'neon#9999',
    createdAt: '2025-07-12T09:00:00Z',
  },
  {
    imageUrl: 'https://pm1.aminoapps.com/6538/0ad43962642def3abd95c195860e261b849c4f1f_hq.jpg',
    message: 'A foggy night in Tokyo',
    tags: ['fog', 'city', 'neon'],
    twitter: '@fogmaster',
    discord: 'foggy#1234',
    createdAt: '2025-07-14T10:00:00Z',
  },
  {
    imageUrl: 'https://pm1.aminoapps.com/6538/49caa759b4ec145270879aae88e5f786e72e17f4_hq.jpg',
    message: 'Rainy reflections in Osaka',
    tags: ['rain', 'reflections', 'lights'],
    twitter: '@rainartist',
    discord: 'rainy#4321',
    createdAt: '2025-07-13T12:00:00Z',
  },
];

const breakpointColumnsObj = {
  default: 4,
  640: 2,
  400: 1,
};

export default function SnapGallery() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  return (
    <Box px={{ base: 4, md: 8 }} py={{ base: 8, md: 16 }}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column">
        {cards.map((card, index) => (
          <SnapCard key={index} {...card} />
        ))}
      </Masonry>
    </Box>
  );
}
