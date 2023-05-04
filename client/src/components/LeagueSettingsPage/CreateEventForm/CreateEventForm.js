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
import { CreateEventContainer } from './CreateEvent.styles';
import moment from 'moment';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

function CreateEventForm({
  league,
  refetch,
  setModalOpen,
  event = null,
  type,
  title = 'New Event',
}) {
  const [country, setCountry] = useState(
    event?.location?.country ? event.location.country : 'United States'
  );
  const [region, setRegion] = useState(
    event?.location?.region ? event.location.region : ''
  );
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
    if (
      country !== '' &&
      region !== '' &&
      Object.values(values).every((value) => value !== '')
    ) {
      if (type === 'update') {
        updateEvent({
          variables: {
            eventId: event.id,
            name: values.eventName,
            country: country,
            region: region,
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
            country: country,
            region: region,
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
      refetch();
    }
    window.location.reload();
  };

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      if (event) {
        newValues[eventNameField.id] = event.name;
        newValues[eventAdmissionField.id] = event.admissionCost;
        newValues[eventAddressField.id] = event.address;
      } else {
        newValues[eventNameField.id] = eventNameField.initialValue;
        newValues[eventAdmissionField.id] = eventAdmissionField.initialValue;
        newValues[eventAddressField.id] = eventAddressField.initialValue;
      }

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, eventNameField]);
      setFieldArray((fieldArray) => [...fieldArray, eventAdmissionField]);
      setFieldArray((fieldArray) => [...fieldArray, eventAddressField]);
    }
  }, []);

  if (loading) return 'Loading...';

  return (
    <CreateEventContainer>
      <div className='header-container'>{title}</div>
      <div className='form-container'>
        <div className='datepicker-wrapper'>
          <div className='subheading'>Date and location</div>
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
        <CountryDropdown
          className='location-selector'
          value={country}
          onChange={(value) => setCountry(value)}
        />
        <RegionDropdown
          className='location-selector'
          country={country}
          value={region}
          onChange={(value) => setRegion(value)}
        />
      </div>
      <div className='form-container'>
        <div className='subheading'>Event details</div>
        <BaseForm
          initialValues={initialValues}
          fieldArray={fieldArray}
          onSubmit={addNewEvent}
          title={''}
          width='25vw'
        />
      </div>
    </CreateEventContainer>
  );
}

export default CreateEventForm;
