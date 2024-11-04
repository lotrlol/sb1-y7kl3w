import React, { useState } from 'react';
import { Send, ChevronRight, ChevronLeft, FileText, Wrench, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  message: string;
  blogsPerMonth: number;
  oneTimeSetup: boolean;
  autonomousUpgrade: boolean;
}

export function ContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    blogsPerMonth: 100,
    oneTimeSetup: false,
    autonomousUpgrade: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const calculateMonthlyPrice = () => {
    let total = formData.blogsPerMonth * 5; // €5 per blog
    if (formData.autonomousUpgrade) total += 42; // €500/year ÷ 12 months
    return total;
  };

  const calculateOneTimePrice = () => {
    return formData.oneTimeSetup ? 1440 : 0; // €1,440 one-time setup fee
  };

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...formData,
          monthlyPrice: calculateMonthlyPrice(),
          oneTimePrice: calculateOneTimePrice(),
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          message: '',
          blogsPerMonth: 100,
          oneTimeSetup: false,
          autonomousUpgrade: false,
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  if (submitSuccess) {
    return (
      <section id="contact" className="py-20 bg-dark-purple/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-dark-purple/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Thank You!</h2>
            <p className="text-white/70 mb-8">
              We've received your message and will get back to you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setStep(1);
              }}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-white mb-2">How many blogs do you need per month?</h3>
              <p className="text-white/70">Choose the volume that fits your growth goals</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Blogs per month: {formData.blogsPerMonth}</span>
                <span className="text-pink-500">€{formData.blogsPerMonth * 5}/month</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="50"
                value={formData.blogsPerMonth}
                onChange={(e) => setFormData({ ...formData, blogsPerMonth: parseInt(e.target.value) })}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <div className="flex justify-between text-sm text-white/50">
                <span>50 blogs</span>
                <span>500 blogs</span>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Choose Your Enhancement Services</h3>
              <p className="text-white/70">Select additional services to maximize your results</p>
            </div>
            <div className="space-y-4">
              <div
                onClick={() => setFormData({ ...formData, oneTimeSetup: !formData.oneTimeSetup })}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  formData.oneTimeSetup
                    ? 'bg-pink-600/20 border-pink-500'
                    : 'bg-dark-purple/30 border-white/5'
                } border`}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-pink-500/10 p-2 rounded-lg">
                    <Wrench className="h-5 w-5 text-pink-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">One-Time Setup</h4>
                    <p className="text-sm text-white/70">Expert implementation and optimization</p>
                  </div>
                  <span className="text-white">€1,440</span>
                </div>
              </div>

              <div
                onClick={() => setFormData({ ...formData, autonomousUpgrade: !formData.autonomousUpgrade })}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  formData.autonomousUpgrade
                    ? 'bg-pink-600/20 border-pink-500'
                    : 'bg-dark-purple/30 border-white/5'
                } border`}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-pink-500/10 p-2 rounded-lg">
                    <RefreshCw className="h-5 w-5 text-pink-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Autonomous Upgrade Plan</h4>
                    <p className="text-sm text-white/70">Continuous optimization and support</p>
                  </div>
                  <span className="text-white">€42/mo</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center space-x-2"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Complete Your Information</h3>
              <p className="text-white/70">Tell us about yourself and we'll get started</p>
            </div>
            <div className="bg-dark-purple/30 border border-white/5 p-4 rounded-xl mb-6">
              <h4 className="font-semibold text-white mb-2">Your Package Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">{formData.blogsPerMonth} blogs per month</span>
                  <span className="text-white">€{formData.blogsPerMonth * 5}/mo</span>
                </div>
                {formData.autonomousUpgrade && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Autonomous Upgrade Plan</span>
                    <span className="text-white">€42/mo</span>
                  </div>
                )}
                {formData.oneTimeSetup && (
                  <div className="flex justify-between">
                    <span className="text-white/70">One-Time Setup</span>
                    <span className="text-white">€1,440</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Monthly Total</span>
                    <span className="text-pink-500">€{calculateMonthlyPrice()}/mo</span>
                  </div>
                  {calculateOneTimePrice() > 0 && (
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">One-Time Fee</span>
                      <span className="text-pink-500">€{calculateOneTimePrice()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              data-netlify="true"
              name="contact"
              method="POST"
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="blogsPerMonth" value={formData.blogsPerMonth} />
              <input type="hidden" name="oneTimeSetup" value={formData.oneTimeSetup.toString()} />
              <input type="hidden" name="autonomousUpgrade" value={formData.autonomousUpgrade.toString()} />
              <input type="hidden" name="monthlyPrice" value={calculateMonthlyPrice().toString()} />
              <input type="hidden" name="oneTimePrice" value={calculateOneTimePrice().toString()} />
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                  placeholder="Tell us about your business and goals..."
                ></textarea>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center space-x-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit</span>
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        );
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark-purple/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-dark-purple/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Transform Your Content Strategy?</h2>
            <p className="text-white/70">Let's create a package that perfectly fits your needs</p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((i) => (
                <React.Fragment key={i}>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      step === i ? 'bg-pink-500' : 'bg-white/20'
                    }`}
                  />
                  {i < 3 && (
                    <div className={`w-12 h-0.5 ${
                      step > i ? 'bg-pink-500' : 'bg-white/20'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={step}>
              {renderStep()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}