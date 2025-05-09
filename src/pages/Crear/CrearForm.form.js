import * as Yup from "yup";
import { keyBy, keys, remove } from "lodash";

export function initialValues(hotel) {
  return {
    name: hotel?.name || "",
    city: hotel?.city || "",
    file: null,
    address: hotel?.address || "",
    nit: hotel?.nit || "",
    room: hotel?.room || "",
    image: hotel?.image || "",
  };
}

export function validationSchema(hotels, hotel) {
  return Yup.object({
    name: Yup.string()
      .required()
      .notOneOf(
        !hotel
          ? keys(keyBy(hotels, "name"))
          : remove(keys(keyBy(hotels, "name")), (n) => n !== hotel.name)
      ),
    city: Yup.string().required(),
    room: Yup.number().required(),
    // keys(keyBy(data, "nit")) esta logia la cree para que no se repitan los nit
    nit: Yup.string()
      .required()
      .notOneOf(
        !hotel
          ? keys(keyBy(hotels, "nit"))
          : remove(keys(keyBy(hotels, "nit")), (n) => n !== hotel.nit)
      ),
    address: Yup.string().required(),
    image: Yup.string().required(true),
  });
}
