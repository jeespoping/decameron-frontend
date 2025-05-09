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

export const deleteHotel = async (idHotel) => {
  try {
    const { data } = await httpConToken.delete(`/hotel/${idHotel}`);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
