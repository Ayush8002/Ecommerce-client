// import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "../Wrapper";
import { NavLink } from "react-router-dom";
import mail from "../assets/images/mail.png";

const Footer = () => {
  return (
    <footer className="bg-white text-black pb-3">
      <div className="bg-black h-full">
        <Wrapper>
          <div className="text-white md:flex justify-between items-center grid">
            <div className="flex justify-center items-center">
              <img src={mail} alt="mail" className="h-24" />
              <div className="mx-6">
                <h3 className="text-base sm:text-xl uppercase font-medium">
                  Enter your Email
                </h3>
                <p className="text-xs text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="h-10 flex justify-center items-center md:mb-0 mb-6">
              <input
                type="text"
                className="border-gray-600 border-l-[1px] border-t-[1px] border-b-[1px] outline-none w-full rounded-l-sm h-full px-6 text-md focus:border-gray-400 bg-black"
              />
              <button className="w-48 bg-[#610094] h-full flex justify-center items-center text-white rounded-r-sm text-xs uppercase border-[#610094] border-[1px]">
                email Enter
              </button>
            </div>
          </div>
        </Wrapper>
      </div>
      <Wrapper>
        <div className="my-16 flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
          {/* LEFT START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
            {/* MENU START */}
            <div className="flex flex-col gap-3 shrink-0">
              <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
                Find a store
              </div>
              <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
                become a partner
              </div>
              <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
                sign up for email
              </div>
              <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
                send us feedback
              </div>
              <div className="font-oswald font-medium uppercase text-sm cursor-pointer">
                student discount
              </div>
            </div>
            {/* MENU END */}

            {/* NORMAL MENU START */}
            <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
              {/* MENU START */}
              <div className="flex flex-col gap-3">
                <div className="font-oswald font-medium uppercase text-sm">
                  get help
                </div>
                <div className="text-sm text-black/[0.5] hover:text-black cursor-pointer">
                  Order Status
                </div>
                <div className="text-sm text-black/[0.5] hover:text-black cursor-pointer">
                  Delivery
                </div>
                <div className="text-sm text-black/[0.5] hover:text-black cursor-pointer">
                  Returns
                </div>
                <div className="text-sm text-black/[0.5] hover:text-black cursor-pointer">
                  Payment Options
                </div>
                <div className="text-sm text-black/[0.5] hover:text-black cursor-pointer">
                  Contact Us
                </div>
              </div>
              {/* MENU END */}

              {/* MENU START */}
              <div className="flex flex-col gap-3">
                <div className="font-oswald font-medium uppercase text-sm">
                  About nike
                </div>
                <div className="text-sm text-black/[0.5] hover:text-black cursor-pointer">
                  News
                </div>
                <div className="text-sm text-black/[0.5] hover:text-black cursor-pointer">
                  Careers
                </div>
                <div className="text-sm text-black/[0.5] hover:text-black cursor-pointer">
                  Investors
                </div>
                <div className="text-sm text-black/[0.5] hover:text-black cursor-pointer">
                  Sustainability
                </div>
              </div>
              {/* MENU END */}
            </div>
            {/* NORMAL MENU END */}
          </div>
          {/* LEFT END */}

          {/* RIGHT START */}
          <div className="flex gap-4 justify-center md:justify-start">
            <div
              onClick={() => window.open("https://facebook.com", "_blank")}
              className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-gray-200 cursor-pointer"
            >
              <FaFacebookF size={20} />
            </div>
            <NavLink
              to="https://twitter.com"
              id="RouterNavLink"
              className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-gray-200 cursor-pointer"
            >
              <FaTwitter size={20} />
            </NavLink>
            <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-gray-200 cursor-pointer">
              <FaYoutube size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-gray-200 cursor-pointer">
              <FaInstagram size={20} />
            </div>
          </div>
          {/* RIGHT END */}
        </div>
      </Wrapper>
      <Wrapper>
        <div className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
          {/* LEFT START */}
          <div className="text-[12px] text-black/[0.5] hover:text-black cursor-pointer text-center md:text-left">
            © 2023 Nike, Inc. All Rights Reserved
          </div>
          {/* LEFT END */}

          {/* RIGHT START */}
          <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
            <div className="text-[12px] text-black/[0.5] hover:text-black cursor-pointer">
              Guides
            </div>
            <div className="text-[12px] text-black/[0.5] hover:text-black cursor-pointer">
              Terms of Sale
            </div>
            <div className="text-[12px] text-black/[0.5] hover:text-black cursor-pointer">
              Terms of Use
            </div>
            <div className="text-[12px] text-black/[0.5] hover:text-black cursor-pointer">
              Privacy Policy
            </div>
          </div>
          {/* RIGHT END */}
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
