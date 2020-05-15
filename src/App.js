import React, { Component } from 'react';
import Navigator from './components/navigator';
import Tabs from './components/tabs';
import Footer from './components/footer';
import fetch from 'isomorphic-fetch';
import moment from "moment";
// eslint-disable-next-line
import timezone from "moment-timezone";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/css/argon-design-system-react.css";
import "./App.css";

import {
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

require('es6-promise').polyfill();

class App extends Component {
  statics = {
    coursesEndpoint: 'https://3e8n0jv4dj.execute-api.us-east-1.amazonaws.com/staging/courses',
    calendarEndpoint: 'https://3e8n0jv4dj.execute-api.us-east-1.amazonaws.com/staging/calendar_events',
    assignment: 'assignment',
    event: 'event',
    defaultFetchPageSize: 100,
    dateYear2020: '2020',
    dateMonth03: '02',
    dateDay01: '01',
    tokenMinLength: 10,
    bearer: 'Bearer ',
    invalidTokenProvided: "Your token doesn't seem right.",
    malformedTokenProvided: 'Invalid token provided!',
    putInYourCbsCanvas: 'Put in your CBS Canvas account token below:',
    remeberMeText: 'Remember me',
    go: 'Go!',
    http_401: 401
  }

  constructor(props){  
    super(props);
    this.handleToSetToken.bind(this);
    this.weekToggleHandler = this.weekToggleHandler.bind(this);

  }

  state = {
    token: '',
    defaultModal: false,
    rememberMe: false,
    tokenError: '',
    weekDayRange: this.getCurrentWeekDayRange(new Date()),
    courses: [],
    assignments: [],
    events: []
  }

  toggleModal = state => {
      this.setState({
          [state]: !this.state[state]
      });
  };

  weekToggleHandler(startDate) {
    this.setState({ 
      weekDayRange: this.getCurrentWeekDayRange(startDate),
      courses: [],
      assignments: [],
      events: []
    }, this.retrieveCourseInfoFromCanvas(this.state.token, true, true));
  }

  modalOnClickSetToken(tokenValue) {
      const tokenProvided = tokenValue && tokenValue.length > this.statics.tokenMinLength;
      if (!tokenProvided) {
          this.setState({ tokenError: this.statics.malformedTokenProvided });
          return;
      }

      if (tokenProvided) {
          this.handleToSetToken(tokenValue);
      }
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
                  <div className="alert-inner--icon">
                      <i className="ni ni-fat-remove invalidTokenErrorMsg" />
                  </div>
                  <div className="alert-inner--text">
                      {this.state.tokenError}
                  </div>
              </Alert>
  }

  getCurrentWeekDayRange(now) {
    const range = [];
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));

    range.push(moment(new Date(today.setDate(lastSunday.getDate() + 0))).local().format("YYYY-MM-DD"));
    range.push(moment(new Date(today.setDate(lastSunday.getDate() + 6))).local().format("YYYY-MM-DD"));

    return range;
  }

  handleToSetToken(token){
    this.setState({ token: token }, this.setTokenCallBack(token));
  }

  setTokenCallBack(token)  {
    this.setState({
      courses: [],
      assignments: [],
      events: []
    })
    this.retrieveCourseInfoFromCanvas(token, true, false);

    // Store the token into browser localStorage if remember me is checked
    const rememberMe = this.state.rememberMe;
    localStorage.setItem('rememberMe', rememberMe);
    localStorage.setItem('token', rememberMe ? token : '');

    if (!rememberMe) {
        this.setState({ token: '' });
    }
  }

  retrieveCourseInfoFromCanvas(token, activeEnrollment, skipToggleModal) {
    const url = this.statics.coursesEndpoint + (activeEnrollment ? '?enrollment_state=active' : '');
    fetch(url, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': this.statics.bearer + token
      }
    })
    .then((res) => {
      if (res.status === this.statics.http_401) {
        this.setState({ tokenError: this.statics.invalidTokenProvided });
        throw new Error("unauthorized request");
      }

      return res.json()
    })
    .then((data) => {
      this.setState({ courses: data });
      return data;
    })
    .then((data) => {
      const timeRange = this.state.weekDayRange;
      for (let i = 0; i < data.length; i++) {
        this.retrieveCalendarItemsForCourse(token, data[i].id, this.statics.assignment, timeRange[0], timeRange[1], this.statics.defaultFetchPageSize);
        this.retrieveCalendarItemsForCourse(token, data[i].id, this.statics.event, timeRange[0], timeRange[1], this.statics.defaultFetchPageSize);
      }
    })
    .then(() => {
      if (!skipToggleModal) this.toggleModal('formModal');
    })
    .catch(console.log);
  }

  retrieveCalendarItemsForCourse(token, courseId, type, startDate, endDate, maxPerPage) {
    const url = this.statics.calendarEndpoint + '?type=' + (type === this.statics.event ? this.statics.event : this.statics.assignment) + '&context_codes=course_' + courseId + '&start_date=' + startDate + '&end_date=' + endDate + '&per_page=' + maxPerPage;
    fetch(url, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': this.statics.bearer + token
      }
    })
    .then(res => res.json())
    .then((data) => {
      if (type === this.statics.event) {
        let joined = this.state.events.concat(data);  
        this.setState({ events: joined })
      } else {
        let joined = this.state.assignments.concat(data);  
        this.setState({ assignments: joined })
      }
      return data;
    })
    .catch(console.log)
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

  getTokenInputModal() {
    return  <Modal
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
                          {this.state.tokenError ? this.getInvalidTokenErrorMessage() : ''}
                          <Form role="form">
                          <FormGroup>
                              <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                  </InputGroupText>
                              </InputGroupAddon>
                              <Input value={this.state.token} onChange={() => this.handleTokenInput(window.event)} placeholder="Token" type="password" />
                              </InputGroup>
                          </FormGroup>
                          <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                              className="custom-control-input"
                              id="rememberMeCheckbox"
                              type="checkbox"
                              onChange={() => this.handleRememberMeOnChange(window.event)}
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
                              onClick={() => this.modalOnClickSetToken(this.state.token)}
                              >
                              <i className="ni ni-spaceship"></i> {this.statics.go}
                              </Button>
                          </div>
                          </Form>
                      </CardBody>
                  </Card>
              </div>
            </Modal>
  }

  render() {
    return (
      <div className="container">
        <Navigator />
        {this.getTokenInputModal()}
        <Tabs courses={this.state.courses} assignments={this.state.assignments} events={this.state.events} weekToggleHandler={this.weekToggleHandler} />
        <Footer />
      </div>
    );
  }
}

export default App;
