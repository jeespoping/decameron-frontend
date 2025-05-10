import React, { useState } from "react";
import { Button, Confirm, Icon, Image } from "semantic-ui-react";
import "./HotelItem.scss";
import { deleteHotel } from "../../../api/hotel";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import ModalBasic from "../../ModalBasic/ModalBasic";
import { AddRoomForm } from "../AddRoomForm";

export function HotelItem({ hotel, onReload }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      setLoading(true);

      const response = await deleteHotel(hotel.id);

      if (response) {
        toast.success("Eliminado correctamente");
      }

      onReload();

      onOpenCloseConfirm();

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlerModal = (type) => {
    switch (type) {
      case "habitacion":
        setTitleModal("Crear habitaciones");
        setContentModal(
          <>
            <AddRoomForm hotel={hotel} setShowModal={setShowModal} />
          </>
        );
        setShowModal(true);
        break;

      default:
        setTitleModal(null);
        setContentModal(null);
        setShowModal(false);
        break;
    }
  };

  return (
    <>
      <div className="hotel-item">
        <div className="hotel-item__info">
          <Image src={hotel.image} />
          <div>
            <p>{hotel.name}</p>
          </div>
        </div>
        <div>
          <Button
            onClick={() => handlerModal("habitacion")}
            loading={loading}
            icon
          >
            <Icon name="cog" />
          </Button>
          <Button
            loading={loading}
            icon
            as="a"
            href={`/hotel/${hotel.id}`}
            target="_blank"
          >
            <Icon name="eye" />
          </Button>
          <NavLink to={`/hotel/editar/${hotel.id}`} end>
            <Button loading={loading} icon>
              <Icon name="edit outline" />
            </Button>
          </NavLink>

          <Button
            loading={loading}
            icon
            color="red"
            onClick={onOpenCloseConfirm}
          >
            <Icon name="trash" />
          </Button>
        </div>
      </div>
      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`Eliminar el hotel ${hotel.name}`}
        size="mini"
      />
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </ModalBasic>
    </>
  );
}
