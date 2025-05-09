import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "semantic-ui-react";
import "../LoginForm/LoginForm.scss";
import { register } from "../../../api/auth";

export default function RegisterForm({ showLoginForm }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await register(formData);

      if (response) {
        showLoginForm();
      }

      setLoading(false);
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Nombre"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Correo electronico"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <div className="actions">
        <Button loading={loading} onClick={showLoginForm} type="button">
          Iniciar sesion
        </Button>
        <Button loading={loading} className="submit" type="submit">
          Registrar
        </Button>
      </div>
    </Form>
  );
}

function initialValue() {
  return {
    name: "",
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
