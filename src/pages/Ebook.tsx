import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { EbookContent } from '../components/EbookContent';
import { EbookNavigation } from '../components/EbookNavigation';
import { useEbookNavigation } from '../hooks/useEbookNavigation';

export function Ebook() {
  const { currentSection, nextSection, prevSection, sections, currentIndex } = useEbookNavigation();

  return (
    <div className="min-h-screen bg-dark-purple/30">
      <div className="container mx-auto px-6 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center text-pink-500 hover:text-pink-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              MIA: A Simple, Science-Based Path to More Website Traffic
            </h1>
          </motion.div>

          <div className="mt-12">
            <EbookNavigation sections={sections} currentIndex={currentIndex} />
            
            <div className="mt-8 bg-dark-purple/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
              <EbookContent section={currentSection} />
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={prevSection}
                  disabled={currentIndex === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentIndex === 0
                      ? 'text-white/30 cursor-not-allowed'
                      : 'text-pink-500 hover:text-pink-400'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={nextSection}
                  disabled={currentIndex === sections.length - 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentIndex === sections.length - 1
                      ? 'text-white/30 cursor-not-allowed'
                      : 'text-pink-500 hover:text-pink-400'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}