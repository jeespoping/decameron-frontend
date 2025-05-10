import React, { useCallback, useEffect, useState } from "react";
import "./Crear.scss";
import { Button, Form, Image, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./CrearForm.form";
import { useNavigate, useParams } from "react-router";
import { getHotels, createHotel, getHotel, updateHotel } from "../../api/hotel";

export default function Crear() {
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [hotel, setHotel] = useState(null);

  const { idHotel } = useParams();

  const [hotels, setHotels] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues(hotel),
    validationSchema: validationSchema(hotels, hotel),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setLoading(true);
      try {
        if (!hotel) {
          await createHotel(formValue);
        } else {
          await updateHotel(formValue, hotel.id);
        }

        navigate("/list-admin");
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("image", URL.createObjectURL(file));
    formik.setFieldValue("file", file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
    multiple: false,
  });

  const getImage = () => {
    if (formik.values.file) {
      return formik.values.image;
    } else if (formik.values.image) {
      return formik.values.image;
    }
    return null;
  };

  useEffect(() => {
    (async () => {
      setLoadingPage(true);
      const response = await getHotels({ page: 1 });
      setHotels(response?.data?.data);

      if (idHotel) {
        const response = await getHotel(idHotel);
        setHotel(response?.data);
      } else {
        setHotel(null);
      }
      setLoadingPage(false);
    })();
  }, [idHotel]);

  if (loadingPage) {
    <Loader active>Cargando</Loader>;
  }

  return (
    <div className="crear">
      <h1 className="crear__title">{hotel ? "Editar Hotel" : "Crear Hotel"}</h1>
      <Form className="hotel-form" onSubmit={formik.handleSubmit}>
        <div className="hotel-form__image" {...getRootProps()}>
          <input data-cy="input-image" {...getInputProps()} />
          {getImage() ? (
            <Image size="small" src={getImage()} />
          ) : (
            <div>
              <span>Arrastra tu miniatura</span>
            </div>
          )}
        </div>

        <Form.Input
          name="name"
          type="text"
          placeholder="Titulo"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />

        <Form.Input
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
          name="city"
          placeholder="Ciudad"
        />

        <Form.Input
          onChange={formik.handleChange}
          value={formik.values.room}
          error={formik.errors.room}
          name="room"
          placeholder="Numero de cuartos"
        />
        <Form.Input
          onChange={formik.handleChange}
          value={formik.values.nit}
          error={formik.errors.nit}
          name="nit"
          placeholder="nit"
        />
        <Form.Input
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
          name="address"
          placeholder="direccion"
        />

        <Button className="submit" type="submit" loading={loading}>
          {hotel ? "Editar Hotel" : "Crear Hotel"}
        </Button>
      </Form>
    </div>
  );
}
