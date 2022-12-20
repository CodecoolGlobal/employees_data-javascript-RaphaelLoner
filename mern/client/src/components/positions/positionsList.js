
import React, { useEffect, useState } from "react";


const Row = ({ position }) => {

    return (
        <tr>
            <td>{position.name}</td>
            <td>{position.salary}</td>
            <td>{position.overbudget}</td>
        </tr>
    )
}


const PositionList = () => {

    const [list, setList] = useState();


    useEffect(() => {

        fetch('http://localhost:5000/positions').then(res => res.json()).then(data => setList(data))

    }, [])


    const renderList = (list) => {
        return list.map((value, index) => <Row key={index} position={value} />)
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>overbudget</th>
                </tr>
            </thead>
            <tbody>
                {list !== undefined && renderList(list)}
            </tbody>
        </table>

    )
}

export default PositionList;