import React from "react";
import DashboardCard from "../../Components/DashboardCard/DashboardCard";
import { Card } from "react-bootstrap";
import { LineChart } from "@mui/x-charts";
import { FaEdit, FaRegUser } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { FiBox, FiShoppingBag } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { MdAddShoppingCart, MdPendingActions } from "react-icons/md";
import { CiBoxes } from "react-icons/ci";
import { GrCompliance } from "react-icons/gr";
import { TbCurrencyTaka } from "react-icons/tb";

const Dashboard = () => {
  const reportData = useLoaderData();

  if (!reportData) {
    return;
  }

  console.log(reportData);
  return (
    <div className="row g-3">
      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
        <DashboardCard
          title={"Total Brands"}
          icon={<FiShoppingBag />}
          number={reportData.data.total_brand}
        />
      </div>

      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
        <DashboardCard
          title={"Total Categories"}
          icon={<BiCategory />}
          number={reportData.data.total_category}
        />
      </div>

      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
        <DashboardCard
          title={"Total Products"}
          icon={<MdAddShoppingCart />}
          number={reportData.data.total_products}
        />
      </div>

      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
        <DashboardCard
          title={"Total Orders"}
          icon={<CiBoxes />}
          number={reportData.data.total_order}
        />
      </div>

      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
        <DashboardCard
          title={"Completed"}
          icon={<GrCompliance />}
          number={reportData.data.total_completed_order}
        />
      </div>
      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
        <DashboardCard
          title={"Pending Orders"}
          icon={<MdPendingActions />}
          number={reportData.data.total_pending_order}
        />
      </div>

      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
        <DashboardCard
          title={"Total User"}
          icon={<FaRegUser />}
          number={reportData.data.total_user}
        />
      </div>

      <section>
        <div className="row g-2">
          <div className="col-12 col-lg-7">
            <Card className=" m-2 dashboard-chart shadow">
              <Card.Title className="fs-27 p-4 border-bottom">
                Today Sales
              </Card.Title>
              <table class="table table-striped ">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Id</th>
                    <th scope="col">Invoice No</th>
                    <th scope="col">Status</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.data.recent_orders.map((item, index) => (
                    <tr className="text-center">
                      <th scope="row">{index + 1}</th>
                      <td>{item.invoice_no} </td>
                      <td>
                        {item.order_status === 0 && (
                          <span style={{ color: "blue" }}>Pending</span>
                        )}
                        {item.order_status === 1 && (
                          <span style={{ color: "green" }}>Processing</span>
                        )}
                        {item.order_status === 2 && (
                          <span style={{ color: "orange" }}>Shipped</span>
                        )}
                        {item.order_status === 3 && (
                          <span style={{ color: "red" }}>Out of delivery</span>
                        )}
                        {item.order_status === 4 && (
                          <span style={{ color: "purple" }}>Delivered</span>
                        )}
                        {item.order_status === 5 && (
                          <span style={{ color: "brown" }}>Canceled</span>
                        )}
                        {item.order_status === 6 && (
                          <span style={{ color: "gray" }}>Refunded</span>
                        )}
                      </td>

                      <td>
                        {item.total} <TbCurrencyTaka />
                      </td>
                      <td>
                        <FaEdit />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
          <div className="col-12 col-lg-5">
            <Card className="m-2 dashboard-chart shadow">
              <Card.Title className="fs-27 p-4 border-bottom">
                Sales Report
              </Card.Title>
              <LineChart
                series={[
                  { curve: "monotoneX", data: [0, 5, 2, 6, 3, 9.3] },
                  { curve: "monotoneX", data: [6, 3, 7, 9.5, 4, 2] },
                ]}
              />
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
