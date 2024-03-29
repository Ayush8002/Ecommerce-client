import AdminSidebar from "../../components/AdminSidebar";
import { DoughnutChart, PieChart } from "../../components/Chart";
import { categories } from "../../../../assets/data.json";

const PieCharts = () => {
  return (
    <div>
      <AdminSidebar>
        <main className="w-full bg-gray-50 min-h-screen transition-all overflow-y-auto no-scrollbar h-screen main lg:px-28 md:px-18 sm:px-12 px-2">
          <h2 className="text-2xl font-medium my-6">Pie & Daughnat Charts</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
            <section className="w-full">
              <div className="bg-white w-full p-2 shadow-md ">
                <PieChart
                  labels={["processing", "shipped", "Delivered"]}
                  data={[12, 9, 13]}
                  backgroundColor={["#150050", "#3F0071", "#610094"]}
                  offset={[0, 0, 14]}
                />
                <h3 className="m-5 text-center font-medium">Order Fullfilled Ratio</h3>
              </div>
            </section>
            <section className="">
              <div className="bg-white w-full p-2 shadow-md ">
                <DoughnutChart
                  labels={categories.map((i: any) => i.heading)}
                  data={categories.map((i: any) => i.value)}
                  backgroundColor={["#000000", "#150050", "#3F0071", "#610094"]}
                  legends={false}
                  offset={[0, 0, 0, 25]}
                />
                <h2 className="m-5 text-center font-medium">Product Categories Ratio</h2>
              </div>
            </section>
            <section>
            <div className="bg-white w-full p-2 shadow-md ">
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[40, 20]}
                  backgroundColor={["#150050", "#610094"]}
                  legends={false}
                  offset={[0, 30]}
                  cutout={"48%"}
                />
                <h2 className="m-5 text-center font-medium">Stock Availability</h2>
              </div>
            </section>
            <section>
            <div className="bg-white w-full p-2 shadow-md ">
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[32, 18, 5, 20, 25]}
                  backgroundColor={[
                    "#610094",
                    "#3F0071",
                    "#150050",
                    "#810CA8",
                    "#C147E9",
                  ]}
                  legends={false}
                  offset={[20, 30, 10, 20, 60]}
                />
                <h2 className="m-5 text-center font-medium">Revenue Distribution</h2>
              </div>
            </section>

            <section>
            <div className="bg-white w-full p-2 shadow-md ">
                <PieChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[30, 250, 70]}
                  backgroundColor={[
                    `#2D033B`,
                    `#810CA8`,
                    `#C147E9`,
                  ]}
                  offset={[0, 0, 70]}
                />
                <h2 className="m-5 text-center font-medium">Users Age Group</h2>
              </div>
            </section>

            <section>
            <div className="bg-white w-full p-2 shadow-md ">
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[40, 250]}
                  backgroundColor={[`#610094`, "#150050"]}
                  offset={[0, 50]}
                />
                 <h2 className="m-5 text-center font-medium">Users Age Group</h2>
              </div>
            </section>
          </div>
        </main>
      </AdminSidebar>
    </div>
  );
};

export default PieCharts;
