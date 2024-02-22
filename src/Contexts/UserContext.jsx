import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const token = `Token ${localStorage.getItem("_authToken")}`;

const UserContext = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const login = (email, password) => {
    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/auth/login/",
      {
        email,
        password,
      }
    );
  };

  const uploadImage = (formData) => {
    console.log("formdata", formData);
    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/auth/documents/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
  };

  const profileUp = (first_name, last_name, bio, image) => {
    console.log("add profile", first_name, last_name, bio, image);
    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/auth/profile/",
      {
        first_name,
        last_name,
        bio,
        image,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const changePassword = (old_password, password, confirm_password) => {
    console.log(old_password, password, confirm_password);
    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/auth/change/password/",
      {
        old_password,
        password,
        confirm_password,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const getProfile = () => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      "https://shop-backend.privateyebd.com/api/v1/auth/profile/",
      {
        headers: { Authorization: token },
      }
    );
  };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("_authToken");
    return (window.location.href = "/");
  };

  const brandDelete = (id) => {
    return axios.delete(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/brand/${id}`,
      {
        headers: { Authorization: token },
      }
    );
  };

  const addBrand = (name, position, is_active, logo) => {
    console.log("add category", name, position, is_active, logo);
    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/inventory/admin/brand/ ",
      {
        name,
        position,
        is_active,
        logo,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewBrand = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/brand/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editBrand = (id, data) => {
    console.log();
    // PATCH Method
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/brand/${id}/`,
      data,
      {
        headers: { Authorization: token },
      }
    );
  };
  const getBrand = () => {
    // PATCH Method
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/brand/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const changeActionStatusBrand = (id, is_active) => {
    console.log("user contest ", is_active);
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/brand/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  // category.............................
  const getCategory = () => {
    // PATCH Method
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/category/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const addCategory = (name, is_active = true, parents, image) => {
    console.log("add category", name, parents, is_active, image);

    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/inventory/admin/category/",
      {
        name,
        parents,
        image,
        is_active,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewCategory = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/category/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const categoryDelete = (id) => {
    console.log(id);
    return axios.delete(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/category/${id}/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const editCategory = (id, data) => {
    // PATCH Method
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/category/${id}/`,
      data,
      {
        headers: { Authorization: token },
      }
    );
  };

  const changeActionStatusCategory = (id, is_active) => {
    console.log("user contest ", is_active);
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/category/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  // category.............................

  //Variant Group .......................
  const deleteVariantGroup = (id) => {
    return axios.delete(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-group/${id}`,
      {
        headers: { Authorization: token },
      }
    );
  };

  const addVariantGroup = (group_name, is_active) => {
    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-group/",
      {
        group_name,
        is_active,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewVariantGroup = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-group/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editVariantGroup = (id, data) => {
    console.log();
    // PATCH Method
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-group/${id}/`,
      data,
      {
        headers: { Authorization: token },
      }
    );
  };
  const getVariantGroup = () => {
    // PATCH Method
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-group/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const changeActionStatusVariantGroup = (id, is_active) => {
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-group/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  //Variant Group .......................
  const deleteVariantOption = (id) => {
    return axios.delete(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-option/${id}`,
      {
        headers: { Authorization: token },
      }
    );
  };

  const addVariantOption = (name, group, is_active) => {
    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-option/",
      {
        name,
        group,
        is_active,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewVariantOption = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-option/${id}`,
      { headers: { Authorization: token } }
    );
  };

  const editVariantOption = (id, data) => {
    console.log();
    // PATCH Method
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-option/${id}`,
      data,
      {
        headers: { Authorization: token },
      }
    );
  };
  const getVariantOption = () => {
    // PATCH Method
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-option/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const changeActionStatusVariantOption = (id, is_active) => {
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-option/${id}`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  //Product .......................
  const deleteProduct = (id) => {
    return axios.delete(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/product/${id}`,
      {
        headers: { Authorization: token },
      }
    );
  };

  const addProduct = (
    product_variants,
    name,
    quantity,
    cost,
    price,
    images,
    thumbnail,
    unit_name,
    unit_value,
    brand,
    category,
    is_featured,
    has_variant,
    has_promotion,
    has_offer,
    offer_percent,
    promotional_price,
    promotions_start_date,
    promotions_expiry_date,
    product_specification,
    description,
    stock_status,
    is_active
  ) => {
    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/inventory/admin/product/",
      {
        product_variants,
        name,
        quantity,
        cost,
        price,
        images,
        thumbnail,
        unit_name,
        unit_value,
        brand,
        category,
        is_featured,
        has_variant,
        has_promotion,
        has_offer,
        offer_percent,
        promotional_price,
        promotions_start_date,
        promotions_expiry_date,
        product_specification,
        description,
        stock_status,
        is_active,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewProduct = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/product/${id}`,
      { headers: { Authorization: token } }
    );
  };

  const editProduct = (
    id,
    product_variants,
    name,
    quantity,
    price,
    images,
    thumbnail,
    category,
    is_featured,
    has_variant,
    description
  ) => {
    console.log(
      id,
      product_variants,
      name,
      quantity,
      price,
      images,
      thumbnail,
      category,
      is_featured,
      has_variant,
      description
    );
    // PATCH Method
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/product/${id}/`,
      {
        product_variants,
        name,
        quantity,
        price,
        images,
        thumbnail,
        category,
        is_featured,
        has_variant,
        description,
      },
      {
        headers: { Authorization: token },
      }
    );
  };
  const getProduct = () => {
    // PATCH Method
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/product/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const changeActionStatus = (id, is_active) => {
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/product/${id}`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  // order..............................
  const viewOrder = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/sales/admin/order/${id}`,
      { headers: { Authorization: token } }
    );
  };

  const cancelOrder = (id) => {
    return axios.delete(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/variant-option/${id}`,
      {
        headers: { Authorization: token },
      }
    );
  };

  //courier.........................

  const deleteCourier = (id) => {
    return axios.delete(
      `https://shop-backend.privateyebd.com/api/v1/sales/admin/courier/${id}/`,
      {
        headers: { Authorization: token },
      }
    );
  };

  const addCourier = (
    name,
    website,
    email,
    contact_number,
    address,
    parcel_quantity,
    is_active
  ) => {
    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/sales/admin/courier/",
      {
        name,
        website,
        email,
        contact_number,
        address,
        parcel_quantity,
        is_active,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewCourier = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/sales/admin/courier/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editCourier = (id, data) => {
    console.log();
    // PATCH Method
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/sales/admin/courier/${id}/`,
      data,
      {
        headers: { Authorization: token },
      }
    );
  };

  const changeActionStatusCourier = (id, is_active) => {
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/sales/admin/courier/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  // order..............................

  // coupon......................

  const deleteCoupon = (id) => {
    return axios.delete(
      `https://shop-backend.privateyebd.com/api/v1/sales/admin/coupon/${id}`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const addCoupon = (
    coupon_title,
    coupon_type,
    start_date,
    expire_date,
    discount_type,
    discount_amount,
    minimum_purchase,
    maximum_discount,
    max_usage,
    customers,
    is_active
  ) => {
    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/sales/admin/coupon/",
      {
        coupon_title,
        coupon_type,
        start_date,
        expire_date,
        discount_type,
        discount_amount,
        minimum_purchase,
        maximum_discount,
        max_usage,
        customers,
        is_active,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewCoupon = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/sales/admin/coupon/${id}`,
      { headers: { Authorization: token } }
    );
  };

  const editCoupon = (id, data) => {
    console.log();
    // PATCH Method
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/sales/admin/coupon/${id}`,
      data,
      {
        headers: { Authorization: token },
      }
    );
  };

  const changeActiveStatusCoupon = (id, is_active) => {
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/inventory/admin/category/${id}`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };
  // coupon......................

  // website info
  const postWebsiteInfo = (
    site_name,
    website_url,
    email,
    phone,
    address,
    short_desc,
    facebook,
    twitter,
    linkedin,
    instagram,
    youtube,
    logo_small,
    logo_large
  ) => {
    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/utility/admin/global-settings/",
      {
        site_name,
        website_url,
        email,
        phone,
        address,
        short_desc,
        facebook,
        twitter,
        linkedin,
        instagram,
        youtube,
        logo_small,
        logo_large,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  // Faq
  const deleteFaq = (id) => {
    return axios.delete(
      `https://shop-backend.privateyebd.com/api/v1/utility/admin/faq/${id}/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const addFaq = (question, answer, position, is_active) => {
    console.log("addFaq", is_active);
    return axios.post(
      "https://shop-backend.privateyebd.com/api/v1/utility/admin/faq/",
      {
        question,
        answer,
        position,
        is_active,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewFaq = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://shop-backend.privateyebd.com/api/v1/utility/admin/faq/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editFaq = (id, question, answer, position, is_active) => {
    console.log();
    // PATCH Method
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/utility/admin/faq/${id}/`,
      { question, answer, position, is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  const changeActiveStatusFaq = (id, is_active) => {
    return axios.patch(
      `https://shop-backend.privateyebd.com/api/v1/utility/admin/faq/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  const authInfo = {
    login,
    uploadImage,
    getProfile,
    userProfile,
    profileUp,
    setUserProfile,
    logOut,
    brandDelete,
    addBrand,
    viewBrand,
    editBrand,
    getBrand,
    changeActionStatusBrand,
    addCategory,
    viewCategory,
    categoryDelete,
    editCategory,
    getCategory,
    changeActionStatusCategory,
    deleteVariantGroup,
    addVariantGroup,
    viewVariantGroup,
    editVariantGroup,
    getVariantGroup,
    changeActionStatusVariantGroup,
    deleteVariantOption,
    addVariantOption,
    viewVariantOption,
    editVariantOption,
    getVariantOption,
    changeActionStatusVariantOption,
    deleteProduct,
    addProduct,
    viewProduct,
    editProduct,
    getProduct,
    changeActionStatus,
    viewOrder,
    cancelOrder,
    deleteCoupon,
    addCoupon,
    viewCoupon,
    editCoupon,
    changeActiveStatusCoupon,
    changePassword,
    deleteCourier,
    addCourier,
    viewCourier,
    editCourier,
    changeActionStatusCourier,
    postWebsiteInfo,
    addFaq,
    deleteFaq,
    editFaq,
    changeActiveStatusFaq,
    viewFaq,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default UserContext;
