import React, { useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { BattlerBookingFormContainer } from './BookingForm.styles';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { removeNonNumerics } from '../../utils/helperFunctions';
import { useMutation } from '@apollo/client';
import { CREATE_BATTLER_BOOKING_OFFER } from './gql';
import {
  NUMBER_OF_MINUTES_OPTIONS,
  NUMBER_OF_ROUNDS_OPTIONS,
} from './Constants';

function BattlerBookingForm({ battler, booker }) {
  const [createBattlerBookingOffer] = useMutation(CREATE_BATTLER_BOOKING_OFFER);
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

  const handleSubmit = () => {
    createBattlerBookingOffer({
      variables: {
        battlerId: battler.id,
        bookerUserId: booker.id,
        numberOfRounds: numberOfRounds.value,
        minutesPerRound: numberOfMinutes.value,
        amountOffered: parseInt(priceOffer),
        comments: comment,
        bookingDate: selectedDate.toISOString(),
      },
    });
  };

  return (
    <BattlerBookingFormContainer>
      <div className='static-container'>
        <div>Requesting to book {battler.name}</div>
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
      <div className='field-container'>
        <div>Additional Comments: </div>
        <textarea
          onChange={(event) => setComment(event.target.value)}
        ></textarea>
      </div>
      <div onClick={handleSubmit}>Submit</div>
    </BattlerBookingFormContainer>
  );
}

export default BattlerBookingForm;
