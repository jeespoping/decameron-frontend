import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotel } from "../../api/hotel";
import { HeaderHotel } from "../../components/Hotel";

export default function Movil() {
  const [hotel, setHotel] = useState(null);
  const { idHotel } = useParams();

  useEffect(() => {
    (async () => {
      const response = await getHotel(idHotel);
      setHotel(response);
    })();
  }, [idHotel]);

  if (!hotel) return null;

  return (
    <>
      <HeaderHotel hotel={hotel.data} />
    </>
  );
}
