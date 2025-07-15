'use client';

import Masonry from 'react-masonry-css';
import { Box } from '@chakra-ui/react';
import SnapCard from './SnapCard';
import { useEffect, useState } from 'react';
import HeroHeader from './HeroHeader';

const cards = [
  {
    imageUrl: 'https://i.pinimg.com/736x/1e/34/24/1e3424d58d8535e57c362b9a84e6ed1c.jpg',
    message: 'Foggy bridge',
    tags: ['urban', 'night', 'city'],
    twitter: '@creaiser',
    discord: 'foggy#2345',
    createdAt: '2025-07-08T09:19:27.720767',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/b7/2c/51/b72c5177312a15a54220ed4568b44b5e.jpg',
    message: 'Foggy bridge',
    tags: ['lights', 'dream', 'sunset'],
    twitter: '@fogmaster',
    discord: 'neon#8888',
    createdAt: '2025-06-20T09:19:27.720805',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/df/d7/bc/dfd7bc2ba842b2281c9db02aad1da9ca.jpg',
    message: 'Rainy reflections in Osaka',
    tags: ['neon', 'city', 'fog'],
    twitter: '@neonflare',
    discord: 'rain#5656',
    createdAt: '2025-06-19T09:19:27.720824',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/5b/35/bc/5b35bc26fddfe977886d82a0c5d046c0.jpg',
    message: 'Urban solitude',
    tags: ['sky', 'lights', 'city'],
    twitter: '@sunseeker',
    discord: 'vapor#0001',
    createdAt: '2025-07-04T09:19:27.720838',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/35/40/2e/35402e590756e63346e96a23defc3203.jpg',
    message: 'Rainy reflections in Osaka',
    tags: ['reflections', 'solitude', 'city'],
    twitter: '@dreamwalker',
    discord: 'neon#8888',
    createdAt: '2025-07-12T09:19:27.720850',
  },
  {
    imageUrl: 'https://i.pinimg.com/1200x/53/f6/f9/53f6f9163dab322b962038a1960f416c.jpg',
    message: 'Sunset vibes in Kyoto',
    tags: ['fog', 'dream', 'vaporwave'],
    twitter: '@dreamwalker',
    discord: 'vapor#0001',
    createdAt: '2025-06-20T09:19:27.720863',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/02/cb/f8/02cbf882ded795372798d9d06ac5f9e2.jpg',
    message: 'Neon blur',
    tags: ['japan', 'dream', 'rain'],
    twitter: '@rainartist',
    discord: 'rain#5656',
    createdAt: '2025-07-11T09:19:27.720876',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/37/3c/68/373c68da1bbbe566cc257e920581bb00.jpg',
    message: 'A lonely tree',
    tags: ['sunset', 'night', 'solitude'],
    twitter: '@cityghost',
    discord: 'ghost#4444',
    createdAt: '2025-06-16T09:19:27.720895',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/47/0a/5f/470a5fcb8246ddc920ba9506d27372d7.jpg',
    message: 'A lonely tree',
    tags: ['fog', 'sunset', 'reflections'],
    twitter: '@rainartist',
    discord: 'rain#5656',
    createdAt: '2025-06-23T09:19:27.720906',
  },
  {
    imageUrl: 'https://i.pinimg.com/1200x/b5/e7/68/b5e768a1afe4d9200d8680e74fca88a1.jpg',
    message: 'Skylight horizon',
    tags: ['vaporwave', 'fog', 'solitude'],
    twitter: '@fogmaster',
    discord: 'dream#1234',
    createdAt: '2025-06-27T09:19:27.720914',
  },
  {
    imageUrl: 'https://i.pinimg.com/1200x/ed/cc/19/edcc1910659b0ad1a2cd82fc35e440ea.jpg',
    message: 'Foggy bridge',
    tags: ['fog', 'reflections', 'sunset'],
    twitter: '@blurwave',
    discord: 'blur#1010',
    createdAt: '2025-06-19T09:19:27.720923',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/0a/0d/ba/0a0dba530678868c787fb83a33a91937.jpg',
    message: 'Sunset vibes in Kyoto',
    tags: ['lights', 'reflections', 'city'],
    twitter: '@fogmaster',
    discord: 'sunny#4321',
    createdAt: '2025-06-18T09:19:27.720930',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/97/40/40/974040d40bd9cb2f6190284a910c3e23.jpg',
    message: 'Night drive in LA',
    tags: ['neon', 'urban', 'sky'],
    twitter: '@skywatcher',
    discord: 'rain#5656',
    createdAt: '2025-07-08T09:19:27.720943',
  },
  {
    imageUrl: 'https://i.pinimg.com/1200x/35/94/70/35947054d7a03f523aa4f7145a9230c7.jpg',
    message: 'Skylight horizon',
    tags: ['sky', 'city', 'japan'],
    twitter: '@skywatcher',
    discord: 'blur#1010',
    createdAt: '2025-07-09T09:19:27.720966',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/ae/f2/56/aef256b5362e2f5403f68a33184b4567.jpg',
    message: 'Neon blur',
    tags: ['fog', 'night', 'rain'],
    twitter: '@cityghost',
    discord: 'city#9999',
    createdAt: '2025-07-01T09:19:27.720978',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/4c/c7/c8/4cc7c8077f0cf1efd83a687e677ede8b.jpg',
    message: 'Skylight horizon',
    tags: ['lights', 'japan', 'dream'],
    twitter: '@horizonfade',
    discord: 'city#9999',
    createdAt: '2025-06-16T09:19:27.720990',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/f3/1c/12/f31c127bb4c7fced9c399da902fbb7bd.jpg',
    message: 'Foggy bridge',
    tags: ['japan', 'bridge', 'sky'],
    twitter: '@horizonfade',
    discord: 'vapor#0001',
    createdAt: '2025-06-20T09:19:27.721003',
  },
  {
    imageUrl: 'https://i.pinimg.com/1200x/a2/22/a8/a222a8d2895edcf2972bc4176d1d08e9.jpg',
    message: 'A lonely tree',
    tags: ['bridge', 'sunset', 'dream'],
    twitter: '@fogmaster',
    discord: 'sunny#4321',
    createdAt: '2025-06-17T09:19:27.721016',
  },
  {
    imageUrl: 'https://i.pinimg.com/736x/1e/79/51/1e7951da705acc2ddb65451ddb3dce69.jpg',
    message: 'Night drive in LA',
    tags: ['solitude', 'rain', 'vaporwave'],
    twitter: '@blurwave',
    discord: 'city#9999',
    createdAt: '2025-07-07T09:19:27.721028',
  },
  {
    imageUrl: 'https://i.pinimg.com/1200x/02/71/27/02712743d53f3b3fd872fa1737307986.jpg',
    message: 'Night drive in LA',
    tags: ['bridge', 'urban', 'neon'],
    twitter: '@cityghost',
    discord: 'foggy#2345',
    createdAt: '2025-07-11T09:19:27.721040',
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
    <>
      <HeroHeader />
      <Box pt={0} pb={{ base: 8, md: 16 }} px={{ base: 4, md: 8 }}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column">
          {cards.map((card, index) => (
            <SnapCard key={index} {...card} />
          ))}
        </Masonry>
      </Box>
    </>
  );
}
