import React from 'react';
import { attractions } from '../../data/attractions';
import type { Attraction } from '../../types';

const categoryColors: Record<Attraction['category'], string> = {
  ride: 'bg-sky-main text-white',
  show: 'bg-accent-orange text-white',
  experience: 'bg-navy-main text-white',
};

const categoryLabel: Record<Attraction['category'], string> = {
  ride: 'Ride',
  show: 'Show',
  experience: 'Experience',
};

const AttractionCard = ({ attraction }: { attraction: Attraction }) => (
  <div className="card-base flex flex-col overflow-hidden !p-0 group ">
    {/* Image placeholder */}
    <div className="relative h-52 bg-gradient-to-br from-sky-light via-sky-main to-sky-dark flex items-center justify-center overflow-hidden">
      <span className="text-white/40 text-6xl font-display font-bold select-none group-hover:scale-110 transition-transform duration-500">
        {attraction.name.charAt(0)}
      </span>
      {/* Category badge */}
      <span
        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
          categoryColors[attraction.category]
        }`}
      >
        {categoryLabel[attraction.category]}
      </span>
      {attraction.featured && (
        <span className="badge-featured absolute top-3 right-3 text-xs">
          Featured
        </span>
      )}
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-6">
      <h3 className="font-display font-bold text-navy-dark text-xl mb-2 leading-snug">
        {attraction.name}
      </h3>
      <p className="text-navy-main/70 text-sm leading-relaxed flex-1 mb-4">
        {attraction.description}
      </p>

      <div className="flex items-center gap-3 text-xs text-navy-main/60 mb-5">
        {/* Duration */}
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
          </svg>
          {attraction.duration}
        </span>
        {/* Age */}
        {attraction.ageRequirement && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {attraction.ageRequirement}+ yrs
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="price-tag">
          ₱{attraction.price.toFixed(2)}
        </span>
        <a
          href="#book"
          className="px-5 py-2 rounded-lg bg-sky-main text-white text-sm font-semibold hover:bg-sky-dark transition-colors duration-200"
        >
          Book Now
        </a>
      </div>
    </div>
  </div>
);

const BestOfBlueSky = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sky-main font-semibold uppercase tracking-widest text-sm mb-2">
            Highlights
          </p>
          <h2 className="section-title">
            The Best of <span className="text-gradient">Blue Sky</span>
          </h2>
          <p className="section-subtitle">
            Discover world-class rides, immersive experiences, and unforgettable
            adventures waiting for you inside Blue Sky Themed Park.
          </p>
          {/* Accent divider */}
          <div className="mx-auto w-16 h-1 rounded-full bg-accent-orange" />
        </div>

        {/* Cards grid */}
        <div className="grid-cards">
          {attractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#attractions"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            View All Attractions
          </a>
        </div>
      </div>
    </section>
  );
};

export default BestOfBlueSky;