import { useRef, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import head from "../../../../assets/images/Head.png";
import tail from "../../../../assets/images/Tail.png";
import sound from "../../../../assets/audio/coin-flip.mp3"

const Toss = () => {
  const [angle, setAngle] = useState<number>(0);
  const [Head, setHead] = useState<boolean>(true);
  const initialRef: any = null;
  const audioRef2 = useRef(initialRef);
  

  const flipCoin = () => {
    audioRef2.current.play();
    setAngle((prev: any) => prev + 360);
    setHead(Math.random() > 0.5);
  };

  return (
    <div>
      <AdminSidebar>
        <main className="flex flex-col justify-center items-center h-[70vh] w-full">
          <h1 className="text-2xl font-semibold">Toss</h1>
          <section className="">
            <article
              className={`m-12 h-72 w-72 relative cursor-pointer`}
              onClick={flipCoin}
              style={{
                transform: `rotateY(${angle}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <audio ref={audioRef2}>
                <source src={sound} type="audio/mpeg" />
                <p>Your browser does not support the audio element.</p>
              </audio>
              {Head ? (
                <img className="w-full h-full" src={head} alt="head" />
              ) : (
                <img className="w-full h-full" src={tail} alt="tail" />
              )}
            </article>
          </section>
        </main>
      </AdminSidebar>
    </div>
  );
};

export default Toss;
