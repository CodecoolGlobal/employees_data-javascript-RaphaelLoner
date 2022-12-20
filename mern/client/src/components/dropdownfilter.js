
import React, { useEffect, useState } from 'react';

const DropDownFilter = ({ value, setValue, url, field }) => {
    const [group, setGroup] = useState();

    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setGroup(data.map((value) => value[field]).filter((value, index, self) => self.indexOf(value) === index));
            })

    }, [url, field])

    function getOptions(list) {

        const options = list.map((element, index) => { return <option key={index} value={element} >{element}</option> })

        return options;
    }


    return (
        <div className='dropdownfilter'>
            <label htmlFor={field}>Filter by {field}: </label>
            <select className='dropdownselect' name={field} id={field} value={value} onChange={(e) => { setValue(e.target.value) }}>
                <option value="Default">Default</option>
                {group !== undefined && getOptions(group)}
            </select>
        </div>
    )
}
export default DropDownFilter;