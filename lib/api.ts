// import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import { Order, Product } from "./types";

// const axiosInstance = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
//   withCredentials: false,
// });

// interface RequestOptions {
//   endpoint: string;
//   method: AxiosRequestConfig["method"];
//   data?: any;
// }

// const request = async <T>({
//   endpoint,
//   method,
//   data,
// }: RequestOptions): Promise<any> => {
//   try {
//     let token = "";
//     if (typeof window !== "undefined") {
//       token = localStorage.getItem("auth_token") || "";
//     }
//     const options: AxiosRequestConfig = {
//       method,
//       url: endpoint,
//       data,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const res: AxiosResponse<T> = await axiosInstance.request<T>(options);

//     // console.log(res.data);
//     return res.data;
//   } catch (error: any) {
//     if (!error?.response) {
//       throw error;
//     } else {
//       throw error?.response?.data;
//     }
//   }
// };

// const sendOtp = async (data: {
//   phone_number: string;
// }): Promise<{ otp: string; user: boolean; token?: { access: string } }> =>
//   request({ endpoint: `verify`, method: "POST", data });

// const signIn = async (data: {
//   name: string;
//   phone_number: string;
//   unique_id: string;
// }): Promise<{
//   token: { access: string };
//   user_id: string;
//   name: string;
//   phone_number: string;
//   message: string;
// }> => request({ endpoint: `login-register`, method: "POST", data });

// const getProducts = async (): Promise<Product[]> =>
//   request({ endpoint: `new-products`, method: "GET" });

// const getOrders = async (): Promise<{ count: number; orders: Order[] }> =>
//   request({ endpoint: `user-orders`, method: "GET" });

// const purchaseProduct = async (data: {
//   product_id: string;
// }): Promise<{
//   message: string;
//   order: Order;
// }> => {
//   const res = await request({
//     endpoint: `purchase-product`,
//     method: "POST",
//     data,
//   });
//   return {
//     message: res.message,
//     order: {
//       order_id: res.order.id,
//       ...res.order,
//       ...res.order_details[0],
//       product_price: res.order_details[0].price,
//     },
//   };
// };

// export { sendOtp, signIn, getProducts, getOrders, purchaseProduct };


import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Order, Product } from "./types";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
  withCredentials: false,
});

interface RequestOptions {
  endpoint: string;
  method: AxiosRequestConfig["method"];
  data?: any;
}

const request = async <T>({
  endpoint,
  method,
  data,
}: RequestOptions): Promise<T> => {
  try {
    let token: string | null = null;

    // ⚠️ Only read token in browser
    if (typeof window !== "undefined") {
      token = localStorage.getItem("auth_token");
    }

    // ✅ Build headers safely
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // ✅ Attach Authorization ONLY if token exists
    if (token && token.trim() !== "") {
      headers.Authorization = `Bearer ${token}`;
    }

    const options: AxiosRequestConfig = {
      method,
      url: endpoint,
      data,
      headers,
    };

    const res: AxiosResponse<T> = await axiosInstance.request<T>(options);
    return res.data;
  } catch (error: any) {
    if (!error?.response) {
      throw error;
    }
    throw error.response.data;
  }
};

const sendOtp = async (data: {
  phone_number: string;
}): Promise<{ otp: string; user: boolean; token?: { access: string } }> =>
  request({ endpoint: "verify", method: "POST", data });

const signIn = async (data: {
  name: string;
  phone_number: string;
  unique_id: string;
}): Promise<{
  token: { access: string };
  user_id: string;
  name: string;
  phone_number: string;
  message: string;
}> => request({ endpoint: "login-register", method: "POST", data });

const getProducts = async (): Promise<Product[]> =>
  request({ endpoint: "new-products", method: "GET" });

const getOrders = async (): Promise<{ count: number; orders: Order[] }> =>
  request({ endpoint: "user-orders", method: "GET" });

const purchaseProduct = async (data: {
  product_id: string;
}): Promise<{
  message: string;
  order: Order;
}> => {
  const res = await request<any>({
    endpoint: "purchase-product",
    method: "POST",
    data,
  });

  return {
    message: res.message,
    order: {
      order_id: res.order.id,
      ...res.order,
      ...res.order_details[0],
      product_price: res.order_details[0].price,
    },
  };
};

export { sendOtp, signIn, getProducts, getOrders, purchaseProduct };
