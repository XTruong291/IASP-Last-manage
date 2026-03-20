import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Student from "../pages/Student";
import Login from "../pages/Login";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<MainLayout />}>
                    {/* các page nằm trong layout */}
                    <Route path="students" element={<Student />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;