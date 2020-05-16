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
        bossLink: 'https://boss.gsb.columbia.edu/',
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
                        href={this.statics.canvasLink}
                        target="_blank"
                    >
                        <div className="footerCopyRightText">Canvas</div>
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        href={this.statics.bossLink}
                        target="_blank"
                    >
                         <div className="footerCopyRightText">BOSS</div>
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
