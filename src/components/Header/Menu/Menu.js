import React, { useState } from "react";
import {
  Container,
  Grid,
  Icon,
  Label,
  Menu as Menuweb,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "./Menu.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../reducers/authReducer";
import ModalBasic from "../../ModalBasic";
import Auth from "../../Auth/Auth";
import { size } from "lodash";

export default function Menu() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesion");

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column width={16} className="menu__right">
            <MenuOptions
              onShowModal={onShowModal}
              user={user}
              handleLogout={handleLogout}
            />
          </Grid.Column>
        </Grid>
      </Container>
      <ModalBasic
        size="small"
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
      >
        <Auth setTitleModal={setTitleModal} onCloseModal={onCloseModal} />
      </ModalBasic>
    </div>
  );
}

function MenuOptions({ user, onShowModal, handleLogout }) {
  return (
    <Menuweb>
      <>
        {user ? (
          <>
            {user && (
              <>
                <NavLink to="/crear" end>
                  <Menuweb.Item>
                    <Icon name="clipboard outline" />
                    Crear hotel
                  </Menuweb.Item>
                </NavLink>
                <NavLink to="/list-admin" end>
                  <Menuweb.Item>
                    <Icon name="folder open outline" />
                    Lista de hoteles
                  </Menuweb.Item>
                </NavLink>
              </>
            )}

            <Menuweb.Item className="m-0" onClick={handleLogout}>
              <Icon name="power off" />
            </Menuweb.Item>
          </>
        ) : (
          <Menuweb.Item onClick={onShowModal}>
            <Icon name="user outline" />
            Mi cuenta
          </Menuweb.Item>
        )}
      </>
    </Menuweb>
  );
}
