import DataTable from "react-data-table-component";
import "styled-components";
import React, { useState, useEffect, useCallback } from "react";
import {
    Button,
    Modal,
    Select,
    TextInput,
    Label,
    Card,
    ButtonGroup,
} from "flowbite-react";
import {
    FirstLetter,
    formatDate,
    formatDateNotHours,
    formatDateNotHoursForm,
    translateGender,
} from "../../../utilities/utilities";
import { data } from "autoprefixer";

export const TableApp = () => {
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("");
    const [ModalAction, setModalAction] = useState("Añadir usuario");
    const [Id, setId] = useState(0);

    const [NameSearch, setNameSearch] = useState("");
    const [StatusSearch, setStatusSearch] = useState("");
    const [GenderSearch, setGenderSearch] = useState("");
    const [birthdateSearchFrom, setBirthdateSearchFrom] = useState("");
    const [birthdateSearchTo, setBirthdateSearchTo] = useState("");
    const [createdAtSearchFrom, setCreatedAtSearchFrom] = useState("");
    const [CreatedAtSearchTo, setCreatedAtSearchTo] = useState("");
    const [UpdatedAtSearchFrom, setUpdatedAtSearchFrom] = useState("");
    const [UpdatedAtSearchTo, setUpdatedAtSearchTo] = useState("");

    const URL = process.env.REACT_APP_API_DOMAIN + "/users";
    console.log(URL);

    const closeModal = useCallback(() => {
        setOpenModal(false);
        setName("");
        setEmail("");
        setId(0);
        setBirthdate("");
        setGender("");
        setPhone("");
        setStatus("active");
        setModalAction("Añadir usuario");
    }, [setOpenModal, setName, setEmail, setId, setModalAction]);

    const fetchData = useCallback(
        async (method = "GET", id = null, data = {}, isSearch = false) => {
            try {
                let requestUrl = URL;

                if (id !== null) {
                    requestUrl = requestUrl + "/" + id;
                }

                let dataSettings = {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                if (method === "POST" || method === "PUT") {
                    dataSettings.body = JSON.stringify(data);
                }

                if (isSearch) {

                    const params = new URLSearchParams(data);
                    requestUrl = requestUrl + "?" + params.toString();
                
                    

                }

                const response = await fetch(requestUrl, dataSettings);

                if (!response.ok) {
                    console.log(response.body);
                    throw new Error(response.headers);
                } else {
                    const dataApi = await response.json();
                    if (method === "GET") {
                        setUsers(dataApi);
                    } else {
                        fetchData();
                        closeModal();
                    }
                }
            } catch (error) {
                console.log(error);
                alert("Debe completar todos los campos");
            }
        },
        [URL, setUsers, closeModal]
    );

    function editUser(id = 0, data) {
        setEmail(data.email);
        setName(data.name);
        setId(data._id);
        setBirthdate(formatDateNotHoursForm(data.birthdate));
        setGender(data.gender);
        setPhone(data.phone);
        setStatus(data.status);
        setOpenModal(true);
        setModalAction("Editar usuario");
    }

    function usersModal(ev) {
        const dataSubmit = {
            name: ev.name.value,
            email: ev.email.value,
            birthdate: new Date(ev.birthdate.value), // ev.birthdate.value,
            gender: ev.gender.value,
            phone: ev.phone.value,
            status: ev.status.value,
        };

        if (Number(ev.idusers.value) !== 0) {
            clearSearch();;
            fetchData("PUT", ev.idusers.value, dataSubmit);
        } else {
            clearSearch();;
            fetchData("POST", null, dataSubmit);
        }
    }

    function deleteUser(id = 0) {
        if (window.confirm("Estas seguro de eliminar el usuario?")) {
            fetchData("DELETE", id);
        }
    }

    useEffect(() => {
        fetchData();
    }, [fetchData, closeModal]);

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Fecha de nacimiento",
            selector: (row) => formatDateNotHours(row.birthdate),
            sortable: true,
        },
        {
            name: "Edad",
            selector: (row) => row.age,
            sortable: true,
        },
        {
            name: "Genero",
            selector: (row) => translateGender(row.gender),
            sortable: true,
        },
        {
            name: "teléfono",
            selector: (row) => row.phone,
        },

        {
            name: "Fecha de creación",
            selector: (row) => formatDate(row.createdAt),
            sortable: true,
        },
        {
            name: "Fecha de actualización",
            selector: (row) => formatDate(row.updatedAt),
            sortable: true,
        },
        {
            name: "Estado",
            selector: (row) => FirstLetter(row.status),
            sortable: true,
        },
        {
            name: "Action",

            cell: (row) => (
                <div>
                    <Button
                        className="w-full"
                        color="success"
                        onClick={() => editUser(row._id, row)}
                    >
                        Editar
                    </Button>
                    <Button
                        className="w-full"
                        color="failure"
                        onClick={() => deleteUser(row._id)}
                    >
                        Eliminar
                    </Button>
                </div>
            ),
        },
    ];

    function searchUsers(ev) {

        const dataSearch = {
            NameSearch: ev.NameSearch.value,
            StatusSearch: ev.StatusSearch.value,
            GenderSearch: ev.GenderSearch.value,
            birthdateSearchFrom: ev.birthdateSearchFrom.value,
            birthdateSearchTo: ev.birthdateSearchTo.value,
            createdAtSearchFrom: ev.createdAtSearchFrom.value,
            createdAtSearchTo: ev.CreatedAtSearchTo.value,
            UpdatedAtSearchFrom: ev.UpdatedAtSearchFrom.value,
            UpdatedAtSearchTo: ev.UpdatedAtSearchTo.value,
        };

        fetchData("GET", null, dataSearch, true);
    }
    function clearSearch() {
        setNameSearch("");
        setStatusSearch("");
        setGenderSearch("");
        setBirthdateSearchFrom("");
        setBirthdateSearchTo("");
        setCreatedAtSearchFrom("");
        setCreatedAtSearchTo("");
        setUpdatedAtSearchFrom("");
        setUpdatedAtSearchTo("");
        fetchData();
    }


    return (
        <>
            <Card className="mb-2 p-4 gap-4 mb-4 w-full flex flex-col justify-center">
                <h1 className="text-3xl font-bold">Buscar usuario</h1>

                <form
                    id="form-search"
                    onSubmit={(ev) => { ev.preventDefault(); searchUsers(ev.target); }}
                    className=""
                >
                    <div className="flex flex-row gap-4 p-4 mb-4  w-full">
                        <div className="w-full md:w-1/3">
                            <h1 className="text font-bold text-1xl">General</h1>
                            <Label htmlFor="NameSearch">Nombre</Label>
                            <TextInput
                                className="mb-4"
                                id="NameSearch"
                                onChange={(ev) => setNameSearch(ev.target.value)}
                                value={NameSearch}
                            />

                            <Label htmlFor="GenderSearch">Genero</Label>
                            <Select
                                id="GenderSearch"
                                className="mb-4"
                                onChange={(ev) => setGenderSearch(ev.target.value)}
                                value={GenderSearch}
                            >
                                <option value="">Todos</option>
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                            </Select>
                            <Label htmlFor="StatusSearch">Estado</Label>
                            <Select
                                id="StatusSearch"
                                className="mb-4"
                                onChange={(ev) => setStatusSearch(ev.target.value)}
                                value={StatusSearch}
                            >
                                <option value="">Todos</option>
                                <option value="active">Activo</option>
                                <option value="inactive">Inactivo</option>
                            </Select>
                        </div>

                        <div className="w-full ">
                            <p className="text text-1xl">Fecha de nacimiento</p>
                            <div className="flex flow-col gap-4 mb-4">
                                <div className="w-full">
                                    <Label htmlFor="birthdateSearchFrom">Desde</Label>
                                    <TextInput
                                        type="date"
                                        id="birthdateSearchFrom"
                                        onChange={(ev) => setBirthdateSearchFrom(ev.target.value)}
                                        value={birthdateSearchFrom}
                                    />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="birthdateSearchTo">Hasta</Label>
                                    <TextInput
                                        type="date"
                                        id="birthdateSearchTo"
                                        onChange={(ev) => setBirthdateSearchTo(ev.target.value)}
                                        value={birthdateSearchTo}
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <p className="text text-1xl">Fecha de creación</p>
                                <div className="flex flow-col gap-4 mb-4">
                                    <div className="w-full">
                                        <Label htmlFor="createdAtSearchFrom">Desde</Label>
                                        <TextInput
                                            type="date"
                                            id="createdAtSearchFrom"
                                            onChange={(ev) => setCreatedAtSearchFrom(ev.target.value)}
                                            value={createdAtSearchFrom}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="CreatedAtSearchTo">Hasta</Label>
                                        <TextInput
                                            type="date"
                                            id="CreatedAtSearchTo"
                                            onChange={(ev) => setCreatedAtSearchTo(ev.target.value)}
                                            value={CreatedAtSearchTo}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <p className="text text-1xl">Fecha de actualización</p>
                                <div className="flex flow-col gap-4 mb-4">
                                    <div className="w-full">
                                        <Label htmlFor="UpdatedAtSearchFrom">Desde</Label>
                                        <TextInput
                                            type="date"
                                            id="UpdatedAtSearchFrom"
                                            onChange={(ev) => setUpdatedAtSearchFrom(ev.target.value)}
                                            value={UpdatedAtSearchFrom}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="UpdatedAtSearchTo">Hasta</Label>
                                        <TextInput
                                            type="date"
                                            id="UpdatedAtSearchTo"
                                            onChange={(ev) => setUpdatedAtSearchTo(ev.target.value)}
                                            value={UpdatedAtSearchTo}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" flex ">
                        <ButtonGroup>
                            <Button type="submit" color="success" form="form-search">
                                Buscar
                            </Button>
                            <Button type="button" onClick={() => clearSearch()}>
                                Limpiar
                            </Button>
                        </ButtonGroup>
                    </div>
                </form>

            </Card>

            <Card className="p-4">
                <h2 className="text font-bold text-3xl">Tabla de usuarios</h2>
                <Button onClick={() => setOpenModal(true)}>Añadir usuario</Button>

                <DataTable
                    columns={columns}
                    data={users}
                    pagination
                    highlightOnHover
                    filtering
                ></DataTable>
            </Card>

            <Modal show={openModal} onClose={() => closeModal()}>
                <form
                    id="form-user"
                    className="flex flex-col gap-4"
                    onSubmit={(ev) => {
                        ev.preventDefault();
                        usersModal(ev.target);
                    }}
                >
                    <Modal.Header>{ModalAction}</Modal.Header>
                    <Modal.Body>
                        <div className="mb-2 block">
                            <label htmlFor="name"> Nombre </label>
                        </div>
                        <TextInput
                            label="Name"
                            id="name"
                            onChange={(ev) => setName(ev.target.value)}
                            value={name}
                        />
                        <div className="mb-2 block">
                            <label htmlFor="email"> Email </label>
                        </div>
                        <TextInput
                            label="Email"
                            id="email"
                            onChange={(ev) => setEmail(ev.target.value)}
                            value={email}
                        />
                        <div className="mb-2 block">
                            <label htmlFor="birthdate"> Fecha de nacimiento </label>
                        </div>
                        <TextInput
                            type="date"
                            className="w-full"
                            onChange={(ev) => setBirthdate(ev.target.value)}
                            value={birthdate}
                            id="birthdate"
                        />
                        <div className="mb-2 block">
                            <label htmlFor="gender"> Genero </label>
                        </div>
                        <Select
                            label="Gender"
                            id="gender"
                            onChange={(ev) => setGender(ev.target.value)}
                            value={gender}
                        >
                            <option value="male">Masculino</option>
                            <option value="female">Femenino</option>
                        </Select>

                        <div className="mb-2 block">
                            <label htmlFor="phone"> Telefono </label>
                        </div>
                        <TextInput
                            label="Phone"
                            id="phone"
                            onChange={(ev) => setPhone(ev.target.value)}
                            value={phone}
                        />
                        <div className="mb-2 block">
                            <label htmlFor="status"> Estado </label>
                        </div>
                        <Select
                            label="Status"
                            id="status"
                            onChange={(ev) => setStatus(ev.target.value)}
                            value={status}
                        >
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                        </Select>
                    </Modal.Body>
                    <Modal.Footer>
                        <input
                            type="hidden"
                            onChange={(ev) => setId(ev.target.value)}
                            value={Id}
                            id="idusers"
                        />
                        <Button type="submit" color="success">
                            Guardar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};
