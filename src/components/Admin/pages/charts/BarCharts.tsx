import AdminSidebar from "../../components/AdminSidebar";
import { BarChart } from "../../components/Chart";

const BarCharts = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div>
      <AdminSidebar>
        <main className="w-full bg-gray-50 min-h-screen transition-all overflow-y-auto no-scrollbar h-screen main lg:px-28 md:px-18 sm:px-12 px-2">
          <h2 className="text-2xl font-medium my-6">Bar Charts</h2>
          <section className="my-6">
            <div className="bg-white w-full p-6 shadow-md ">
              <BarChart
                data_2={[300, 144, 433, 655, 237, 755, 190]}
                data_1={[200, 444, 343, 556, 778, 455, 990]}
                title_1="Revenue"
                title_2="Transaction"
                bgColor_1="#610094"
                bgColor_2="#3E3636"
              />
              <h2 className="text-lg font-medium mt-10">
                Top Selling Products And Top Customers
              </h2>
            </div>
          </section>
          <section className="my-6">
            <div className="bg-white w-full p-6 shadow-md ">
              <BarChart
                horizontal={true}
                data_2={[
                  300, 144, 433, 655, 237, 755, 190, 432, 345, 234, 645, 942,
                ]}
                data_1={[]}
                title_1="Revenue"
                title_2=""
                bgColor_1="#610094"
                bgColor_2=""
                labels={months}
              />
              <h2 className="text-lg font-medium mt-10">
                Orders Thoughtout This Year
              </h2>
            </div>
          </section>
        </main>
      </AdminSidebar>
    </div>
  );
};

export default BarCharts;
