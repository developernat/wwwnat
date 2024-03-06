import { Sidebar, } from "flowbite-react";
import { HiTable, } from "react-icons/hi";;


export const SidebarApp = () => {

    return (

        <Sidebar aria-label="Default sidebar" className="h-screen">
            <h1 className="text-center font-bold text-3xl">NatDev</h1>

            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item active href="#" icon={HiTable}>
                        User
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
