import React from "react";
import { Link } from "react-router-dom";
import { data } from "../../data/navbarHeaderData";
import { useState } from "react";

interface Props {
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuMobile = ({ setMobileMenu }: Props) => {
  const [tab, setTab] = useState(window.location.pathname);

  const tabHandler = (link: String) => {
    setTab(`${link}`);
    setMobileMenu(false);
  };
  return (
    <ul className="flex flex-col absolute z-40 top-[120px] left-0 w-full bg-[white] border-t text-black ">
      {data?.map((link) => {
        return (
          <li className="py-4 px-5 border-b" key={link.id}>
            <Link
              to={link.url}
              className={`${tab === `${link.url}` && "text-[#610094]"}`}
              onClick={() => tabHandler(`${link.url}`)}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuMobile;
