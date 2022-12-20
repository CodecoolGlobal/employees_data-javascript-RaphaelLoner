import DropDownFilter from '../dropdownfilter';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css'

const Record = ({ record, deleteRecord }) => (

    <tr>
        <td>{record.firstname}</td>
        <td>{record.middlename}</td>
        <td>{record.lastname}</td>
        <td>{record.position}</td>
        <td>{record.level}</td>
        <td>
            <Link className="btn btn-link" to={`/employees/edit/${record._id}`}>Edit</Link> |
            <button className="btn btn-link" onClick={() => { deleteRecord(record._id); }}>Delete</button>
        </td>
    </tr>

)

export default function EmployeesList() {

    const [records, setRecords] = useState([]);
    const [sortBy, setSortBy] = useState('experience');
    const [position, setPosition] = useState('Default');
    const [level, setLevel] = useState('Default');


    useEffect(() => {

        fetch(`http://localhost:5000/employees?sort=${sortBy}&level=${level}&position=${position}`)
            .then((res) => res.json())
            .then(data => setRecords(data));


    }, [records.length, sortBy, level, position]);


    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/employees/delete/${id}`, {
            method: "DELETE"
        });
        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    function recordList() {
        return records.map((record) => {
            return (
                <Record record={record} deleteRecord={() => deleteRecord(record._id)} key={record._id} />
            );
        });
    }

    return (
        <div>
            <h3 className='pageheader'>Employees List</h3><span className="sorttitle">{`(sorted by :  ${sortBy})`}</span>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th >Firstname <button className='btn' onClick={() => setSortBy('firstname')}>↓</button></th>
                        <th>Middlename <button className='btn' onClick={() => setSortBy('middlename')}>↓</button></th>
                        <th>Lastname  <button className='btn' onClick={() => setSortBy('lastname')}>↓</button></th>
                        <th >Position  <button className='btn' onClick={() => setSortBy('position')}>↓</button></th>
                        <th>Level  <button className='btn' onClick={() => setSortBy('level')}>↓</button></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{records !== undefined && recordList()}</tbody>
            </table>
            <DropDownFilter field="level" value={level} setValue={setLevel} url={"http://localhost:5000/fieldlist?field=level&collection=employees"} />
            <DropDownFilter field="position" value={position} setValue={setPosition} url={"http://localhost:5000/fieldlist?field=position&collection=employees"} />
        </div >
    );
}