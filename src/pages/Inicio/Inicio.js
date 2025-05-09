import { Container, Loader } from "semantic-ui-react";

import { getHotels } from "../../api/hotel";
import { useEffect, useState } from "react";
import "./Inicio.scss";
import { size } from "lodash";
import { ListHotels } from "../../components/Hotel";

export default function Inicio() {
  const [hotels, setHotels] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();

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
  }, []);

  return (
    <div className="inicio">
      {!hotels && <Loader active>Cargando hoteles</Loader>}
      {hotels && size(hotels) === 0 && (
        <div>
          <h3>No hay hoteles</h3>
        </div>
      )}
      {size(hotels) > 0 && (
        <ListHotels
          hotels={hotels}
          pagination={pagination}
          setPage={setPage}
          paginate={true}
        />
      )}
    </div>
  );
}
