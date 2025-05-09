import React from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import "./ListHotels.scss";
import {
  breakpointUpSm,
  breakpointUpMd,
  breakpointUpLg,
} from "../../../utils/breakpoints";
import { Grid, Image, Pagination } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { map } from "lodash";

export function ListHotels({ hotels, pagination, setPage, paginate }) {
  const { width } = useWindowSize();

  const changePage = (_, data) => {
    if (paginate) {
      setPage(data.activePage);
    }
  };

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpLg:
        return 5;
      case width > breakpointUpMd:
        return 3;
      case width > breakpointUpSm:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="list-hotels">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(hotels, (hotel) => (
            <Hotel key={hotel.id} hotel={hotel} />
          ))}
        </Grid.Row>
      </Grid>

      {paginate && (
        <div className="list-hotels__pagination">
          <Pagination
            totalPages={pagination.pages}
            defaultActivePage={pagination.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            onPageChange={changePage}
          />
        </div>
      )}
    </div>
  );
}

function Hotel({ hotel }) {
  return (
    <Grid.Column className="list-hotels__hotel">
      <div className="list-hotels__hotel-poster">
        <NavLink to={`/hotel/${hotel.id}`} end>
          <Image src={hotel.image} alt={hotel.name} />
        </NavLink>
        <div className="list-hotels__hotel-poster-info">
          <span className="city">{hotel.city}</span>
        </div>
      </div>
      <h2>{hotel.name}</h2>
    </Grid.Column>
  );
}
