import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Label, Modal, TextInput } from "flowbite-react";
import { React, useState } from "react";





export const TableApp = () => {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');

    function onCloseModal() {
        setOpenModal(false);
        setEmail('');
    }

    function clickData(data) {
        console.log(data);
        setOpenModal(true);
        setEmail(data.name);
    }

    const [datas, setDatas] = useState([
        {
            "id": 1,
            "name": "Apple MacBook Pro 13\"",
            "color": "Space Gray",
            "category": "Laptop",
            "price": "$1299"
        },
        {
            "id": 2,
            "name": "Apple MacBook Pro 15\"",
            "color": "Silver",
            "category": "Laptop",
            "price": "$1999"
        },
        {
            "id": 3,
            "name": "Apple MacBook Air 13\"",
            "color": "Gold",
            "category": "Laptop",
            "price": "$999"
        },
        {
            "id": 4,
            "name": "Dell XPS 15\"",
            "color": "Black",
            "category": "Laptop",
            "price": "$1799"
        },
        {
            "id": 5,
            "name": "HP Spectre x360 13\"",
            "color": "Dark Ash Silver",
            "category": "Laptop",
            "price": "$1199"
        },
        {
            "id": 6,
            "name": "Microsoft Surface Laptop 3 15\"",
            "color": "Platinum",
            "category": "Laptop",
            "price": "$1499"
        },
        {
            "id": 7,
            "name": "Lenovo ThinkPad X1 Carbon 7th Gen",
            "color": "Black",
            "category": "Laptop",
            "price": "$1499"
        },
        {
            "id": 8,
            "name": "Asus ZenBook 14\"",
            "color": "Royal Blue",
            "category": "Laptop",
            "price": "$899"
        },
        {
            "id": 9,
            "name": "Acer Swift 5",
            "color": "Charcoal Blue",
            "category": "Laptop",
            "price": "$999"
        },
        {
            "id": 10,
            "name": "Razer Blade Stealth 13\"",
            "color": "Mercury White",
            "category": "Laptop",
            "price": "$1399"
        },
        {
            "id": 11,
            "name": "LG Gram 17\"",
            "color": "Dark Silver",
            "category": "Laptop",
            "price": "$1499"
        },
        {
            "id": 12,
            "name": "Samsung Galaxy Book Flex 15\"",
            "color": "Royal Blue",
            "category": "Laptop",
            "price": "$1299"
        }
    ]

    );

    return (
        <>
            <Table hoverable striped className="">
                <TableHead>
                    <TableHeadCell className="p-4">
                        <Checkbox />
                    </TableHeadCell>
                    <TableHeadCell>Product name</TableHeadCell>
                    <TableHeadCell>Color</TableHeadCell>
                    <TableHeadCell>Category</TableHeadCell>
                    <TableHeadCell>Price</TableHeadCell>
                    <TableHeadCell>
                        <span className="sr-only">Edit</span>
                    </TableHeadCell>
                </TableHead>

                <TableBody className="divide-y">


                    {datas.map((data) => (
                        <TableRow key={data.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell className="p-4">
                                <Checkbox />
                            </TableCell>
                            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {data.name}
                            </TableCell>
                            <TableCell>{data.color}</TableCell>
                            <TableCell>{data.category}</TableCell>
                            <TableCell>{data.price}</TableCell>
                            <TableCell>
                                <Button onClick={() => clickData(data)} >
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}





                </TableBody>
            </Table>


{/* Modal */}

       
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Your email" />
                            </div>
                            <TextInput
                                id="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Your password" />
                            </div>
                            <TextInput id="password" type="password" required />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                                Lost Password?
                            </a>
                        </div>
                        <div className="w-full">
                            <Button>Log in to your account</Button>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?&nbsp;
                            <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                                Create account
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>



        </>)
}
