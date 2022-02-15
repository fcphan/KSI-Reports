import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { NavLinks } from "../utils/navlinks";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className={styles.navlogo} href="/">
          KSI Report
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          className={styles.navbarcollapse}
          id="basic-navbar-nav"
        >
          <Nav className={styles.navmenu}>
            {NavLinks.map((links, index) => {
              return (
                <Nav.Link
                  key={index}
                  className={styles.navlink}
                  href={links.path}
                >
                  {links.name}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
