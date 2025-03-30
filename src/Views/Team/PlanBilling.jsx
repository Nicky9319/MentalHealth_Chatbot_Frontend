import React from "react";
import TeamNav from "./TeamNav";

const PlanBilling = () => {
  return (
    <>
   
    <div className="p-6  font-inter">
      <div c>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold">Team Name</h1>
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-pencil-alt">✎</i>
            </button>
          </div>
          <span className="bg-gray-200 px-3 py-1 rounded-lg text-sm font-medium">
            Free Plan
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow flex flex-col relative">
            <a href="#" className="absolute top-4 right-4 text-blue-500 text-sm">
              View details <i className="fas fa-external-link-alt"></i>
            </a>
            <h2 className="text-lg font-semibold mb-2">Credits</h2>
            <div className="text-gray-500">Credits available</div>
            <div className="text-2xl font-semibold text-gray-700">100</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col relative">
            <a href="#" className="absolute top-4 right-4 text-blue-500 text-sm">
              View details <i className="fas fa-external-link-alt"></i>
            </a>
            <h2 className="text-lg font-semibold mb-2">Payment</h2>
            <button className="bg-green-100 text-green-600 px-4 py-2 rounded-md font-medium">
              Pay by invoice
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col relative">
            <a href="#" className="absolute top-4 right-4 text-blue-500 text-sm">
              View details <i className="fas fa-external-link-alt"></i>
            </a>
            <h2 className="text-lg font-semibold mb-2">Member seats</h2>
            <div className="text-gray-500">Users</div>
            <div className="text-lg font-semibold">1/5</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Credits used</h2>
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">User</span>
              <select className="border px-3 py-2 rounded-md">
                <option>Past 6 months</option>
              </select>
            </div>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="text-left py-2">Items</th>
                <th className="text-left py-2">Credits</th>
                <th className="text-left py-2">Run by</th>
                <th className="text-left py-2">Date/time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-4">
                  No results...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default PlanBilling;
