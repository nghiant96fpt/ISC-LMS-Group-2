import React from "react";
import ListData from "../../../components/ListData"; 

const DeclareData: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center text-black-text mb-6">
        Khai Báo Dữ Liệu
      </h1>
      <ListData /> 
    </div>
  );
};

export default DeclareData;
