
import React, { useEffect, useState } from 'react';

const DropDown = ({ value, setValue, field }) => {
    const [positionGroup, setPositionGroup] = useState();

    useEffect(() => {
        async function getOptions() {

            const response = await fetch(`http://localhost:5000/record/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            const uniqueFields = await records.map((employee) => { return employee[field] }).filter((value, index, self) => self.indexOf(value) === index);
            setPositionGroup(uniqueFields);
        }
        getOptions();
    }, [field])

    function getOptions(list) {
        const options = list.map((position, index) => { return <option key={index} value={position} >{position}</option> })
        return options;
    }


    return (
        <div className='filterEmployees'>
            <label htmlFor="level">Filter by Position: </label>
            <select className='filterSelect' name="position" id="position" value={value} onChange={(e) => { setValue(e.target.value) }}>
                <option value="Default">Default</option>
                {positionGroup !== undefined && getOptions(positionGroup)}
            </select>
        </div>
    )
}
export default DropDown;