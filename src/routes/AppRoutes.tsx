import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Student from "../pages/Student";
import Login from "../pages/Login";
import Teacher from "../pages/Teacher";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/students" element={<Student />} />
                <Route path="/teachers" element={<Teacher />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;