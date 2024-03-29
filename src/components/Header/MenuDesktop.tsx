import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../../data/navbarHeaderData";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MenuDesktop = () => {
  const location = useLocation();
  const [tab, setTab] = useState(location.pathname);
  const { user } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    setTab(location.pathname);
  }, [location]);

  return (
    <div className="hidden md:flex items-center bg-[#181818] h-12 text-white text-xs z-50">
      <div className="lg:px-28 md:px-18 sm:px-12 px-2 h-full flex items-center">
        <ul className="flex items-center h-full">
          {data.map((link) => {
            return (
              <div key={link.id} className="cursor-pointer h-full">
                <li
                  className={`${
                    tab === `${link.url}` && "bg-[#610094]"
                  } h-full flex items-center`}
                  onClick={() => setTab(`${link.url}`)}
                >
                  <Link to={link.url} className="px-3 sm:px-8 lg:px-12 p-3">
                    {link.name}
                  </Link>
                </li>
              </div>
            );
          })}
          {user?.role === "admin" && (
            <div className="cursor-pointer h-full">
              <li
                className={`${
                  tab === "/admin/dashboard" && "bg-[#610094]"
                } h-full flex items-center`}
                onClick={() => setTab("/admin/dashboard")}
              >
                <Link to={"/admin/dashboard"} className="px-3 sm:px-8 lg:px-12 p-3">
                  Dashboard
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MenuDesktop;
