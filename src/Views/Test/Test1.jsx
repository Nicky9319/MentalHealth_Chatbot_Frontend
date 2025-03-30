// Test1.js
import React from 'react';
import Test2 from './Test2';
import NavTest from './NavTest';
import CTATest from './CTATest';
import FAQTest from './FAQTest';
import TestimonialCarousel from './TestimonialsTest';
import SecurityTest from './SecurityTest';
import Footer from './Footer';
import HeroSection from './HeroSection';  // Import the HeroSection component

const Test1 = () => {
  return (
    <div className="bg-gray-50">
      <br /> 
      <NavTest />
      <HeroSection /> 
      <Test2 />
      <br />
      <br />
     
      <SecurityTest />
      <TestimonialCarousel />
      <FAQTest />
      {/* <CTATest /> */}
      <Footer />
    </div>
  );
};

export default Test1;
