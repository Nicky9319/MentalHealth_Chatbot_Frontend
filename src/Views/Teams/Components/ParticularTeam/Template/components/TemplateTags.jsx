/* eslint-disable react/prop-types */
const TemplateTag = ({ template, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-2 py-1 rounded transition-colors duration-200 text-sm 
        ${
          isSelected
            ? "bg-gray-300 text-gray-900"
            : "bg-gray-600 text-white hover:bg-gray-500"
        }`}
    >
      {template.label}
    </button>
  );
};

export default TemplateTag;
