import { SidebarApp } from "./Sidebar/SidebarApp";
import { TableApp } from "./Table/TableApp";

export default function App() {
  return (



    <div className="flex flex-row ">

      <div className="">
        <SidebarApp />
      </div>

      <div className="flex-1 p-20">
        <TableApp />
      </div>

    </div>






  )
}