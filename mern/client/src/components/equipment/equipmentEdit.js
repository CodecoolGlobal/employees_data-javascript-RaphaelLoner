import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import '../style.css'

export default function EquipmentEdit() {

    const [form, setForm] = useState({
        name: "",
        type: "",
        amount: "",
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        fetch(`http://localhost:5000/equipment/${params.id}`)
            .then(res => res.json())
            .then(data => setForm(data));

    }, [params.id, navigate]);


    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedEquipment = {
            name: form.name,
            type: form.type,
            amount: form.amount,
        };

        // Update Database
        await fetch(`http://localhost:5000/equipment/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedEquipment),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/");
    }

    return (
        <div>
            <h3 className="pageheader">Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input
                        type="text"
                        className="form-control"
                        id="type"
                        value={form.type}
                        onChange={(e) => updateForm({ type: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        value={form.amount}
                        onChange={(e) => updateForm({ amount: e.target.value })}
                        required
                    />
                </div>
                <br />

                <div className="form-group buttonposition">
                    <input
                        type="submit"
                        value="Update Equipment"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}