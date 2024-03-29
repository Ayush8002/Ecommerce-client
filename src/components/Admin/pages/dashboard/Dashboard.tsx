import { BsSearch } from "react-icons/bs";
import AdminSidebar from "../../components/AdminSidebar";
import { GoBell, GoPerson } from "react-icons/go";
import { IoTrendingDown, IoTrendingUp } from "react-icons/io5";
import { BarChart, DoughnutChart } from "../../components/Chart";
import { BiFemale, BiMale } from "react-icons/bi";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { CustomError } from "../../../../types/api_types";
import toast from "react-hot-toast";
import { useStatsQuery } from "../../../../redux/api/dashboardAPI";
import { Loading } from "../../../Loading/Loading";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useStatsQuery(user?._id!);

  const stats = data?.stats!;

  console.log(stats);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="">
      <AdminSidebar>
        <main className="w-full bg-gray-50 h-[100vh] transition-all overflow-y-scroll  main lg:px-28 md:px-18 sm:px-12 px-2 no-scrollbar">
          {/* top search section  */}
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="my-4 flex items-center justify-between gap-6 border-b-2 border-gray-400 py-3">
                <BsSearch />
                <input
                  type="text"
                  placeholder="search"
                  className="peer w-full outline-none"
                />
                <div className="flex justify-center items-center gap-6">
                  <GoBell />
                  <GoPerson />
                </div>
              </div>
              {/* 4 Bar section */}
              <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                <WidgetItem
                  heading={"Revenue"}
                  value={stats?.count?.revenue}
                  persent={stats?.changePercent?.revenue}
                  color={"#610094"}
                />
                <WidgetItem
                  heading={"Product"}
                  value={stats?.count?.product}
                  persent={stats?.changePercent?.product}
                  color={"#610094"}
                />
                <WidgetItem
                  heading={"Orders"}
                  value={stats?.count?.order}
                  persent={stats?.changePercent?.order}
                  color={"#610094"}
                />
                <WidgetItem
                  heading={"user"}
                  value={stats?.count?.user}
                  persent={stats?.changePercent?.user}
                  color={"#610094"}
                />
              </section>
              {/* secound section revenue and transaction  */}
              <section className="my-6">
                <div className="bg-white w-full p-6 shadow-md ">
                  <h2 className="text-lg font-medium mb-6">
                    Revenue & Transactions
                  </h2>
                  <BarChart
                    data_2={[300, 144, 433, 655, 237, 755, 190]}
                    data_1={[200, 444, 343, 556, 778, 455, 990]}
                    title_1="Revenue"
                    title_2="Transaction"
                    bgColor_1="#610094"
                    bgColor_2="#150050"
                  />
                </div>
              </section>
              {/* third section Inventory  */}
              <section className="w-full bg-white shadow-md p-6">
                <h2 className="text-lg font-medium pb-2">Inventory</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                  {stats?.categoryCount.map((curElem) => {
                    const [heading, value] = Object.entries(curElem)[0];
                    return (
                      <CategoryItem
                        value={value}
                        color={"#610094"}
                        heading={heading}
                        key={heading}
                      />
                    );
                  })}
                </div>
              </section>
              <section className="flex gap-2 my-2 justify-between">
                <div className="shadow-lg w-full max-w-52 h-full relative px-4">
                  <h2 className="text-lg font-medium py-4">Gender ratio</h2>
                  <DoughnutChart
                    labels={["Female", "Male"]}
                    data={[80, 60]}
                    backgroundColor={["#150050", "#610094"]}
                    cutout={50}
                  />
                  <p
                    style={{ transform: "translate(-50%, -50%)" }}
                    className="absolute top-[60%] left-[50%]"
                  >
                    <div className="flex gap-0">
                      <BiMale className="text-[#610094] text-5xl" />
                      <BiFemale className="text-[#150050] text-5xl" />
                    </div>
                  </p>
                </div>
              </section>
            </>
          )}
        </main>
      </AdminSidebar>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  persent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  persent,
  color,
  amount,
}: WidgetItemProps) => {
  return (
    <article className="border-1 rounded h-32 w-full shadow-md p-4 flex justify-between items-center">
      <div>
        <h5 className="text-base w-32 font-medium capitalize">{heading}</h5>
        <h4 className="text-sm">{amount ? `${value}` : value}</h4>
        {persent > 0 ? (
          <span className="text-green-700 flex items-center font-bold">
            <IoTrendingUp />+{`${persent > 10000 ? 9999 : persent}%`}
          </span>
        ) : (
          <span className="text-red-600 flex items-center font-bold">
            <IoTrendingDown />
            {`${persent < -10000 ? -9999 : persent}%`}
          </span>
        )}
      </div>

      <div
        className="relative h-24 w-24 rounded-full grid place-items-center bg-green-700 shadow-inner before:absolute before:content-[''] before:h-20 before:w-20 before:bg-white before:rounded-full before:shadow-md"
        style={{
          background: `conic-gradient(${color} ${
            (Math.abs(persent) / 100) * 360
          }deg,rgb(255,255,255) 0) `,
        }}
      >
        <span className={`relative font-bold text-xs`}>
          <p style={{ color: `${color}` }}>
            {persent < 0 && `${persent > 10000 ? 9999 : persent}%`}
            {persent > 0 && `${persent < -10000 ? -9999 : persent}%`}
            {persent == 0 && `${persent}%`}
          </p>
        </span>
      </div>
    </article>
  );
};

interface categoryProps {
  color: string;
  value: number;
  heading: string | number;
}

const CategoryItem = ({ color, value, heading }: categoryProps) => {
  return (
    <div className="w-full border-1 rounded py-2 flex justify-between items-center">
      <h5 className="text-sm w-32 font-medium capitalize">{heading}</h5>
      <div className="h-1 bg-gray-200 w-full mx-4 rounded">
        <div
          className="h-1 rounded"
          style={{ backgroundColor: color, width: `${value}%` }}
        />
      </div>
      <span className="text-sm">{value}</span>
    </div>
  );
};

export default Dashboard;
