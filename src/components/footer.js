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
          {/* <Row className=" row-grid align-items-center mb-5">
            <Col lg="6">
              <h3 className=" text-primary font-weight-light mb-2">
                Thank you for supporting us!
              </h3>
              <h4 className=" mb-0 font-weight-light">
                Let's get in touch on any of these platforms.
              </h4>
            </Col>
            <Col className="text-lg-center btn-wrapper" lg="6">
              <Button
                className="btn-icon-only rounded-circle"
                color="twitter"
                href="https://twitter.com/creativetim"
                id="tooltip475038074"
                target="_blank"
              >
                <span className="btn-inner--icon">
                  <i className="fa fa-twitter" />
                </span>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip475038074">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon-only rounded-circle ml-1"
                color="facebook"
                href="https://www.facebook.com/creativetim"
                id="tooltip837440414"
                target="_blank"
              >
                <span className="btn-inner--icon">
                  <i className="fa fa-facebook-square" />
                </span>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip837440414">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-icon-only rounded-circle ml-1"
                color="dribbble"
                href="https://dribbble.com/creativetim"
                id="tooltip829810202"
                target="_blank"
              >
                <span className="btn-inner--icon">
                  <i className="fa fa-dribbble" />
                </span>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip829810202">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon-only rounded-circle ml-1"
                color="github"
                href="https://github.com/creativetimofficial"
                id="tooltip495507257"
                target="_blank"
              >
                <span className="btn-inner--icon">
                  <i className="fa fa-github" />
                </span>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip495507257">
                Star on Github
              </UncontrolledTooltip>
            </Col>
          </Row> */}
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
