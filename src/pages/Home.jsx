import React, { useEffect } from 'react';
import Hero from '../components/sections/Hero';
import TrustBadges from '../components/sections/TrustBadges';
import FeaturedCategories from '../components/sections/FeaturedCategories';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import PromoBanner from '../components/sections/PromoBanner';
import LocationSection from '../components/sections/LocationSection';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Hero />
      <TrustBadges />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoBanner />
      <LocationSection />
    </main>
  );
}
