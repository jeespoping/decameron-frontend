import React from "react";
import { Container } from "semantic-ui-react";
import classNames from "classnames";
import Header from "../../components/Header";
import "./BasicLayout.scss";

export default function BasicLayout({ children, className }) {
  return (
    <Container
      fluid
      style={{ backgroundImage: `url('./background.jpg')` }}
      className={classNames("basic-layout", {
        [className]: className,
      })}
    >
      <Header />

      <Container className="content">{children}</Container>
    </Container>
  );
}
