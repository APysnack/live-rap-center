import React, { useState, useEffect } from 'react';
import { CREATE_EVENT, UPDATE_EVENT } from './gql';
import {
  eventNameField,
  eventAddressField,
  eventAdmissionField,
} from './CreateEventFormFields';
import { useMutation } from '@apollo/client';
import BaseForm from '../../SharedComponents/BaseForm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerWrapper } from './CreateEvent.styles';
import moment from 'moment';

function CreateEventForm({
  league,
  refetch,
  setFlashMessage,
  setModalOpen,
  event = null,
  type,
}) {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    event?.date ? new Date(event.date) : moment().add(1, 'days').toDate()
  );
  const [createEvent, { loading }] = useMutation(CREATE_EVENT);
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [editingExistingEvent, setEditingExistingEvent] = useState(
    event ? true : false
  );

  const addNewEvent = (values) => {
    if (Object.values(values).every((value) => value !== '')) {
      if (type === 'update') {
        updateEvent({
          variables: {
            eventId: event.id,
            name: values.eventName,
            admissionCost: parseInt(values.eventAdmission),
            address: values.eventAddress,
            date: selectedDate.toISOString(),
          },
          onCompleted: (data) => updateView(data),
        });
      } else {
        createEvent({
          variables: {
            leagueId: league.id,
            name: values.eventName,
            admissionCost: parseInt(values.eventAdmission),
            address: values.eventAddress,
            date: selectedDate.toISOString(),
          },
          onCompleted: (data) => updateView(data),
        });
      }
    }
  };

  const updateView = (data) => {
    if (!editingExistingEvent) {
      setModalOpen(false);
      setFlashMessage('Event created successfully!');
      refetch();
    }
    window.location.reload();
  };

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      if (event) {
        console.log(event);
        newValues[eventNameField.id] = event.name;
        newValues[eventAddressField.id] = event.address;
        newValues[eventAdmissionField.id] = event.admissionCost;
      } else {
        newValues[eventNameField.id] = eventNameField.initialValue;
        newValues[eventAddressField.id] = eventAddressField.initialValue;
        newValues[eventAdmissionField.id] = eventAdmissionField.initialValue;
      }

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, eventNameField]);
      setFieldArray((fieldArray) => [...fieldArray, eventAddressField]);
      setFieldArray((fieldArray) => [...fieldArray, eventAdmissionField]);
    }
  }, []);

  if (loading) return 'Loading...';

  return (
    <div>
      <DatePickerWrapper>
        <div>Select a Date:</div>
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
      </DatePickerWrapper>
      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={addNewEvent}
        title={'Create New Event'}
      />
    </div>
  );
}

export default CreateEventForm;
