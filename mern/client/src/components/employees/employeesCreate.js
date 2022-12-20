import React, { useState } from "react";
import { useNavigate } from "react-router";

import '../style.css'
export default function EmployeesCreate() {


    const navigate = useNavigate();
    const [form, setForm] = useState({ firstname: "", middlename: "", lastname: "", position: "", level: "", });





    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newPerson = { ...form };

        await fetch("http://localhost:5000/employees/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ firstname: "", middlename: "", lastname: "", position: "", level: "" });
        navigate("/employees");
    }

    return (
        <div>
            <h3 className="pageHeader">Create New Employee</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstname">Firstname</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={form.firstname}
                        onChange={(e) => updateForm({ firstname: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="middlename">Middlename</label>
                    <input
                        type="text"
                        className="form-control"
                        id="middlename"
                        value={form.middlename}
                        onChange={(e) => updateForm({ middlename: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Lastname</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        value={form.lastname}
                        onChange={(e) => updateForm({ lastname: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.position}
                        onChange={(e) => updateForm({ position: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group selectPosition" >
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionIntern"
                            value="Intern"
                            checked={form.level === "Intern"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionJunior"
                            value="Junior"
                            checked={form.level === "Junior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionSenior"
                            value="Senior"
                            checked={form.level === "Senior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                    </div>

                </div>

                <div className="form-group buttonPosition">
                    <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}