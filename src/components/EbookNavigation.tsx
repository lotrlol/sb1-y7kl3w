import React from 'react';
import { Section } from '../hooks/useEbookNavigation';

interface EbookNavigationProps {
  sections: Section[];
  currentIndex: number;
}

export function EbookNavigation({ sections, currentIndex }: EbookNavigationProps) {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-hide">
      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
          <div
            className={`w-3 h-3 rounded-full flex-shrink-0 ${
              index === currentIndex ? 'bg-pink-500' : 'bg-white/20'
            }`}
          />
          {index < sections.length - 1 && (
            <div
              className={`w-12 h-0.5 flex-shrink-0 ${
                index < currentIndex ? 'bg-pink-500' : 'bg-white/20'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}