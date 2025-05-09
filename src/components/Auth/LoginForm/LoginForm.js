import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "semantic-ui-react";
import "./LoginForm.scss";
import { loginActions } from "../../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

export default function LoginForm({ showRegisterForm, onCloseModal }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      const response = await dispatch(loginActions(formData));

      if (response) {
        onCloseModal();
      }
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
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
        <Button
          loading={loading}
          type="button"
          basic
          onClick={showRegisterForm}
        >
          Registrarse
        </Button>
        <div>
          <Button loading={loading} className="submit" type="submit">
            Entrar
          </Button>
        </div>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
