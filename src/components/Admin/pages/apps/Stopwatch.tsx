import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hoursInString = hours.toString().padStart(2, "0");
  const minutesInString = minutes.toString().padStart(2, "0");
  const secondsInString = seconds.toString().padStart(2, "0");

  return `${hoursInString}:${minutesInString}:${secondsInString}`;
};

const StopWatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let intervalID: number;
    if (isRunning)
      intervalID = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);

    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning]);
  return (
    <div>
      <AdminSidebar>
        <main className="flex justify-center items-center w-full h-[100vh] transition-all overflow-y-scroll">
          <div className="flex flex-col justify-center items-center gap-4 shadow-md w-96">
            <h1 className="text-2xl font-semibold">Stopwatch</h1>
            <section className="">
              <div className="gap-4">
                <h2 className="text-5xl font-medium ">
                  {formatTime(time)}
                </h2>
                <div className="flex justify-center items-center my-5 gap-4">
                  <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-1 px-2 border border-gray-400 rounded shadow text-sm"
                    onClick={() => setIsRunning((prev) => !prev)}
                  >
                    {isRunning ? "Stop" : "Start"}
                  </button>
                  <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-1 px-2 border border-gray-400 rounded shadow text-sm"
                    onClick={resetHandler}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </AdminSidebar>
    </div>
  );
};

export default StopWatch;
