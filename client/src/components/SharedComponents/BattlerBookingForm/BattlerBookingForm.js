import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { BattlerBookingFormContainer } from './BattlerBookingForm.styles';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import {
  removeNonNumerics,
  convertFloatToMinuteFormat,
} from '../../../utils/helperFunctions';
import {
  NUMBER_OF_MINUTES_OPTIONS,
  NUMBER_OF_ROUNDS_OPTIONS,
} from './Constants';

function BattlerBookingForm({
  battler,
  onSubmit,
  onDeny,
  fullForm = true,
  defaultData = {},
}) {
  const [priceOffer, setPriceOffer] = useState(0);
  const [numberOfRounds, setNumberOfRounds] = useState(
    NUMBER_OF_ROUNDS_OPTIONS[2]
  );
  const [numberOfMinutes, setNumberOfMinutes] = useState(
    NUMBER_OF_MINUTES_OPTIONS[2]
  );
  const [selectedDate, setSelectedDate] = useState(
    moment().add(1, 'days').toDate()
  );
  const [comment, setComment] = useState('');

  const handleTextInput = (event) => {
    setPriceOffer(removeNonNumerics(event.target.value));
  };

  useEffect(() => {
    if (Object.keys(defaultData).length > 1) {
      setNumberOfRounds({
        label: defaultData.numberOfRounds.toString(),
        value: defaultData.numberOfRounds,
      });
      setNumberOfMinutes({
        label: convertFloatToMinuteFormat(defaultData.minutesPerRound),
        value: defaultData.minutesPerRound,
      });

      setPriceOffer(defaultData.amountOffered);
      setSelectedDate(moment(defaultData.date).toDate());
    }
  }, [defaultData]);

  const handleSubmit = () => {
    onSubmit(
      numberOfRounds.value,
      numberOfMinutes.value,
      parseInt(priceOffer),
      comment,
      selectedDate.toISOString()
    );
  };

  const handleDeny = () => {
    onDeny();
  };

  return (
    <BattlerBookingFormContainer>
      {fullForm ? (
        <div className='static-container'>
          <div>
            Requesting to book {battler?.name ? battler.name : ' battler'}
          </div>
          {battler.bookingPrice ? (
            <div className='field-container'>
              <div>{`Suggested Price for ${
                numberOfMinutes.value * numberOfRounds.value
              } minutes: `}</div>
              <div>{`$${
                numberOfMinutes.value *
                numberOfRounds.value *
                battler.bookingPrice
              }`}</div>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className='field-container'>
        <div>Date: </div>
        <div>
          <DatePicker
            selected={selectedDate}
            showTimeSelect={true}
            closeOnScroll={true}
            className='event-datepicker'
            calendarClassName='event-calendar'
            dateFormat={'MMMM d, yyyy'}
            onChange={(date) => setSelectedDate(date)}
            minDate={moment().add(1, 'days').toDate()}
          />
        </div>
      </div>
      <div className='field-container'>
        <div>Number of rounds: </div>
        <Select
          className='select-rounds'
          options={NUMBER_OF_ROUNDS_OPTIONS}
          value={numberOfRounds}
          onChange={(selection) => setNumberOfRounds(selection)}
        />
      </div>
      <div className='field-container'>
        <div>Minutes per round: </div>
        <Select
          className='select-minutes'
          options={NUMBER_OF_MINUTES_OPTIONS}
          value={numberOfMinutes}
          onChange={(selection) => setNumberOfMinutes(selection)}
        />
      </div>
      <div className='field-container'>
        <div>{`Amount offered: $ `} </div>
        <input
          type='text'
          value={priceOffer}
          onChange={handleTextInput}
        ></input>
      </div>
      {fullForm ? (
        <div className='field-container'>
          <div>Additional Comments: </div>
          <textarea
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
        </div>
      ) : null}
      {fullForm ? (
        <div onClick={handleSubmit}>Submit</div>
      ) : (
        <div>
          <div onClick={handleSubmit}>Accept</div>
          <div onClick={handleDeny}>Deny</div>
        </div>
      )}
    </BattlerBookingFormContainer>
  );
}

export default BattlerBookingForm;
