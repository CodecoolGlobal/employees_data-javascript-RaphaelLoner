import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'
const Record = (props) => (

    <tr>
        <td>{props.record.firstname}</td>
        <td>{props.record.middlename}</td>
        <td>{props.record.lastname}</td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
            <button className="btn btn-link" onClick={() => { props.deleteRecord(props.record._id); }}>Delete</button>
        </td>
    </tr>

)

export default function RecordList() {

    const [records, setRecords] = useState([]);
    const [sortBy, setSortBy] = useState('id');

    const [position, setPosition] = useState('Default');
    const [level, setLevel] = useState('Default');

    const [positionGroup, setPositionGroup] = useState();

    useEffect(() => {
        async function getRecords() {

            const response = await fetch(`http://localhost:5000/record/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;

            }
            const records = await response.json();
            const uniqePositions = await records.map((employee) => { return employee.position }).filter(getUniqe);
            setPositionGroup(uniqePositions);
            console.log(uniqePositions)
        }
        getRecords();
    }, [])

    useEffect(() => {
        async function getRecords() {

            const response = await fetch(`http://localhost:5000/record?sort=${sortBy}&level=${level}&position=${position}`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            setRecords(records);
        }
        getRecords();
    }, [records.length, sortBy, level, position]);

    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/${id}`, {
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

    function getOptions(list) {
        const options = list.map((position, index) => { return <option key={index} value={position} >{position}</option> })
        return options;
    }

    function getUniqe(value, index, self) {
        return self.indexOf(value) === index;
    }

    return (
        <div>
            <h3 className='pageHeader'>Record List</h3><span className="sortTitle">{`(sorted by :  ${sortBy})`}</span>
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
                <tbody>{recordList()}</tbody>
            </table>

            <div className='filterEmployees'>
                <label htmlFor="level">Filter by Level: </label>
                <select className='filterSelect' name="level" id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option value="Default">Default</option>
                    <option value="Intern">Intern</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                </select>
            </div>
            <div className='filterEmployees'>
                <label htmlFor="level">Filter by Position: </label>
                <select className='filterSelect' name="position" id="position" value={position} onChange={(e) => { setPosition(e.target.value) }}>
                    <option value="Default">Default</option>
                    {positionGroup !== undefined && getOptions(positionGroup)}
                </select>
            </div>
        </div >
    );
}