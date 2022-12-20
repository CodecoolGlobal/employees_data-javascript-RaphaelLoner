import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css'

const Equipment = ({ equipment, deleteRecord }) => (

    <tr>
        <td>{equipment.name}</td>
        <td>{equipment.type}</td>
        <td>{equipment.amount}</td>
        <td>
            <Link className="btn btn-link" to={`/equipment/edit/${equipment._id}`}>Edit</Link> |
            <button className="btn btn-link" onClick={() => { deleteRecord(equipment._id); }}>Delete</button>
        </td>
    </tr>
)

export default function EquipmentList() {

    const [equipment, setEquipment] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:5000/equipment`).then(res => res.json()).then((data => setEquipment(data)));


    }, [equipment.length]);

    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/equipment/delete/${id}`, {
            method: "DELETE"
        });
        const newRecords = equipment.filter((el) => el._id !== id);
        setEquipment(newRecords);
    }

    function equipmentList() {
        return equipment.map((element) => {
            return (
                <Equipment equipment={element} deleteRecord={() => deleteRecord(element._id)} key={element._id} />
            );
        });
    }

    return (
        <div>
            <h3 className='pageheader'>Equipment List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{equipmentList()}</tbody>
            </table>
        </div >
    );
}

