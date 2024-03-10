import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const token = `Token ${localStorage.getItem("_authToken")}`;
  const login = (email, password) => {
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/auth/login/",
      {
        email,
        password,
      }
    );
  };

  const uploadImage = (formData) => {
    console.log("formdata", formData);
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/auth/documents/upload/",
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
    const token = `Token ${localStorage.getItem("_authToken")}`;
    console.log("add profile", first_name, last_name, bio, image);
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/auth/profile/",
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
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/auth/change/password/",
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
      "https://hukty-backend.bbclients.xyz/api/v1/auth/profile/",
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
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/brand/${id}`,
      {
        headers: { Authorization: token },
      }
    );
  };

  const addBrand = (name, position, is_active, logo) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/brand/ ",
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
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/brand/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editBrand = (id, data) => {
    const token = `Token ${localStorage.getItem("_authToken")}`; // PATCH Method
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/brand/${id}/`,
      data,
      {
        headers: { Authorization: token },
      }
    );
  };
  const getBrand = () => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/brand/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const changeActionStatusBrand = (id, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/brand/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  // category.............................
  const getCategory = () => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/category/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const addCategory = (name, is_active = true, parents, image) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/category/",
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
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/category/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const categoryDelete = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/category/${id}/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const editCategory = (id, data) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/category/${id}/`,
      data,
      {
        headers: { Authorization: token },
      }
    );
  };

  const changeActionStatusCategory = (id, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/category/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  // category.............................

  //Variant Group .......................
  const deleteVariantGroup = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-group/${id}`,
      {
        headers: { Authorization: token },
      }
    );
  };

  const addVariantGroup = (group_name, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-group/",
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
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-group/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editVariantGroup = (id, data) => {
    console.log();
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-group/${id}/`,
      data,
      {
        headers: { Authorization: token },
      }
    );
  };
  const getVariantGroup = () => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-group/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const changeActionStatusVariantGroup = (id, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-group/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  //Variant Group .......................
  const deleteVariantOption = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-option/${id}`,
      {
        headers: { Authorization: token },
      }
    );
  };

  const addVariantOption = (name, group, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-option/",
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
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-option/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editVariantOption = (id, name, group) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-option/${id}/`,
      name,
      group,
      {
        headers: { Authorization: token },
      }
    );
  };
  const getVariantOption = () => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-option/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const changeActionStatusVariantOption = (id, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-option/${id}`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  //Product .......................
  const deleteProduct = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/product/${id}`,
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
      "https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/product/",
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
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/product/${id}`,
      { headers: { Authorization: token } }
    );
  };

  const editProduct = (
    id,
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
    console.log("product_variants", product_variants);
    // PATCH Method
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/product/${id}/`,
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
  const getProduct = () => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/product/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const changeActionStatusProduct = (id, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/product/${id}/`,
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
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/order/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const cancelOrder = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/variant-option/${id}/`,
      {
        headers: { Authorization: token },
      }
    );
  };

  //courier.........................

  const deleteCourier = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/courier/${id}/`,
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
      "https://hukty-backend.bbclients.xyz/api/v1/sales/admin/courier/",
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
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/courier/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editCourier = (
    id,
    name,
    website,
    email,
    contact_number,
    address,
    parcel_quantity,
    is_active
  ) => {
    const token = `Token ${localStorage.getItem("_authToken")}`; // PATCH Method
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/courier/${id}/`,
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

  const changeActionStatusCourier = (id, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/courier/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  // order..............................

  // coupon......................

  const deleteCoupon = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/coupon/${id}`,
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
      "https://hukty-backend.bbclients.xyz/api/v1/sales/admin/coupon/",
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
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/coupon/${id}`,
      { headers: { Authorization: token } }
    );
  };

  const editCoupon = (id, data) => {
    const token = `Token ${localStorage.getItem("_authToken")}`; // PATCH Method
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/coupon/${id}`,
      data,
      {
        headers: { Authorization: token },
      }
    );
  };

  const changeActiveStatusCoupon = (id, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/inventory/admin/category/${id}`,
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
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/utility/admin/global-settings/",
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
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/utility/admin/faq/${id}/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const addFaq = (question, answer, position, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/utility/admin/faq/",
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
      `https://hukty-backend.bbclients.xyz/api/v1/utility/admin/faq/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editFaq = (id, question, answer, position, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`; // PATCH Method
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/utility/admin/faq/${id}/`,
      { question, answer, position, is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  const changeActiveStatusFaq = (id, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/utility/admin/faq/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  // Reason
  const deleteReason = (id) => {
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/reason/${id}/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const addReason = (reason_name, reason_type, is_active) => {
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/sales/admin/reason/",
      {
        reason_name,
        reason_type,
        is_active,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewReason = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/reason/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editReason = (id, reason_name, reason_type, is_active) => {
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/reason/${id}/`,
      { reason_name, reason_type, is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  const changeActiveStatusReason = (id, is_active) => {
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/reason/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  // BLOG
  const deleteBlog = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/blog/admin/post/${id}/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const addBlog = (
    title,
    content,
    seo_title,
    seo_keyword,
    view_count,
    seo_description,
    image
  ) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/blog/admin/post/",
      {
        title,
        content,
        seo_title,
        seo_keyword,
        view_count,
        seo_description,
        image,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewBlog = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://hukty-backend.bbclients.xyz/api/v1/blog/admin/post/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editBlog = (
    id,
    title,
    content,
    seo_title,
    seo_keyword,
    view_count,
    seo_description,
    image
  ) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/blog/admin/post/${id}/`,
      {
        title,
        content,
        seo_title,
        seo_keyword,
        view_count,
        seo_description,
        image,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const changeActiveStatusBlog = (id, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    console.log(is_active);
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/blog/admin/post/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  // Page
  const deletePage = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/utility/admin/page/${id}/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const addPage = (
    title,
    video_url,
    desc,
    page_type,
    is_active,
    thumbnail,
    attachment
  ) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/utility/admin/page/",
      {
        title,
        video_url,
        desc,
        page_type,
        is_active,
        thumbnail,
        attachment,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewPage = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://hukty-backend.bbclients.xyz/api/v1/utility/admin/page/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editPage = (
    id,
    title,
    video_url,
    desc,
    page_type,
    is_active,
    thumbnail,
    attachment
  ) => {
    console.log(
      title,
      video_url,
      desc,
      page_type,
      is_active,
      thumbnail,
      attachment
    );
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/utility/admin/page/${id}/`,
      {
        title,
        video_url,
        desc,
        page_type,
        is_active,
        thumbnail,
        attachment,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const changeActiveStatusPage = (id, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    console.log(is_active);
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/utility/admin/page/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  // User
  const deleteUser = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.delete(
      `https://hukty-backend.bbclients.xyz/api/v1/auth/admin/user/${id}/`,
      {
        headers: { Authorization: token },
      }
    );
  };
  const addUser = (
    first_name,
    last_name,
    email,
    mobile,
    password,
    confirm_password,
    gender,
    role,
    country
  ) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.post(
      "https://hukty-backend.bbclients.xyz/api/v1/auth/admin/user/",
      {
        first_name,
        last_name,
        email,
        mobile,
        password,
        confirm_password,
        gender,
        role,
        country,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewUser = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://hukty-backend.bbclients.xyz/api/v1/auth/admin/user/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const editUser = (
    id,
    first_name,
    last_name,
    email,
    mobile,
    role,
    country
  ) => {
    console.log("user-edit", id);
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/auth/admin/user/${id}/`,
      {
        first_name,
        last_name,
        email,
        mobile,
        role,
        country,
      },
      {
        headers: { Authorization: token },
      }
    );
  };

  const changeActiveStatusUser = (id, is_active) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    console.log(is_active);
    return axios.patch(
      `https://hukty-backend.bbclients.xyz/api/v1/auth/admin/user/${id}/`,
      { is_active },
      {
        headers: { Authorization: token },
      }
    );
  };

  const viewAddress = (id) => {
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.get(
      `https://hukty-backend.bbclients.xyz/api/v1/auth/address/${id}/`,
      { headers: { Authorization: token } }
    );
  };

  const AssignCourier = (courier_id, orderId) => {
    console.log("user-edit", courier_id);
    const token = `Token ${localStorage.getItem("_authToken")}`;
    return axios.post(
      `https://hukty-backend.bbclients.xyz/api/v1/sales/admin/order/${orderId}/assign_courier/`,
      {
        courier_id,
      },
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
    changeActionStatusProduct,
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
    deleteReason,
    addReason,
    viewReason,
    editReason,
    changeActiveStatusReason,
    deleteBlog,
    addBlog,
    viewBlog,
    editBlog,
    changeActiveStatusBlog,
    deletePage,
    addPage,
    viewPage,
    editPage,
    changeActiveStatusPage,
    deleteUser,
    addUser,
    viewUser,
    editUser,
    changeActiveStatusUser,
    viewAddress,
    AssignCourier,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default UserContext;
