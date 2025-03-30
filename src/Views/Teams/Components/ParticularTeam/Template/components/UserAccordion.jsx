/* eslint-disable react/prop-types */
import { useState } from "react";
import TemplateTag from "./TemplateTags";

const UserAccordion = ({ user, selectedTemplates, onTemplateSelect }) => {
  // Manage local accordion open/close state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4  rounded-lg">
      {/* Accordion Header */}
      <div
        className="bg-gray-700 rounded-lg p-2 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-semibold">{user.name}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-2 flex flex-wrap gap-2">
          {user.templates.map((template) => (
            <TemplateTag
              key={template.id}
              template={template}
              isSelected={selectedTemplates.includes(template.id)}
              onClick={() => onTemplateSelect(user.id, template.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAccordion;
