import React, { useState } from 'react';

const testimonials = [
  {
    name: 'Jake George',
    role: 'Founder, Synthoria Labs',
    testimonial: "Converge AI is my number 1 favorite automation tool out of all of them. It's super underrated.",
    image: 'https://storage.googleapis.com/a1aa/image/jCIiuIFySnRnWgLaxbRpYe89_DsMUn-fvxyJ90CpDFQ.jpg'
  },
  {
    name: 'Steve Armenti',
    role: 'VP Revenue Marketing, Digital Ocean',
    testimonial: 'Started working with Converge AI for marketing agents to automate workflows. Pretty rad.',
    image: 'https://storage.googleapis.com/a1aa/image/I8WF6nVKdHGCl_wyQPWaR80Y-uLdAJowpHTroUlD4Ww.jpg'
  },
  {
    name: 'Ben Van Sprundel',
    role: 'Ben AI, AI Consultant and Youtuber',
    testimonial: "Why I love Converge AI? Even though it's a no-code platform, the use cases are unlimited and customizable.",
    image: 'https://storage.googleapis.com/a1aa/image/iWFpR5cfRtcyf-ieAf5WfuzgGk2Tb0Xtwi_vGocQpaY.jpg'
  },
  {
    name: 'Sam Rahmanian',
    role: 'Efsure, CRO',
    testimonial: 'I love building with Converge AI and have created powerful production workflows for my team and clients.',
    image: 'https://storage.googleapis.com/a1aa/image/v-xmtDEAB_nfXcjKJZUyoescAHMD-aDBKIdH3YCaR6I.jpg'
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-block bg-white text-blue-600 px-4 py-2 rounded-full shadow-md mb-4">
          <i className="fas fa-star"></i> Testimonials
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Thousands of businesses have already seen
          <span className="text-purple-600"> transformational </span> results
        </h1>
        <p className="text-gray-500 mt-4">
          Join the thousands of other teams empowering their workforce with AI.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto transition-transform duration-500 ease-in-out">
        <p className="text-gray-600 mb-4 italic">{testimonials[currentIndex].testimonial}</p>
        <div className="flex items-center mb-4">
          <img 
            alt={`Portrait of ${testimonials[currentIndex].name}`} 
            className="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow-sm" 
            src={testimonials[currentIndex].image} 
          />
          <div>
            <p className="font-bold text-gray-900">{testimonials[currentIndex].name}</p>
            <p className="text-gray-500 text-sm">{testimonials[currentIndex].role}</p>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button 
            className="bg-gray-200 text-gray-900 px-4 py-2 rounded-full shadow-md hover:bg-gray-300 transition" 
            onClick={prevTestimonial}
            aria-label="Previous Testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="bg-gray-200 text-gray-900 px-4 py-2 rounded-full shadow-md hover:bg-gray-300 transition" 
            onClick={nextTestimonial}
            aria-label="Next Testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 w-2 mx-1 rounded-full transition-all ${
                currentIndex === index ? 'bg-purple-600 w-3' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
