import * as Yup from "yup";

export function initialValueForm() {
  return {
    amount: "",
    type: "",
    accommodation: "",
  };
}

export function validationSchema() {
  Yup.object({
    amount: Yup.number().required(),
    type: Yup.string().required(),
    accommodation: Yup.string()
      .required()
      .when("type", {
        is: "ESTANDAR",
        then: Yup.string().oneOf(["SENCILLA", "DOBLE"]),
      })
      .when("type", {
        is: "JUNIOR",
        then: Yup.string().oneOf(["TRIPLE", "CUADRUPLE"]),
      })
      .when("type", {
        is: "SUITE",
        then: Yup.string().oneOf(["SENCILLA", "DOBLE", "TRIPLE"]),
      }),
  });
}

export const accommodations = [
  {
    key: "SENCILLA",
    value: "SENCILLA",
    text: "Sencilla",
  },
  {
    key: "DOBLE",
    value: "DOBLE",
    text: "Doble",
  },
  {
    key: "TRIPLE",
    value: "TRIPLE",
    text: "Triple",
  },
  {
    key: "CUADRUPLE",
    value: "CUADRUPLE",
    text: "Cuádruple",
  },
];

export const types = [
  {
    key: "ESTANDAR",
    value: "ESTANDAR",
    text: "Estándar",
  },
  {
    key: "JUNIOR",
    value: "JUNIOR",
    text: "Junior",
  },
  {
    key: "SUITE",
    value: "SUITE",
    text: "Suite",
  },
];
