import { Routes, Route } from "react-router-dom";
import DeclareData from ".";
import BlockDepartment from "./BlockDepartment/bockDepartment";
import EditDepartment from "./BlockDepartment/edit";
import ClassListWrapper from "./BlockDepartment/ClassListWrapper";
const DeclareDataRoutes = () => {
    return (
        <Routes>
            <Route index element={<DeclareData />} />
            <Route path="/khoa-khoi" element={<BlockDepartment />} />
            <Route path="/khoa-khoi/list" element={<ClassListWrapper />} />
            <Route path="/khoa-khoi/:id" element={<EditDepartment />} />

        </Routes>
    );
};

export default DeclareDataRoutes;
