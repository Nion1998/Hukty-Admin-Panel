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
import ReasonLayout from "./Pages/Reason/ReasonLayout";
import ReasonList from "./Pages/Reason/ReasonList";
import AddReason from "./Pages/Reason/AddReason";
import EditReason from "./Pages/Reason/EditReason";
import BlogLayout from "./Pages/Blog/BlogLayout";
import BlogList from "./Pages/Blog/BlogList";
import AddBlog from "./Pages/Blog/AddBlog";
import EditBlog from "./Pages/Blog/EditBlog";
import PageLayout from "./Pages/WebPages/PageLayout";
import PageList from "./Pages/WebPages/PageList";
import AddPage from "./Pages/WebPages/AddPage";
import EditPage from "./Pages/WebPages/EditPage";
import EditCoupon from "./Pages/Coupons/EditCoupon";
import EditCourier from "./Pages/Courier/EditCourier";
import AddUser from "./Pages/Customers/AddUser";
import VariantOptionEdit from "./Pages/VariantOption/VariantOptionEdit";
import EditUser from "./Pages/Customers/EditUser";
import BannerLayout from "./Pages/Banner/BannerLayout";
import BannerList from "./Pages/Banner/BannerList";
import BannerAdd from "./Pages/Banner/BannerAdd";
import BannerEdit from "./Pages/Banner/BannerEdit";

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
              "https://hukty-backend.bbclients.xyz/api/v1/report/admin/info",
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
                  "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/brand/",
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
                  "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/category/",
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
                  "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/category/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <AddCategory></AddCategory>,
            },
            {
              path: "view-categories/:id",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/category/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
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
                  "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-group/",
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
                  "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/category/",
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
                  "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-option/",
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
                  "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-group/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <AddNewOption></AddNewOption>,
            },
            {
              path: "edit-variant-option/:id",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-group/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <VariantOptionEdit></VariantOptionEdit>,
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
                  "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/product/",
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
                  "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-option/",
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
                  "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-option/",
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
                  "https://hukty-backend.bbclients.xyz/api/v1/sales/admin/order",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <OrderList></OrderList>,
            },
            {
              path: "Edit-order/:id",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://hukty-backend.bbclients.xyz/api/v1/sales/admin/courier/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
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
                  "https://hukty-backend.bbclients.xyz/api/v1/sales/admin/coupon/",
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
                  "https://hukty-backend.bbclients.xyz/api/v1/auth/admin/user/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <AddCoupon></AddCoupon>,
            },
            {
              path: "edit-coupon/:id",
              element: <EditCoupon></EditCoupon>,
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
                  "https://hukty-backend.bbclients.xyz/api/v1/sales/admin/courier/",
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
                  "https://hukty-backend.bbclients.xyz/api/v1/auth/admin/user/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <AddCourier></AddCourier>,
            },
            {
              path: "edit-courier/:id",
              element: <EditCourier></EditCourier>,
            },
          ],
        },
        //customer section
        {
          path: "users",
          element: <CustomerLayout></CustomerLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://hukty-backend.bbclients.xyz/api/v1/auth/admin/user/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <CustomerList></CustomerList>,
            },
            {
              path: "add-user",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://hukty-backend.bbclients.xyz/api/v1/auth/country/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <AddUser></AddUser>,
            },
            {
              path: "edit-user/:id",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://hukty-backend.bbclients.xyz/api/v1/auth/country/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <EditUser></EditUser>,
            },
          ],
        },
        // profile section
        {
          path: "profile",
          loader: () => {
            const token = `Token ${localStorage.getItem("_authToken")}`;
            return fetch(
              "https://hukty-backend.bbclients.xyz/api/v1/auth/profile/",
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
        // Web info
        {
          path: "websiteinfo",
          loader: () => {
            const token = `Token ${localStorage.getItem("_authToken")}`;
            return fetch(
              "https://hukty-backend.bbclients.xyz/api/v1/utility/admin/global-settings/",
              {
                headers: { Authorization: token },
              }
            );
          },
          element: <WebsiteInfo></WebsiteInfo>,
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
                  "https://hukty-backend.bbclients.xyz/api/v1/utility/admin/faq/",
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
        //reason section
        {
          path: "reason",
          element: <ReasonLayout></ReasonLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://hukty-backend.bbclients.xyz/api/v1/sales/admin/reason/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <ReasonList></ReasonList>,
            },
            {
              path: "add-reason",
              element: <AddReason></AddReason>,
            },
            {
              path: "edit-reason/:id",
              element: <EditReason></EditReason>,
            },
          ],
        },
        //blog section
        {
          path: "blog",
          element: <BlogLayout></BlogLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://hukty-backend.bbclients.xyz/api/v1/blog/admin/post/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <BlogList></BlogList>,
            },
            {
              path: "add-blog",
              element: <AddBlog></AddBlog>,
            },
            {
              path: "edit-blog/:id",
              element: <EditBlog></EditBlog>,
            },
          ],
        },
        //Page section
        {
          path: "pages",
          element: <PageLayout></PageLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://hukty-backend.bbclients.xyz/api/v1/utility/admin/page/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <PageList></PageList>,
            },
            {
              path: "add-page",
              element: <AddPage></AddPage>,
            },
            {
              path: "edit-page/:id",
              element: <EditPage></EditPage>,
            },
          ],
        },
        //Banner section
        {
          path: "banners",
          element: <BannerLayout></BannerLayout>,
          children: [
            {
              path: "",
              loader: () => {
                const token = `Token ${localStorage.getItem("_authToken")}`;
                return fetch(
                  "https://hukty-backend.bbclients.xyz/api/v1/utility/admin/banner/",
                  {
                    headers: { Authorization: token },
                  }
                );
              },
              element: <BannerList></BannerList>,
            },
            {
              path: "add-banner",
              element: <BannerAdd></BannerAdd>,
            },
            {
              path: "edit-banner/:id",
              element: <BannerEdit></BannerEdit>,
            },
          ],
        },
        // Not Found
        {
          path: "*",
          element: <NotFoundPage></NotFoundPage>,
        },
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
