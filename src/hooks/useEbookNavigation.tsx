import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function useEbookNavigation() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: 'Introduction: Why MIA?',
      content: (
        <div className="space-y-4">
          <p>
            Welcome, entrepreneur! You're probably here because you want more visitors on your website 
            but don't see the value in traditional paid ads on platforms like Google or social media. 
            Maybe you've invested in ads before but are unsure if they're worth the cost.
          </p>
          <p>
            Enter MIA: an AI solution designed to create SEO content for your site, with a guaranteed 
            boost in organic growth—no expensive campaigns with uncertain results, no dependency on 
            external platforms, just sustainable growth that strengthens your business.
          </p>
        </div>
      )
    },
    {
      id: 'how-mia-stands-out',
      title: 'How MIA Stands Out Among Other Marketing Solutions',
      content: (
        <div className="space-y-4">
          <p>
            With many marketing agencies, your budget often goes straight to external platforms like 
            Google or Facebook. What they don't always mention is that this method involves significant 
            risk for the entrepreneur: your money is funneled to an outside platform without any 
            guarantee of success—while the marketing firm still takes a cut.
          </p>
          <p>
            MIA works differently. Our success is directly tied to yours. We share the risk because we 
            believe in our approach. Our system is based on scientific research and the "law of large 
            numbers." While people often say "quality over quantity," we explored whether that's always 
            the case. When enough content is produced, will the volume itself lead to success? MIA was 
            born to answer this question.
          </p>
        </div>
      )
    },
    {
      id: 'the-experiment',
      title: 'The Birth of MIA: The Experiment',
      content: (
        <div className="space-y-4">
          <p>
            To test our theory, we conducted a pilot project for an actual company, which we'll call 
            "Company XYZ." The experiment was simple yet challenging: we would create 1,500 blog 
            articles for their website under two basic rules:
          </p>
          <ul>
            <li>Use keywords unrelated to the company's core business.</li>
            <li>Upload the content without making any edits, no matter the outcome.</li>
          </ul>
          <p>
            Within a month, Company XYZ's website traffic skyrocketed by 1700%! The most surprising 
            part? Several keywords, which XYZ's own marketing team would never have considered, turned 
            out to be incredibly effective in attracting visitors.
          </p>
          <p>
            We repeated this experiment with several companies, and each time, we saw similar results: 
            certain unexpected keywords led to a substantial increase in website traffic. This confirmed 
            our hypothesis: more pages with relevant keywords mean more visitors, even if every piece 
            of content isn't "perfectly" aligned with the company's primary focus.
          </p>
        </div>
      )
    },
    {
      id: 'what-mia-can-do',
      title: 'What MIA Can Do for You',
      content: (
        <div className="space-y-6">
          <p>
            MIA doesn't promise hockey-stick graphs or unrealistic growth forecasts, but rather one 
            simple concept: More pages mean more website visitors. And if you like, MIA can handle 
            creating those pages for you—faster and more affordably than any human SEO expert.
          </p>
          <div>
            <h3 className="text-xl font-semibold mb-4">With MIA, you can expect:</h3>
            <ul className="space-y-4">
              <li>
                <strong>Fully Automated SEO Content</strong>
                <p>
                  MIA writes and optimizes SEO articles based on promising keywords, tailored to your 
                  goals and finely tuned to connect with your target audience.
                </p>
              </li>
              <li>
                <strong>A Scalable Solution for Organic Growth</strong>
                <p>
                  MIA makes it easy to generate hundreds of pages per month at the click of a button. 
                  Where traditional copywriters are limited to a few articles per week, MIA can produce 
                  up to 500 pages monthly—all without compromising quality.
                </p>
              </li>
              <li>
                <strong>Guaranteed Website Traffic Growth</strong>
                <p>
                  By increasing the volume of your content, MIA expands your digital footprint and 
                  boosts your visibility. This is made possible by reinforcement learning, where MIA 
                  constantly learns which topics perform best with your audience.
                </p>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'how-mia-works',
      title: 'How MIA Works: Simple and Effective',
      content: (
        <div className="space-y-6">
          <p>MIA operates in three straightforward steps to elevate your content strategy:</p>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Data Collection and Personalization</h3>
              <p>
                MIA begins by getting to know your business and audience through data integration and 
                interviews. This information helps MIA understand and translate your unique brand voice 
                into compelling content.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">2. Automated Content Creation</h3>
              <p>
                MIA generates SEO-optimized articles aligned with high-performing keywords. The AI 
                selects optimal keywords and topics, all tailored to your audience and industry.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                3. Ongoing Optimization through Reinforcement Learning
              </h3>
              <p>
                MIA constantly learns from published content, adjusting future articles based on the 
                highest-performing keywords. This ensures that each article becomes increasingly 
                relevant and better adapted to your audience's needs, fueling steady traffic growth.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'proven-results',
      title: "MIA's Proven Results",
      content: (
        <div className="space-y-6">
          <p>
            Businesses using MIA see an average doubling in website traffic within a few months. Here's 
            what our clients are saying:
          </p>
          <div className="grid gap-4">
            <blockquote className="bg-white/5 p-4 rounded-lg">
              "Since using MIA, we've seen a steady increase in website visits and engagement. The 
              results speak for themselves!"
            </blockquote>
            <blockquote className="bg-white/5 p-4 rounded-lg">
              "MIA has completely automated our content creation process, letting us focus on growing 
              our business instead of content production."
            </blockquote>
            <blockquote className="bg-white/5 p-4 rounded-lg">
              "In just a few months, we've managed to double our organic traffic thanks to MIA. The 
              system's simplicity and the speed at which content is produced are truly impressive."
            </blockquote>
          </div>
        </div>
      )
    },
    {
      id: 'why-choose-mia',
      title: 'Why Choose MIA?',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">More Reach, Lower Cost</h3>
            <p>
              MIA provides an efficient, cost-effective solution for organic growth. Our AI handles 
              content creation at just €5 per blog, compared to the thousands per year you'd spend on 
              traditional copywriters.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Lasting, Sustainable Content</h3>
            <p>
              Every blog MIA produces remains your property. This builds a sustainable content strategy 
              that generates continuous traffic and strengthens your brand without dependence on 
              external platforms.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Guaranteed Growth Strategy</h3>
            <p>
              With MIA, you invest in a growth strategy that strengthens itself over time. Backed by 
              scientific principles and reinforcement learning, MIA continually improves, ensuring your 
              content stays relevant and up-to-date.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors"
            >
              Start Your Journey with MIA
            </Link>
          </div>
        </div>
      )
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSection = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSection = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return {
    currentSection: sections[currentIndex],
    nextSection,
    prevSection,
    sections,
    currentIndex,
  };
}