// import React from 'react'
import { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupons = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>("");

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return alert("Please Select One At Least");

    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);
  return (
    <div>
      <AdminSidebar>
        <main className="h-full my-4 sm:h-[80vh] w-full transition-all flex flex-col justify-center items-center">
          <section className="w-full sm:w-3/4 shadow-md p-4">
            <h1 className="text-xl my-4">Coupon</h1>
            <form className="flex flex-col gap-3" onSubmit={submitHandler}>
              <div className="flex md:flex-row flex-col gap-3">
                <input
                  type="text"
                  placeholder="Text to include"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  maxLength={size}
                  className="h-10 w-56 p-4 border-[1px] focus:outline-none"
                />

                <input
                  type="number"
                  placeholder="Coupon Length"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  min={8}
                  max={25}
                  className="h-10 w-56 p-4 border-[1px] focus:outline-none"
                />
              </div>

              <fieldset className="">
                <legend className="text-lg my-4">Include</legend>
                <div className="flex sm:flex-row flex-col gap-3">
                  <div className="flex gap-2 justify-start items-center">
                    <input
                      type="checkbox"
                      checked={includeNumbers}
                      onChange={() => setIncludeNumbers((prev) => !prev)}
                    />
                    <span>Numbers</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <input
                      type="checkbox"
                      checked={includeCharacters}
                      onChange={() => setIncludeCharacters((prev) => !prev)}
                    />
                    <span>Characters</span>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <input
                      type="checkbox"
                      checked={includeSymbols}
                      onChange={() => setIncludeSymbols((prev) => !prev)}
                    />
                    <span>Symbols</span>
                  </div>
                </div>
              </fieldset>
              <button
                type="submit"
                className="bg-black text-white p-3 rounded-sm my-4"
              >
                Generate
              </button>
            </form>

            {coupon && (
              <code className="">
                {coupon}{" "}
                <span
                  onClick={() => copyText(coupon)}
                  className="px-4 py-1 cursor-pointer text-white bg-black"
                >
                  {isCopied ? "Copied" : "Copy"}
                </span>{" "}
              </code>
            )}
          </section>
        </main>
      </AdminSidebar>
    </div>
  );
};

export default Coupons;
