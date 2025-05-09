import React, { useEffect, useState } from "react";
import { getRooms } from "../../../api/hotel";
import { Icon, Table } from "semantic-ui-react";
import "./ListRooms.scss";
import { map } from "lodash";

export function ListRooms({ hotel }) {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getRooms(hotel.id);
      setRooms(response);
    })();
  }, []);

  const removeRoom = (room) => {
    console.log(room);
  };

  return (
    <div className="list-rooms">
      <div className="content">
        <div className="title">Detalles del hotel</div>

        <div className="data">
          <Table celled structured>
            <Table.Body>
              <Table.Row className="list-rooms__room">
                <Table.Cell>Nombre: </Table.Cell>
                <Table.Cell className="titulo">{hotel.name}</Table.Cell>
                <Table.Cell>Direcciión: </Table.Cell>
                <Table.Cell className="titulo">{hotel.address} </Table.Cell>
              </Table.Row>
              <Table.Row className="list-rooms__room">
                <Table.Cell>Ciudad: </Table.Cell>
                <Table.Cell className="titulo">{hotel.city}</Table.Cell>
                <Table.Cell>Nit: </Table.Cell>
                <Table.Cell className="titulo">{hotel.nit} </Table.Cell>
              </Table.Row>
              <Table.Row className="list-rooms__room">
                <Table.Cell>Numero de Hab: </Table.Cell>
                <Table.Cell className="titulo">{hotel.room}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>

      <div className="content">
        <div className="title">Habitaciones</div>

        <div className="data">
          <Table celled structured>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Cantidad</Table.HeaderCell>
                <Table.HeaderCell>Tipo Habitación</Table.HeaderCell>
                <Table.HeaderCell>Acomodación</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {map(rooms, (room) => (
                <Table.Row key={room.id} className="list-rooms__room">
                  <Table.Cell>{room.amount}</Table.Cell>
                  <Table.Cell>{room.type}</Table.Cell>
                  <Table.Cell>
                    {room.accommodation}
                    <Icon
                      name="close"
                      link
                      onClick={() => removeRoom(room.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
