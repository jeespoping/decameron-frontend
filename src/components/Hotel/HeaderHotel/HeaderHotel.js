import React from "react";
import "./HeaderHotel.scss";
import { Grid, Image } from "semantic-ui-react";

export function HeaderHotel({ hotel }) {
  console.log(hotel);

  return (
    <Grid className="header-hotel">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={hotel.image} alt={hotel.name} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info hotel={hotel} />
      </Grid.Column>
    </Grid>
  );
}

function Info({ hotel }) {
  return (
    <>
      <div className="header-hotel__title">{hotel.name}</div>
      <div className="header-hotel__delivery">Disponible 24/7</div>
      <div
        className="header-hotel__summary"
        dangerouslySetInnerHTML={{ __html: `Ciudad: ${hotel.city}` }}
      />
      <div className="header-hotel__buy">
        <div className="header-hotel__buy-price">
          <p>Direccion: {hotel.address}</p>
          <div className="header-hotel__buy-price-actions">
            <p>Numero de habitaciones: {hotel.room}</p>
          </div>
        </div>
      </div>
    </>
  );
}
