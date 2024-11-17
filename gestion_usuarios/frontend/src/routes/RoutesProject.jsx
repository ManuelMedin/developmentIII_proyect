import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Users from "../pages/Users";
import { Toaster } from "react-hot-toast";

const RoutesProject = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/users" />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<Users />} />
            </Routes>
            <Toaster />
        </BrowserRouter>
    )
}

export default RoutesProject;