import axios from "axios";
import {
  createServiceFailure,
  createServiceStart,
  createServiceSuccess,
  deleteServiceFailure,
  deleteServiceStart,
  deleteServiceSuccess,
  getServicesFailure,
  getServicesStart,
  getServicesSuccess,
  updateServiceStart,
  updateServiceSuccess,
  updateServiceFailure,
  getServiceStart,
  getServiceSuccess,
  getServiceFailure,
} from "./ServiceActions";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getServicesCall = async (dispatch) => {
  dispatch(getServicesStart());
  try {
    const res = await axiosInstance.get("/services/", {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(getServicesSuccess(res.data));
  } catch (err) {
    dispatch(getServicesFailure());
  }
};

export const getServiceCall = async (id, dispatch) => {
  dispatch(getServiceStart());
  try {
    const res = await axiosInstance.get(`/services/find/${id}`, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    const service = [];
    service.push(res.data);
    dispatch(getServiceSuccess(service));
  } catch (err) {
    dispatch(getServiceFailure());
  }
};

export const createServiceCall = async (service, dispatch) => {
  dispatch(createServiceStart());
  try {
    const res = await axiosInstance.post("/services/", service, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(createServiceSuccess(res.data));
  } catch (err) {
    dispatch(createServiceFailure());
  }
};

export const updateServiceCall = async (service, dispatch) => {
  dispatch(updateServiceStart());
  try {
    const res = await axiosInstance.put("/services/" + service._id, service, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(updateServiceSuccess(res.data));
  } catch (err) {
    dispatch(updateServiceFailure());
  }
};

export const deleteServiceCall = async (id, dispatch) => {
  dispatch(deleteServiceStart());
  try {
    await axiosInstance.delete("/services/" + id, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(deleteServiceSuccess(id));
  } catch (err) {
    dispatch(deleteServiceFailure());
  }
};