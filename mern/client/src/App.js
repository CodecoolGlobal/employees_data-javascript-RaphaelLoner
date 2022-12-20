import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";


import Navbar from "./components/navbar";

import EmployeesList from "./components/employees/employeesList";
import EmployeesEdit from "./components/employees/employeesEdit";
import EmployeesCreate from "./components/employees/employeesCreate";

import EquipmentList from "./components/equipment/equipmentList";
import EquipmentCreate from "./components/equipment/equipmentCreate";
import EquipmentEdit from "./components/equipment/equipmentEdit";






const App = () => {

    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/employees" element={<EmployeesList />} />
                <Route path="/employees/edit/:id" element={<EmployeesEdit />} />
                <Route path="/employees/create" element={<EmployeesCreate />} />

                <Route path="/equipment" element={<EquipmentList />} />
                <Route path="/equipment/create" element={<EquipmentCreate />} />
                <Route path="/equipment/edit/:id" element={<EquipmentEdit />} />



            </Routes>
        </div>
    );
};

export default App;