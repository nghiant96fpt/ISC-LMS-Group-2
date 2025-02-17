import { Routes, Route } from "react-router-dom";
import DeclareData from ".";
import BlockDepartment from "./BlockDepartment/bockDepartment";

const DeclareDataRoutes = () => {
    return (
        <Routes>
            <Route index element={<DeclareData />} />
            <Route path="khoa-khoi" element={<BlockDepartment />} />
        </Routes>
    );
};

export default DeclareDataRoutes;
