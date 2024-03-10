import DataTable from "react-data-table-component"
import 'styled-components';
import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Modal } from "flowbite-react";
import { formatDate } from "../../../utilities/utilities";


export const TableApp = () => {

    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ModalAction, setModalAction] = useState('Añadir usuario');
    const [Id, setId] = useState(0);
    const URL = process.env.REACT_APP_API_DOMAIN + "/users";

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async (method = 'GET', id = null, data = {}) => {

        let requestUrl = URL;

        if (id != null) {

            requestUrl = (requestUrl + "/" + id);
        }
        let dataSettings = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        if (method === "POST" || method === "PUT") {

            dataSettings.body = JSON.stringify(data);
        }



        const response = await fetch(
            requestUrl, dataSettings
        );

        const dataApi = await response.json();

        if (method === "GET") {
            setUsers(dataApi);
        } else {
            fetchData();
            closeModal();
        }

    }

    function editUser(id = 0, data) {
        setEmail(data.email);
        setName(data.name);
        setId(data._id);

        setOpenModal(true);
        setModalAction('Editar usuario');
    }

    function usersModal(ev) {

        const dataSubmit = {
            name: ev.name.value,
            email: ev.email.value
        }
        if (ev.idusers.value != 0) {
            fetchData("PUT", ev.idusers.value, dataSubmit);
        } else {
            if (dataSubmit.name == "" || dataSubmit.email == "") {
                alert("Todos los campos son obligatorios");
            } else {
                fetchData("POST", null, dataSubmit);
            }


        }
    }

    function deleteUser(id = 0) {

        if (window.confirm("Estas seguro de eliminar el usuario?")) {
            fetchData("DELETE", id);
        }
    }

    function closeModal() {
        setOpenModal(false);
        setName('');
        setEmail('');
        setId(0);
        setModalAction('Añadir usuario');
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        }, {
            name: 'Created At',
            selector: row => formatDate(row.createdAt),
            sortable: true,
        },
        {
            name: 'Updated At',
            selector: row => formatDate(row.updatedAt),
            sortable: true,

        },
        {

            name: 'Action',

            cell: row => <ButtonGroup>
                <Button color="success" onClick={() => editUser(row._id, row)}>Editar</Button>
                <Button color="failure" onClick={() => deleteUser(row._id)}>Eliminar</Button>
            </ButtonGroup>,
        }
    ]

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Añadir usuario</Button>
            <DataTable
                columns={columns}
                data={users}
                pagination
                highlightOnHover
                filtering
            ></DataTable>

            <Modal show={openModal} onClose={() => closeModal()}>
                <form id="form-user" onSubmit={ev => {
                    ev.preventDefault();
                    usersModal(ev.target)
                }}>
                    <Modal.Header>{ModalAction}</Modal.Header>
                    <Modal.Body>
                        <div className="mb-2 block">
                            <label htmlFor="name"> Name </label>
                            <input type="text" id="name" onChange={ev => setName(ev.target.value)} value={name} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        <div className="mb-2 block">
                            <label htmlFor="name"> E-mail </label>
                            <input type="text" id="email" onChange={ev => setEmail(ev.target.value)} value={email} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <input type="hidden" onChange={ev => setId(ev.target.value)} value={Id} id="idusers" />
                        <Button type="submit" color="success">Guardar</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
