import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import '../style.css'
export default function EmployeesEdit() {

    const [form, setForm] = useState({ middlename: "", lastname: "", position: "", level: "", });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        fetch(`http://localhost:5000/employees/${params.id}`)
            .then(res => res.json())
            .then(data => setForm(data))

    }, [params.id]);


    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        // Update Database
        await fetch(`http://localhost:5000/employees/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/employees");
    }

    return (
        <div>
            <h3 className="pageheader">Update Employee</h3>
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
                    <label htmlFor="position">Position: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.position}
                        onChange={(e) => updateForm({ position: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group selectposition">
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

                <div className="form-group buttonposition">
                    <input
                        type="submit"
                        value="Update Employee"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}