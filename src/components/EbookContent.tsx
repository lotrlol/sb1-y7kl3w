import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../hooks/useEbookNavigation';

interface EbookContentProps {
  section: Section;
}

export function EbookContent({ section }: EbookContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={section.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="prose prose-invert max-w-none
          prose-headings:text-white
          prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-8
          prose-h3:text-xl prose-h3:font-semibold prose-h3:text-pink-400 prose-h3:mt-8
          prose-p:text-white prose-p:leading-relaxed prose-p:mb-4
          prose-ul:text-white prose-ul:my-6
          prose-li:text-white prose-li:my-2
          prose-strong:text-white prose-strong:font-semibold
          prose-blockquote:border-l-4 prose-blockquote:border-pink-500/50 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white
          prose-a:text-pink-400 prose-a:no-underline hover:prose-a:text-pink-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-white">{section.title}</h2>
        <div className="bg-white/5 rounded-xl p-6 text-white">
          <div className="[&_p]:text-white [&_ul]:text-white [&_li]:text-white [&_blockquote]:text-white">
            {section.content}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}