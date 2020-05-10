import React from "react";
import {
    NavbarBrand,
    Navbar,
    Container
  } from "reactstrap";

class Navigator extends React.Component {
    statics = {
        cbsCaro: 'CBS Academic Rep Online (CARO)'
    };

    render() {
        return (
            <Navbar
            className="navbar-horizontal navbar-dark bg-primary mt-4"
            expand="lg"
            >
                <Container>
                    <NavbarBrand href="/">
                        <span className="btn-inner--icon">
                            <img
                            className="navigatorLogo"
                            alt="..."
                            src={require("../assets/img/icons/common/cbs_primary_white.png")}
                            />
                        </span>
                    </NavbarBrand>
                    <span className="navbarText">{this.statics.cbsCaro}</span>
                </Container>
            </Navbar>
        );
    }
}

export default Navigator;