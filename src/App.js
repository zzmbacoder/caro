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
    dateDay01: '01'
  }

  constructor(props){  
    super(props);
    this.handleToSetToken.bind(this);
  }

  state = {
    token: '',
    courses: [],
    assignments: [],
    events: []
  }

  getRetrievalDateRange(startingIndex, endingIndex) {
    const range = [];
    // TODO: replace to use the following now
    // const now = new Date();
    const now = new Date(this.statics.dateYear2020, this.statics.dateMonth03, this.statics.dateDay01);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));

    range.push(moment(new Date(today.setDate(lastSunday.getDate() + 0))).local().format("YYYY-MM-DD"));
    range.push(moment(new Date(today.setDate(lastSunday.getDate() + 6))).local().format("YYYY-MM-DD"));

    return range;
  }

  handleToSetToken(token){
    this.setState({ token: token }, this.setTokenCallBack);
  }

  setTokenCallBack()  {
    this.setState({
      courses: [],
      assignments: [],
      events: []
    })
    this.retrieveCourseInfoFromCanvas(this.state.token, true);
  }

  setUpWeekAssignments() {
    const assignments = [];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));

    for (let i = 0; i < 7; i++) {
      assignments.push({
        date: new Date(today.setDate(lastSunday.getDate() + i))
      });
    }
    return assignments;
  }

  retrieveCourseInfoFromCanvas(token, activeEnrollment) {
    const url = this.statics.coursesEndpoint + (activeEnrollment ? '?enrollment_state=active' : '');
    fetch(url, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': token
      }
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ courses: data });
      return data;
    })
    .then((data) => {
      const timeRange = this.getRetrievalDateRange();
      for (let i = 0; i < data.length; i++) {
        this.retrieveCalendarItemsForCourse(token, data[i].id, this.statics.assignment, timeRange[0], timeRange[1], this.statics.defaultFetchPageSize);
        this.retrieveCalendarItemsForCourse(token, data[i].id, this.statics.event, timeRange[0], timeRange[1], this.statics.defaultFetchPageSize);
      }
    })
    .catch(console.log) 
  }

  retrieveCalendarItemsForCourse(token, courseId, type, startDate, endDate, maxPerPage) {
    const url = this.statics.calendarEndpoint + '?type=' + (type === this.statics.event ? this.statics.event : this.statics.assignment) + '&context_codes=course_' + courseId + '&start_date=' + startDate + '&end_date=' + endDate + '&per_page=' + maxPerPage;
    fetch(url, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': token
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
  }

  render() {
    const handleToSetToken = this.handleToSetToken;
    return (
      <div className="container">
        <Navigator handleToSetToken={handleToSetToken.bind(this)} />
        <Tabs courses={this.state.courses} assignments={this.state.assignments} events={this.state.events} />
        <Footer />
      </div>
    );
  }
}

export default App;
