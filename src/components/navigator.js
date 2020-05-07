import React from "react";
import {
    NavbarBrand,
    Navbar,
    Container,
    Button,
    Modal,
    Card,
    CardBody,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Alert
  } from "reactstrap";

class Navigator extends React.Component {
    statics = {
        navigatorLogoHeight: '45px',
        tokenMinLength: 10,
        bearer: 'Bearer ',
        invalidTokenProvided: 'Invalid token provided!',
        cbsCaro: 'CBS Academic Rep Online (CARO)',
        putInYourCbsCanvas: 'Put in your CBS Canvas account token below:',
        remeberMeText: 'Remember me',
        go: 'Go!'
    };

    state = {
        defaultModal: false,
        token: '',
        rememberMe: false,
        showInvalidTokenError: false
    };

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    modalOnClickSetToken(modal, tokenValue) {
        const tokenProvided = tokenValue && tokenValue.length > this.statics.tokenMinLength;
        if (!tokenProvided) {
            this.setState({ showInvalidTokenError: true});
            return;
        }

        this.toggleModal(modal);
        if (tokenProvided) {
            this.props.handleToSetToken(this.statics.bearer + tokenValue);
        }

        // Store the token into browser localStorage if remember me is checked
        const { token, rememberMe } = this.state;
        localStorage.setItem('rememberMe', rememberMe);
        localStorage.setItem('token', rememberMe ? token : '');

        if (!rememberMe) {
            this.setState({ token: '' });
        }
    }

    getNavigatorLogoStyle() {
        return {
            height: this.statics.navigatorLogoHeight
        };
    }

    handleTokenInput(event) {
        const value = event.target.value;
        this.setState({ 
            token: value
        });
    }

    handleRememberMeOnChange(event) {
        const input = event.target;
        const value = input.checked;
        this.setState({ rememberMe: value });
    }


    getInvalidTokenErrorMessage() {
        return  <Alert color="danger">
                    <span className="alert-inner--icon">
                        <i className="ni ni-fat-remove invalidTokenErrorMsg" />
                    </span>
                    <span className="alert-inner--text">
                        {this.statics.invalidTokenProvided}
                    </span>
                </Alert>
    }

    componentDidMount() {
        this.toggleModal("formModal");
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const token = rememberMe ? localStorage.getItem('token') : '';
        this.setState({ 
            "token" : token, 
            "rememberMe": rememberMe
        });
    }

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
                    <Modal
                        className="modal-dialog-centered"
                        size="sm"
                        isOpen={this.state.formModal}
                        toggle={() => this.toggleModal("formModal")}
                        backdrop="static"
                        >
                        <div className="modal-body p-0">
                            <Card className="bg-secondary shadow border-0">
                                <CardBody className="px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>{this.statics.putInYourCbsCanvas}</small>
                                    </div>
                                    {this.state.showInvalidTokenError ? this.getInvalidTokenErrorMessage() : ''}
                                    <Form role="form">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input value={this.state.token} onChange={() => this.handleTokenInput(event)} placeholder="Token" type="password" />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input
                                        className="custom-control-input"
                                        id="rememberMeCheckbox"
                                        type="checkbox"
                                        onChange={() => this.handleRememberMeOnChange(event)}
                                        checked={this.state.rememberMe} 
                                        />
                                        <label
                                        className="custom-control-label"
                                        htmlFor="rememberMeCheckbox"
                                        >
                                        <span className="text-muted">{this.statics.remeberMeText}</span>
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <Button
                                        className="my-4"
                                        color="primary"
                                        type="button"
                                        onClick={() => this.modalOnClickSetToken("formModal", this.state.token)}
                                        >
                                        <i className="ni ni-spaceship"></i> {this.statics.go}
                                        </Button>
                                    </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                    </Modal>
                </Container>
            </Navbar>
        );
    }
}

export default Navigator;