import { httpConToken, httpConTokenImage, httpSinToken } from "../helpers/http";

export const getHotels = async (params) => {
  try {
    const pageFilter = `page=${params?.page || 1}`;
    const { data } = await httpSinToken(`/hotel?${pageFilter}`);

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const getHotel = async (id) => {
  try {
    const { data } = await httpSinToken(`/hotel/${id}`);

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const createHotel = async (formValue) => {
  try {
    const formData = new FormData();
    Object.keys(formValue).forEach((key) => {
      formData.append(key, formValue[key]);
    });

    if (formValue.file) {
      formData.append("image", formValue.file);
    }

    const { data } = await httpConTokenImage.post("/hotel", formData);

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const updateHotel = async (formValue, id) => {
  try {
    const formData = new FormData();
    Object.keys(formValue).forEach((key) => {
      formData.append(key, formValue[key]);
    });

    if (formValue.file) {
      formData.append("image", formValue.file);
    }

    const { data } = await httpConTokenImage.post(
      `/hotel/${id}?_method=PUT`,
      formData
    );

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const deleteHotel = async (idHotel) => {
  try {
    const { data } = await httpConToken.delete(`/hotel/${idHotel}`);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addRoom = async (formValue) => {
  try {
    const { data } = await httpConToken.post(`/habitacion`, formValue);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
