import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css'
const Equipment = (props) => (

    <tr>
        <td>{props.equipment.name}</td>
        <td>{props.equipment.type}</td>
        <td>{props.equipment.amount}</td>
        <td>
            <Link className="btn btn-link" to={`/equipment/edit/${props.equipment._id}`}>Edit</Link> |
            <button className="btn btn-link" onClick={() => { props.deleteRecord(props.equipment._id); }}>Delete</button>
        </td>
    </tr>
)

export default function EquipmentList() {

    const [equipment, setEquipment] = useState([]);

    useEffect(() => {
        async function getRecords() {

            const response = await fetch(`http://localhost:5000/equipment`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            setEquipment(records);
        }
        getRecords();
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
            <h3 className='pageHeader'>Equipment List</h3>
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