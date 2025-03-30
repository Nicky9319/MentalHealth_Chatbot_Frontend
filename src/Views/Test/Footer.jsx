import React from 'react';

const Footer = () => {
  return (
    <footer className="py-16 px-10 lg:px-20 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-900">Converge AI</h2>
            <p className="text-gray-600 mt-2">The home of the AI Workforce</p>
            <div className="flex space-x-5 mt-4">
              <a className="text-gray-600 hover:text-gray-800 text-xl" href="#"><i className="fab fa-linkedin"></i></a>
              <a className="text-gray-600 hover:text-gray-800 text-xl" href="#"><i className="fab fa-github"></i></a>
              <a className="text-gray-600 hover:text-gray-800 text-xl" href="#"><i className="fab fa-twitter"></i></a>
              <a className="text-gray-600 hover:text-gray-800 text-xl" href="#"><i className="fab fa-youtube"></i></a>
            </div>
            <p className="text-gray-500 mt-6 text-sm">
              © 2025 OnSearch Pty Ltd T/A Converge AI. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Website by <a className="text-blue-500 hover:underline" href="#">Q AGENCY</a>
            </p>
          </div>

          {/* Footer Links */}
          <div className="col-span-1 lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { title: 'Function', links: ['Sales', 'Marketing', 'Operations', 'Research', 'Support'] },
                { title: 'Product', links: ['AI Agents', 'Agent Teams', 'AI Tools', 'Bosh, the AI Sales Agent', 'Integrations', 'Custom Actions for GPTs'] },
                { title: 'Support', links: ['Documentation', 'API & Python SDK', 'Book demo', 'Enterprise'] },
                { title: 'Learn', links: ['Converge Academy', 'Customers', 'Blog', 'Topics', 'Tools', 'Workflows'] },
                { title: 'Company', links: ['Careers', 'Partners', 'Security'] },
                { title: 'Legal', links: ['Privacy policy', 'Security policy', 'Terms', 'Anthropic DPA', 'OpenAI DPA'] },
              ].map((section, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <a className="text-gray-600 hover:text-gray-800" href="#">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
