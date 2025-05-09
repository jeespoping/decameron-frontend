import React, { useEffect, useState } from "react";
import { getHotels } from "../../api/hotel";
import "./ListHotelAdmin.scss";
import { Loader, Pagination } from "semantic-ui-react";
import { map, size } from "lodash";
import { HotelItem } from "../../components/Hotel";

export default function ListHotelAdmin() {
  const [hotels, setHotels] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      const response = await getHotels({ page });
      setHotels(response?.data?.data);
      setPagination({
        limit: response.data.per_page,
        page: response.data.current_page,
        pages: response.data.last_page,
        total: response.data.total,
      });
    })();
  }, [page, reload]);

  if (!hotels) return <Loader className="loader" active inline="centered" />;
  if (size(hotels) === 0) return "No hay ningun hotel";

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  return (
    <div className="list-hotels">
      {map(hotels, (hotel) => (
        <HotelItem onReload={onReload} key={hotel.id} hotel={hotel} />
      ))}

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
    </div>
  );
}
