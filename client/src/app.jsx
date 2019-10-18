import React from 'react';
import Discount from './discount.jsx';
import Calendar from './calendar.jsx';
import SleepList from './sleepList.jsx';
import styles from '../styles/app.css';

const axios = require('axios');
const moment = require('moment');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookedDates: new Set(),
      dateRestrictions: {},
      discount_measure: undefined,
      discount_rate: undefined,
      leftMonth: moment(),
      rightMonth: moment().add(1, 'M'),
      selectedFirstDate: undefined,
      selectedSecDate: undefined,
      hoveredDate: undefined,
      // sleeping arrangements
      rooms: [
        { numBeds: 2, bedType: 'single' },
        {
          numBeds: 1,
          bedType: 'king'
        },
        {
          numBeds: 1,
          bedType: 'queen'
        },
        {
          numBeds: 3,
          bedType: 'single'
        }
      ],
      sleepView: 0
    };

    this.handleFwdClick = () => {
      this.setState({
        leftMonth: this.state.rightMonth,
        rightMonth: moment(this.state.rightMonth).add(1, 'M')
      });
    };

    this.handleBackClick = () => {
      this.setState({
        leftMonth: moment(this.state.leftMonth).subtract(1, 'M'),
        rightMonth: this.state.leftMonth
      });
    };

    this.handleClearClick = () => {
      this.setState({
        selectedFirstDate: undefined,
        selectedSecDate: undefined
      });
    };

    this.handleReserveClick = () => {
      const parts = document.URL.split('/');
      const lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
      const data = {
        id: lastSegment,
        checkIn: this.state.selectedFirstDate,
        checkOut: this.state.selectedSecDate
      };

      // post request
      axios
        .post(`http://localhost:3000/${lastSegment}`, data)
        .then(res => {
          console.log('done posting....');
        })
        .catch(err => {
          console.log('error posting.. ', err);
        });
    };

    this.handleHover = date => {
      this.setState({
        hoveredDate: date
      });
    };

    this.handleDateClick = date => {
      if (!this.state.selectedFirstDate) {
        this.setState({
          selectedFirstDate: date
        });
      } else if (this.state.selectedFirstDate && this.state.selectedSecDate) {
        // user can reselect date range prior to sending dates to server
        this.setState({
          selectedFirstDate: date,
          selectedSecDate: undefined
        });
      } else {
        const checkValidSecDate = this.checkDates(date);
        this.setState({
          selectedSecDate: checkValidSecDate,
          hoveredDate: undefined
        });
      }
    };

    this.checkDates = date => {
      const firstdate = moment(this.state.selectedFirstDate);
      const minDay = this.state.dateRestrictions[
        firstdate
          .format('dddd')
          .toLowerCase()
          .concat('_min')
      ];

      if (this.state.bookedDates.has(moment(date).format('YYYY-MM-DD'))) {
        return undefined;
      }

      // if sec date is before the first booked date
      // or first date is after the last booked date
      if (
        date < this.state.bookedDates.values().next().value ||
        firstdate.isAfter(Array.from(this.state.bookedDates).pop())
      ) {
        const totalDays = Math.abs(firstdate.diff(date, 'days'));
        // check if the min day and max day requirements are fulfilled
        if (totalDays >= minDay && totalDays <= this.state.dateRestrictions.max_days) {
          return date;
        }
        return undefined;
      }

      // check every date between the first and second date
      for (let i = 1; i < Math.abs(firstdate.diff(date, 'days')); i++) {
        if (this.state.bookedDates.has(firstdate.add(i, 'd').format('YYYY-MM-DD'))) {
          return undefined;
        }
      }

      return date;
    };

    // sleepArrangement handles
    this.handleSleepClick = direction => {
      this.setState({
        sleepView: this.state.sleepView + direction
      });
    };
  }

  componentDidMount() {
    const parts = document.URL.split('/');
    const lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash

    axios
      .get(`http://localhost:3000/${lastSegment}`)
      .then(res => {
        this.setState({
          bookedDates: new Set(res.data.bookedDates),
          dateRestrictions: res.data.dateRestrictions,
          discount_measure: res.data.discount_measure,
          discount_rate: res.data.discount_rate
        });
      })
      .catch(err => {
        console.log('err.. did not set state', err);
      });
  }

  render() {
    return (
      <div className={styles.overall}>
        <div className={styles.sleepContainer}>
          <h2 className={styles.h2}>Sleeping arrangements</h2>
          <SleepList
            rooms={this.state.rooms}
            sleepView={this.state.sleepView}
            handleSleepClick={this.handleSleepClick}
          />
        </div>
        <div className={styles.calendarContainer}>
          <h2 className={styles.h2}>Availability</h2>
          <Discount rate={this.state.discount_rate} measure={this.state.discount_measure} />
          <div className={styles.calendar}>
            <Calendar
              month={this.state.leftMonth}
              backButton
              fwdButton={false}
              handleFwdClick={this.handleFwdClick}
              handleBackClick={this.handleBackClick}
              bookedDates={this.state.bookedDates}
              handleDateClick={this.handleDateClick}
              dateRestrictions={this.state.dateRestrictions}
              selectedFirstDate={this.state.selectedFirstDate}
              selectedSecDate={this.state.selectedSecDate}
              handleHover={this.handleHover}
              hoveredDate={this.state.hoveredDate}
            />
            <Calendar
              month={this.state.rightMonth}
              backButton={false}
              fwdButton
              handleFwdClick={this.handleFwdClick}
              handleBackClick={this.handleBackClick}
              bookedDates={this.state.bookedDates}
              handleDateClick={this.handleDateClick}
              dateRestrictions={this.state.dateRestrictions}
              selectedFirstDate={this.state.selectedFirstDate}
              selectedSecDate={this.state.selectedSecDate}
              handleHover={this.handleHover}
              hoveredDate={this.state.hoveredDate}
            />
          </div>
          {this.state.selectedFirstDate ? (
            <div className={styles.lowerBtns}>
              <button className={styles.clearBtn} onClick={this.handleClearClick}>
                Clear dates
              </button>
              <button className={styles.reserveBtn}>Reserve</button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
