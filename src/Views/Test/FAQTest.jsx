import React, { useState } from 'react';

const FAQTest = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is an AI Workforce?",
      answer: "An AI workforce consists of AI agents designed to perform various tasks that assist teams in automating processes and boosting productivity."
    },
    {
      question: "How do I build an agent?",
      answer: "You can build an agent using Converge AI's intuitive platform, where you can customize and deploy your own AI-powered agents with no coding required."
    },
    {
      question: "What are tools?",
      answer: "Tools are predefined functions or integrations that an AI agent can use to perform specific tasks within its workflow."
    },
    {
      question: "Which LLMs do you support?",
      answer: "We support a wide range of large language models (LLMs) including GPT-3, GPT-4, and other cutting-edge AI models."
    },
    {
      question: "How does Converge AI protect my privacy?",
      answer: "Converge AI takes privacy seriously by implementing industry-standard encryption, data anonymization, and strict access controls to ensure your data is secure."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen px-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-gray-900 text-center">FAQs</h1>
        <p className="text-gray-500 text-center mt-2">
          Can't find the answer here? <a href="#" className="text-blue-600 font-medium hover:underline">Contact our support team.</a>
        </p>
        <div className="mt-10 bg-white shadow-lg rounded-xl mx-auto p-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b last:border-b-0">
              <button
                className="w-full text-left px-6 py-5 text-lg text-gray-900 font-semibold flex justify-between items-center transition-all duration-300"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="text-2xl">{openIndex === index ? "▲" : "▼"}</span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQTest;
