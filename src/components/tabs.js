import React from "react";
import Collapsible from 'react-collapsible';
import classnames from "classnames";
import moment from "moment";
// eslint-disable-next-line
import timezone from "moment-timezone";

import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";

class Tabs extends React.Component {
    statics = {
        course_: 'course_',
        dateYear2020: '2020',
        dateMonth03: '02',
        dateDay01: '01',
        courseSessionsText: 'Course Sessions',
        assignments: 'Assignments',
        dateText: 'Date',
        dueDateText: 'Due Date',
        linkText: 'Link',
        viewInCanvasText: 'View in Canvas',
        showDetails: 'Show Details',
        nothingToPrepareText: 'Nothing to prepare for this day.',
        nothingDueText: 'Nothing is due on this day.',
        zoomLink: 'https://zoom.us/'
    };

    state = {
        tabs: 0,
        dates: this.getAvailableDates(0, 7),
        tomorrows: this.getAvailableDates(1, 8)
    };

    getAvailableDates(startingIndex, endingIndex) {
        const dates = [];
        // TODO: replace to use the following now
        // const now = new Date();
        const now = new Date(this.statics.dateYear2020, this.statics.dateMonth03, this.statics.dateDay01);
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));

        for (let i = startingIndex; i < endingIndex; i++) {
            dates.push(new Date(today.setDate(lastSunday.getDate() + i)));
        }
        return dates;
    }

    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        });
    };

    getDayForWeek(index, isShort) {
        switch(index) {
            case 0:
                return isShort ? 'U.' : 'Sun.';
            case 1:
                return isShort ? 'M.' : 'Mon.';
            case 2:
                return isShort ? 'T.' : 'Tue.';
            case 3:
                return isShort ? 'W.' : 'Wed.';
            case 4:
                return isShort ? 'R.' : 'Thu.';
            case 5:
                return isShort ? 'F.' : 'Fri.';
            case 6:
                return isShort ? 'S.' : 'Sat.';
            default:
                return isShort ? 'U.' : 'Sun.';
        }
    }

    getTimeZoneName() {
        const timeZone = moment.tz.guess();
        const time = new Date();
        const timeZoneOffset = time.getTimezoneOffset();
        const timeZoneName = moment.tz.zone(timeZone).abbr(timeZoneOffset);
        return timeZoneName;
    }

    getCourseIdToNames() {
        const courseIdToNames = {};
        for (let i = 0; i < this.props.courses.length; i++) {
            const course = this.props.courses[i];
            courseIdToNames[course.id] = course.name;
        }
        return courseIdToNames;
    }

    // Assignment menthods
    getCalendarItemsByDueDate(isCalendarEvent) {
        const calendarItemsByDueDate = {};
        const items = isCalendarEvent ? this.props.events : this.props.assignments;
        for (let i = 0; i < this.state.dates.length; i++) {
            const date = this.state.dates[i];
            if (!calendarItemsByDueDate.hasOwnProperty(date)) {
                calendarItemsByDueDate[date] = {};
            }

            for (let j = 0; j < items.length; j++) {
                const item = items[j];
                if (!isCalendarEvent || (item.hasOwnProperty("hidden") && !item.hidden)) {
                    const dueDate = item.end_at;
                    if (moment(dueDate).isAfter(date) && moment(dueDate).isBefore(this.state.tomorrows[i])) {
                        // For calendar event, all_context_codes is the courseId. For assignments, context_code is the courseId.
                        const courseIdAttributeName = !isCalendarEvent ? item.context_code : item.all_context_codes.split(',')[0];
                        if (!calendarItemsByDueDate[date].hasOwnProperty(courseIdAttributeName)) {
                            calendarItemsByDueDate[date][courseIdAttributeName] = [];
                        }
    
                        if (calendarItemsByDueDate.hasOwnProperty(date) && calendarItemsByDueDate[date].hasOwnProperty(courseIdAttributeName)) {
                            calendarItemsByDueDate[date][courseIdAttributeName].push(item);
                        }
                    }
                }
            }
        }
        return calendarItemsByDueDate;
    }

    getCalendarItemNames(key, timeZoneName, isCalendarEvent) {
        return <Row key={(isCalendarEvent ? 'event' : 'assignment') + 'Name' + key}>
                    <Col key="1" sm="6">
                    <i className={isCalendarEvent ? "ni ni-atom" : "ni ni-ruler-pencil"}></i> <strong>{isCalendarEvent ? this.statics.courseSessionsText : this.statics.assignments}</strong>
                    </Col>
                    <Col key="2" sm="4">
                    <i className={isCalendarEvent ? "ni ni-calendar-grid-58" : "ni ni-calendar-grid-58"}></i> <strong>{isCalendarEvent ? this.statics.dateText : this.statics.dueDateText} ({timeZoneName})</strong>
                    </Col>
                    <Col key="3" sm="2">
                    <i className={isCalendarEvent ? "ni ni-curved-next" : "ni ni-curved-next"}></i> <strong>{this.statics.linkText}</strong>
                    </Col>
                </Row>
    }

    getZoomLinkFromLocationIfAvailable(calendarItem, time) {
        const location = calendarItem.location_name;
        const formatedTime = time ? moment(time).local().format('M/D/YYYY HH:mm') : '';
        if (location && location.startsWith(this.statics.zoomLink)) {
            // eslint-disable-next-line
            return <a href={location} target="_blank">{formatedTime}</a>
        } else {
            return formatedTime;
        }
    }

    getCalendarItemDetails(key, calendarItem, time, itemDescription, isCalendarEvent) {
        return <div key={key}>
                <Row key={(isCalendarEvent ? 'event' : 'assignment') + 'Details' + key}>
                        <Col sm="6"> 
                            {calendarItem.title ? calendarItem.title : ''}
                        </Col>
                        <Col sm="4">
                            {this.getZoomLinkFromLocationIfAvailable(calendarItem, time)}
                        </Col>
                        <Col sm="2">
                            {/* eslint-disable-next-line */}
                            {calendarItem.html_url ? <a href={calendarItem.html_url} target="_blank">{this.statics.viewInCanvasText}</a> : ''}
                        </Col>                     
                    </Row>
                    {(isCalendarEvent && itemDescription?
                        <Row key={'eventDescription' + key}>
                            <Col sm="12">
                                <Collapsible trigger={this.getShowMoreTriggerLink()}>
                                    {this.getDescriptionAsHtml(itemDescription)}
                                </Collapsible>
                            </Col>
                        </Row> : 
                    '')}          
            </div>
    }

    getDescriptionAsHtml(itemDescription) {
        return <p className="description" dangerouslySetInnerHTML={this.createMarkup(itemDescription)} />;
    }

    createMarkup(itemDescription) {
        return {__html: itemDescription};
    }

    getShowMoreTriggerLink() {
        // eslint-disable-next-line
        return <strong><a href="#">{this.statics.showDetails}</a></strong>;
    }

    getInfoCardDetails(key, courseName, calendarItemDetails, isCalendarEvent) {
        return <div className="description infoCard" key={(isCalendarEvent ? 'event' : 'assignment') + 'InfoCardDetails' + key}>
                    <Row>
                        <Col sm="12" className="h6">
                            <strong>{courseName}</strong>
                        </Col>
                    </Row>
                    {calendarItemDetails}
            </div>
    }

    getInfoCardDetailsPlaceHolder(isCalendarEvent) {
        return <div className="description infoCard">
                    <Row>
                        <Col sm="12">
                            {isCalendarEvent ? this.statics.nothingToPrepareText : this.statics.nothingDueText}
                        </Col>
                    </Row>
                </div>
    }

    getDateTab(nthDayOfWeek, date) {
        const dayOfWeekLong = this.getDayForWeek(nthDayOfWeek, false);
        const dayOfWeekShort = this.getDayForWeek(nthDayOfWeek, true);
        return  <div>
                    <span className="dateTabLong">{dayOfWeekLong} {moment(date).local().format("M/D/YYYY")}</span>
                    <span className="dateTabShort">{dayOfWeekShort} {moment(date).local().format("M/D")}</span>
                </div>
    }

    setUpDateTabsAndDetails(dateTabs, infoCards, isCalendarEvent) {
        const timeZoneName = this.getTimeZoneName();
        const courseIdToNames = this.getCourseIdToNames();
        const calendarItemsByDueDate = this.getCalendarItemsByDueDate(isCalendarEvent);

        for (let i = 0; i < this.state.dates.length; i++) {
            const infoCardDetails = [];
            const date = this.state.dates[i];
            const calendarItemsOnDate = calendarItemsByDueDate[date];
            const courseNamesOrdered = Object.keys(calendarItemsOnDate);
            courseNamesOrdered.sort();
            for (let j = 0; j < courseNamesOrdered.length; j++) {
                const calendarItems = calendarItemsOnDate[courseNamesOrdered[j]];
                const calendarItemDetails = [];
                for (let k = 0; k < calendarItems.length; k++) {
                    const calendarItem = calendarItems[k];
                    const itemDescription = calendarItem.description ? calendarItem.description : '';
                    // For assignment we care about due time. For calendar events we care about the start time.
                    const time = isCalendarEvent ? calendarItem.start_at : calendarItem.end_at;
                    if ( k === 0) {
                        calendarItemDetails.push(
                            this.getCalendarItemNames(k, timeZoneName, isCalendarEvent)
                        );
                    }

                    calendarItemDetails.push(
                        this.getCalendarItemDetails(k, calendarItem, time, itemDescription, isCalendarEvent)
                    );
                }
                infoCardDetails.push(
                    this.getInfoCardDetails(j, courseIdToNames[courseNamesOrdered[j].substring(this.statics.course_.length)], calendarItemDetails, isCalendarEvent)
                );
            }

            dateTabs.push(
                <NavItem key={i}>
                    <NavLink
                        key={i}
                        aria-selected={this.state.tabs === i}
                        className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.tabs === i
                        })}
                        onClick={e => this.toggleNavs(e, "tabs", i)}
                        href="#"
                        role="tab"
                    >
                        {this.getDateTab(i, date)}
                    </NavLink>
                </NavItem>
            );

            let tabName = "tabs" + i;
            infoCards.push(
                <TabPane key={i} tabId={tabName}>
                    {
                    infoCardDetails.length !== 0 ?                 
                    <div key={'infoCard' + i} className="description">
                        {infoCardDetails}
                    </div> : 
                    this.getInfoCardDetailsPlaceHolder(isCalendarEvent)
                    }
                </TabPane>
            );
        }
    }

    render() {
        const dateTabs = [];
        const infoCards = [];
        this.setUpDateTabsAndDetails(dateTabs, infoCards, false);

        const eventDateTabs = [];
        const eventInfoCards = [];
        this.setUpDateTabsAndDetails(eventDateTabs, eventInfoCards, true);
        
        return (
            <div className="tabsContainer">
                <div className="nav-wrapper">
                    <Nav
                        className="nav-fill flex-column flex-md-row"
                        id="tabs-icons-text"
                        pills
                        role="tablist"
                    >
                        {dateTabs}
                    </Nav>
                </div>
                <span className="lead"><strong>{this.statics.assignments}</strong></span>
                <Card className="shadow">
                    <CardBody>
                        <TabContent activeTab={"tabs" + this.state.tabs}>
                            {infoCards}
                        </TabContent>
                    </CardBody>
                </Card>
                <div className="lead"><strong>{this.statics.courseSessionsText}</strong></div>
                <Card className="shadow">
                    <CardBody>
                        <TabContent activeTab={"tabs" + this.state.tabs}>
                            {eventInfoCards}
                        </TabContent>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Tabs;