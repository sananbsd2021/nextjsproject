import LeftSidebarPage from "./components/LeftSidebar";
import RightContentAreaPage from "./components/RightContentArea";
import RightSidebarPage from "./components/RightSidebar";

export default async function Home() {

  return (
    <>

      <div className="min-h-screen flex flex-col md:flex-row required:xl">
        {/* ส่วนซ้าย */}
        <div className="w-full md:w-1/4 p-4">
          <LeftSidebarPage />
        </div>

        {/* ส่วนกลาง */}
        <div className="w-full md:w-3/4 p-4">
          <RightContentAreaPage />
        </div>

        {/* ส่วนขวา */}
        <div className="w-full md:w-1/4 p-4">
          <RightSidebarPage />
        </div>
      </div>


    </>
    
  );
}