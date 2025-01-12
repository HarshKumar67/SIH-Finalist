import React from "react";

const TableComponent = ({ headers, data }) => {
  return (
    <div className="mt-5">
      
      <table className="table-auto border-collapse border border-gray-300 w-full text-white">
        <thead>
          <tr className="bg-[#8b5cf6]">
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 p-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-yellow-400 hover:text-black">
              {headers.map((header, idx) => (
                <td key={idx} className="border border-gray-300 p-2">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
