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
    statics = {
        gitRepoLink: 'https://github.com/zzmbacoder/caro',
        canvasLink: 'https://courseworks2.columbia.edu',
        cbsCaroLong: 'CBS Academic Rep Online (CARO)',
        cbsCaroShort: "CARO"
    };

    render() {
        return (
        <footer className=" footer">
            <Container>
            <Row className=" align-items-center justify-content-md-between">
                <Col md="6">
                    <div className="footerCopyRightText">
                        © {new Date().getFullYear()}{" "}
                        {this.statics.cbsCaroLong}
                    </div>
                    <div className="footerCopyRightTextMobile">
                        © {new Date().getFullYear()}{" "}
                        {this.statics.cbsCaroShort}
                    </div>
                </Col>
                <Col md="6">
                <Nav className=" nav-footer justify-content-end footerLogoMobile">
                    <NavItem>
                    <NavLink
                        href={this.statics.gitRepoLink}
                        target="_blank"
                    >
                        <span className="btn-inner--icon">
                            <img
                            alt="..."
                            className="footerLogo"
                            src={require("../assets/img/icons/common/github.svg")}
                            />
                        </span>
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        href={this.statics.canvasLink}
                        target="_blank"
                    >
                        <span className="btn-inner--icon">
                            <img
                            alt="..."
                            className="footerLogo"
                            src={require("../assets/img/icons/common/canvas.png")}
                            />
                        </span>
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
