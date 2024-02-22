import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CommonLayout from "./CommonComponents/CommonLayouts/CommonLayout";
import SignIn from "./CommonComponents/SignIn/SignIn";
import PrivateAdmin from "./Routers/PrivateAdmin";
import MainLayout from "./SideNavigation/MainLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import BrandLayout from "./Pages/Brands/BrandLayout";
import BrandsPages from "./Pages/Brands/BrandsPages";
import AddBrand from "./Pages/Brands/AddBrand";
import BrandEdit from "./Pages/Brands/BrandEdit";
import CategoriesLayout from "./Pages/Catagories/CategoriesLayout";
import CategoryList from "./Pages/Catagories/CategoryList";
import AddCategory from "./Pages/Catagories/AddCategory";
import EditCategory from "./Pages/Catagories/EditCategory";
import VariantGroupLayout from "./Pages/VariantGroupList/VariantGroupLayout";
import VariantGroupList from "./Pages/VariantGroupList/VariantGroupList";
import AddVariantGroup from "./Pages/VariantGroupList/AddVariantGroup";
import EditVariantGroup from "./Pages/VariantGroupList/EditVariantGroup";
import VariantOptionLayout from "./Pages/VariantOption/VariantOptionLayout";
import VariantOptionList from "./Pages/VariantOption/VariantOptionList";
import AddNewOption from "./Pages/VariantOption/AddNewOption";
import ProductLayout from "./Pages/Products/ProductLayout";
import ProductList from "./Pages/Products/ProductList";
import AddProduct from "./Pages/Products/AddProduct";
import NotFoundPage from "./Pages/NotFoundPage";
import OrdersLayout from "./Pages/Orders/OrdersLayout";
import OrderList from "./Pages/Orders/OrderList";
import EditOrder from "./Pages/Orders/EditOrder";
import CouponList from "./Pages/Coupons/CouponList";
import CouponLayout from "./Pages/Coupons/CouponLayout";
import Profile from "./Pages/Profile/Profile";
import ChangePass from "./Pages/Profile/ChangePass";
import AddCoupon from "./Pages/Coupons/AddCoupon";
import CourierList from "./Pages/Courier/CourierList";
import AddCourier from "./Pages/Courier/AddCourier";
import CustomerLayout from "./Pages/Customers/CustomerLayout";
import CustomerList from "./Pages/Customers/CustomerList";
import ProductEdit from "./Pages/Products/ProductEdit";
import WebsiteInfo from "./Pages/WebsiteInfo/WebsiteInfo";
import FaqLayout from "./Pages/FAQ/FaqLayout";
import FaqList from "./Pages/FAQ/FaqList";
import AddFaq from "./Pages/FAQ/AddFaq";
import EditFaq from "./Pages/FAQ/EditFaq";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CommonLayout></CommonLayout>,
      children: [
        {
          path: "",
          element: <SignIn></SignIn>,
        },
      ],
    },
    {
      path: "admin",
      element: (
        <PrivateAdmin>
          <MainLayout></MainLayout>
        </PrivateAdmin>
      ),
      children: [
        {
          path: "",
          loader: () => {
            const token = `Token ${localStorage.getItem("_authToken")}`;
            return fetch(
              "https://shop-backend.privateyebd.com/api/v1/report/admin/info",
              {
                headers: { Authorization: token },
              }
            );
          },
          element: <Dashboard></Dashboard>,
        },

        // Brands section
        {
          path: "brands",
          element: <BrandLayout></BrandLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/inventory/admin/brand/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <BrandsPages></BrandsPages>,
            },
            {
              path: "add-new-brand",
              element: <AddBrand></AddBrand>,
            },
            {
              path: "view-brand/:id",
              element: <BrandEdit></BrandEdit>,
            },
          ],
        },

        {
          path: "categories",
          element: <CategoriesLayout></CategoriesLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/inventory/admin/category/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <CategoryList></CategoryList>,
            },
            {
              path: "add-category",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/inventory/admin/category/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <AddCategory></AddCategory>,
            },
            {
              path: "view-categories/:id",
              element: <EditCategory></EditCategory>,
            },
          ],
        },

        {
          path: "variant-group",
          element: <VariantGroupLayout></VariantGroupLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-group/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <VariantGroupList></VariantGroupList>,
            },
            {
              path: "add-variant-group",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/inventory/admin/category/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <AddVariantGroup></AddVariantGroup>,
            },
            {
              path: "edit-variant-group/:id",
              element: <EditVariantGroup></EditVariantGroup>,
            },
          ],
        },

        {
          path: "variant-option",
          element: <VariantOptionLayout></VariantOptionLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-option/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <VariantOptionList></VariantOptionList>,
            },
            {
              path: "add-variant-option",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-group/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <AddNewOption></AddNewOption>,
            },
            {
              path: "edit-variant-group/:id",
              element: <EditVariantGroup></EditVariantGroup>,
            },
          ],
        },
        //product section
        {
          path: "products",
          element: <ProductLayout></ProductLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/inventory/admin/product/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <ProductList></ProductList>,
            },
            {
              path: "add-product",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-option/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <AddProduct></AddProduct>,
            },
            {
              path: "edit-product/:id",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-option/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <ProductEdit></ProductEdit>,
            },
          ],
        },
        //order section
        {
          path: "orders",
          element: <OrdersLayout></OrdersLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/sales/admin/order",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <OrderList></OrderList>,
            },
            {
              path: "Edit-order/:id",
              element: <EditOrder></EditOrder>,
            },
          ],
        },
        // coupons section
        {
          path: "coupons",
          element: <CouponLayout></CouponLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/sales/admin/coupon/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <CouponList></CouponList>,
            },
            {
              path: "add-coupon",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/auth/admin/user/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <AddCoupon></AddCoupon>,
            },
            {
              path: "edit-variant-group/:id",
              element: <EditVariantGroup></EditVariantGroup>,
            },
          ],
        },

        //courier section

        {
          path: "couriers",
          element: <CouponLayout></CouponLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/sales/admin/courier/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <CourierList></CourierList>,
            },
            {
              path: "add-courier",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/auth/admin/user/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <AddCourier></AddCourier>,
            },
            {
              path: "edit-courier/:id",
              element: <EditVariantGroup></EditVariantGroup>,
            },
          ],
        },

        //customer section

        {
          path: "customer",
          element: <CustomerLayout></CustomerLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/auth/admin/user/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <CustomerList></CustomerList>,
            },
            {
              path: "add-courier",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/auth/admin/user/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <AddCourier></AddCourier>,
            },
            {
              path: "edit-courier/:id",
              element: <EditVariantGroup></EditVariantGroup>,
            },
          ],
        },

        // profile section
        {
          path: "profile",
          loader: () => {
            const token = `Token ${localStorage.getItem("_authToken")}`;
            return fetch(
              "https://shop-backend.privateyebd.com/api/v1/auth/profile/",
              {
                headers: { Authorization: token },
              }
            );
          },
          element: <Profile></Profile>,
        },
        {
          path: "/admin/profile/password-change",
          element: <ChangePass></ChangePass>,
        },
        {
          path: "websiteinfo",
          loader: () => {
            const token = `Token ${localStorage.getItem("_authToken")}`;
            return fetch(
              "https://shop-backend.privateyebd.com/api/v1/utility/admin/global-settings/",
              {
                headers: { Authorization: token },
              }
            );
          },
          element: <WebsiteInfo></WebsiteInfo>,
        },
        {
          path: "*",
          element: <NotFoundPage></NotFoundPage>,
        },
        //faq section
        {
          path: "faq",
          element: <FaqLayout></FaqLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://shop-backend.privateyebd.com/api/v1/utility/admin/faq/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <FaqList></FaqList>,
            },
            {
              path: "add-faq",
              element: <AddFaq></AddFaq>,
            },
            {
              path: "edit-faq/:id",
              element: <EditFaq></EditFaq>,
            },
          ],
        },
        //
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  );
}

export default App;
