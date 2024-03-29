import { useState } from "react";
import { Link, Location, useLocation } from "react-router-dom";
import { dashboard, charts, apps } from "../../../data/navbarHeaderData";
import Hamburger from 'hamburger-react'
// import { IconType } from "react-icons";

const AdminSidebar = ({ children }: any) => {
  const navigate = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <div className="m-3 flex absolute z-30">
        <Hamburger size={20} toggled={mobileMenu} toggle={setMobileMenu} />
      </div>
      <div className="flex">
        <aside className={`h-full absolute overflow-y-scroll no-scrollbar bg-white min-w-60 md:min-w-80 md:max-w-80 px-4 border-r-2 z-20 ${mobileMenu ? "translate-x-0" : "translate-x-[-440px]"} transition ease-in-out delay-250`} >
          {/* Dashboard section */}
          <div className="border-b-2 ">
            <h5 className="text-md mt-14 font-semibold text-[#3E3939]">
              Dashboard
            </h5>
            <ul className="my-2">
              <li className="py-1">
                {dashboard?.map((data: any) => {
                  return (
                    <Li
                      url={data.url}
                      text={data.heading}
                      location={navigate}
                      Icon={data.icon}
                      key={data.url}
                    />
                  );
                })}
              </li>
            </ul>
          </div>
          {/* Charts section  */}
          <div className="border-b-2">
            <h5 className="text-md mt-8 font-semibold text-[#3E3939]">
              Charts
            </h5>
            <ul className="my-2">
              <li className="py-1">
                {charts?.map((data: any) => {
                  return (
                    <Li
                      url={data.url}
                      text={data.heading}
                      location={navigate}
                      Icon={data.icon}
                      key={data.url}
                    />
                  );
                })}
              </li>
            </ul>
          </div>
          {/* Apps section */}
          <div>
            <h5 className="text-md mt-8 font-semibold text-[#3E3939]">
              DASHBOARD
            </h5>
            <ul className="my-2">
              <li className="py-1">
                {apps?.map((data: any) => {
                  return (
                    <Li
                      url={data.url}
                      text={data.heading}
                      location={navigate}
                      Icon={data.icon}
                      key={data.url}
                    />
                  );
                })}
              </li>
            </ul>
          </div>
        </aside>
        {children}
      </div>
    </>
  );
};

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: any;
}

const Li = ({ url, text, location, Icon }: LiProps) => (
  <Link
    to={url}
    className={`flex items-center gap-5 py-2 hover:px-4 transition-all ${
      location.pathname === url ? "bg-[#610094] px-4 text-white" : ""
    } rounded-lg`}
  >
    {Icon}
    <p className="text-sm font-medium">{text}</p>
  </Link>
);

export default AdminSidebar;
