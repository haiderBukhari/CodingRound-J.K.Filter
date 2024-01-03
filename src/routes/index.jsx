import React from 'react'
import Login from '../pages/login'
import Register from '../pages/register'
import { Routes, Route } from "react-router-dom"

const ReactRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
        </Routes>
    )
}
export default ReactRoutes;