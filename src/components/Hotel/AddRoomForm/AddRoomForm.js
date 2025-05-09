import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "semantic-ui-react";
import {
  accommodations,
  initialValueForm,
  types,
  validationSchema,
} from "./AddRoomForm.options";
import "./AddRoomForm.scss";
import { toast } from "react-toastify";
import { addRoom } from "../../../api/hotel";

export function AddRoomForm({ hotel, setShowModal }) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValueForm(),
    validationSchema: validationSchema(),
    onSubmit: async (formData) => {
      setIsLoading(true);
      const response = await addRoom({ ...formData, hotel_id: hotel.id });
      if (response.res) {
        setShowModal(false);
      } else {
        toast.error(response.message);
      }
      setIsLoading(false);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="add-room-form">
      <FormGroup>
        <Form.Field width={8}>
          <Input
            name="amount"
            error={formik.errors.amount && true}
            onChange={formik.handleChange}
            value={formik.values.amount}
            placeholder="Numero de cuartos"
          />
          <Input disabled value={hotel.name} />
        </Form.Field>
        <Form.Field width={8}>
          <Form.Dropdown
            placeholder="Tipo de habitación"
            fluid
            search
            selection
            options={types}
            value={formik.values.type}
            onChange={(_, data) => {
              formik.setFieldValue("type", data.value);
            }}
            error={formik.errors.type && true}
          />
          <Form.Dropdown
            placeholder="Acomodación"
            fluid
            search
            selection
            options={accommodations}
            lazyLoad
            value={formik.values.accommodation}
            onChange={(_, data) => {
              formik.setFieldValue("accommodation", data.value);
            }}
            error={formik.errors.accommodation && true}
          />
        </Form.Field>
      </FormGroup>
      <Button type="submit" loading={isLoading}>
        Crear habitación
      </Button>
    </Form>
  );
}
