import { Routes, Route } from "react-router-dom";
import DeclareData from ".";
import BlockDepartment from "./BlockDepartment/bockDepartment";
import EditDepartment from "./BlockDepartment/edit";
import ClassListWrapper from "./BlockDepartment/ClassListWrapper";
const DeclareDataRoutes = () => {
    return (
        <Routes>
            <Route index element={<DeclareData />} />
            <Route path="/block-department" element={<BlockDepartment />} />
            <Route path="/block-department/list" element={<ClassListWrapper />} />
            <Route path="/block-department/:id" element={<EditDepartment />} />

        </Routes>
    );
};

export default DeclareDataRoutes;
