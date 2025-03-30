import React from 'react';

const SecurityTest = () => {
  return (
    <div className="bg-white text-gray-800">
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-5 shadow-sm">
            <i className="fas fa-lock mr-2"></i> Security
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-5">
            Manage and monitor your <span className="text-indigo-600">AI workers</span> in one <span className="text-indigo-600">secure</span> place.
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-6">
            We ensure security and compliance, are GDPR-ready, hold a SOC 2 (Type 2) certification, and give you full control over your data storage.
          </p>
          <a href="#" className="text-indigo-600 font-medium hover:underline flex justify-center items-center gap-2">
            Visit our trust center <i className="fas fa-arrow-right"></i>
          </a>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: "fas fa-database",
              title: "No training on your data",
              description: "Your data remains private and is never utilized for model training purposes.",
            },
            {
              icon: "fas fa-certificate",
              title: "SOC 2 (Type II) & GDPR Compliant",
              description: "We are SOC 2 (Type II) certified and GDPR compliant, ensuring top-tier data security and privacy.",
            },
            {
              icon: "fas fa-globe",
              title: "Choose where to store your data",
              description: "Choose between US, EU, and AU data-centers. We also support single-tenant or private cloud deployment.",
            },
            {
              icon: "fas fa-user-shield",
              title: "Role-based access control",
              description: "Fine-grained access controls to manage your team's permissions and data access.",
            },
            {
              icon: "fas fa-lock",
              title: "Secure encryption",
              description: "Robust secure encryption (AES-256) for data at rest and in transit.",
            },
            {
              icon: "fas fa-shield-alt",
              title: "Security first",
              description: "We never store anything we don’t need to. The inputs or outputs of your data are always secure.",
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <i className={`${item.icon} text-indigo-600 text-5xl mb-4`}></i>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityTest;
