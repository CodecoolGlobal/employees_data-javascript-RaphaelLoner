import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import EquipmentList from "./components/equipment/equipmentList";
import EquipmentCreate from "./components/equipment/euipmentCreate";
import EquipmentEdit from "./components/equipment/equipmentEdit";

const App = () => {

    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<RecordList />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
                <Route path="/equipment" element={<EquipmentList />} />
                <Route path="/equipment/create" element={<EquipmentCreate />} />
                <Route path="/equipment/edit/:id" element={<EquipmentEdit />} />
            </Routes>
        </div>
    );
};

export default App;