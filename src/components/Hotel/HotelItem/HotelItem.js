import React, { useState } from "react";
import { Button, Confirm, Icon, Image } from "semantic-ui-react";
import "./HotelItem.scss";
import { deleteHotel } from "../../../api/hotel";
import { toast } from "react-toastify";

export function HotelItem({ hotel, onReload }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
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
            loading={loading}
            icon
            as="a"
            href={`/hotel/${hotel.id}`}
            target="_blank"
          >
            <Icon name="eye" />
          </Button>
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
    </>
  );
}
