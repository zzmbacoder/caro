import React from "react";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className=" footer">
        <Container>
          <Row className=" align-items-center justify-content-md-between">
            <Col md="6">
                <div className="footerCopyRightText">
                    © {new Date().getFullYear()}{" "}
                    CBS Academic Rep Online (CARO)
                </div>
            </Col>
            <Col md="6">
              <Nav className=" nav-footer justify-content-end">
                <NavItem>
                  <NavLink
                    href="https://github.com/zzmbacoder/caro"
                    target="_blank"
                  >
                    About CARO
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href=""
                    target="_blank"
                  >
                    MIT License
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://courseworks2.columbia.edu/"
                    target="_blank"
                  >
                    Canvas
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
