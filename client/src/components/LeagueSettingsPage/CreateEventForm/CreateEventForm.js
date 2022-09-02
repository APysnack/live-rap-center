import React, { useState, useEffect } from 'react';
import BasicModal from '../../SharedComponents/BasicModal';
import { CREATE_EVENT } from './gql';
import {
  eventNameField,
  eventAddressField,
  eventAdmissionField,
} from './CreateEventFormFields';
import { useMutation } from '@apollo/client';
import BaseForm from '../../SharedComponents/BaseForm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  CreateEventFormWrapper,
  DatePickerWrapper,
} from './CreateEvent.styles';
import moment from 'moment';

function CreateEventForm({ league, refetch }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);
  const [flashMessage, setFlashMessage] = useState('');
  const [createEvent, { data, loading, error }] = useMutation(CREATE_EVENT);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (data?.createEvent?.name) {
      setFlashMessage(`${data.createEvent.name} added successfully!`);
      refetch();
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  const addNewEvent = (values) => {
    if (Object.values(values).every((value) => value !== '')) {
      setModalOpen(false);
      createEvent({
        variables: {
          leagueId: league.id,
          name: values.eventName,
          admissionCost: parseInt(values.eventAdmission),
          address: values.eventAddress,
          date: selectedDate.toISOString(),
        },
      });
    }
  };

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      newValues[eventNameField.id] = eventNameField.initialValue;
      newValues[eventAddressField.id] = eventAddressField.initialValue;
      newValues[eventAdmissionField.id] = eventAdmissionField.initialValue;

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
    <CreateEventFormWrapper>
      {flashMessage ? <div>{flashMessage}</div> : null}
      <div onClick={() => setModalOpen(true)}>Create a new event</div>
      <BasicModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <DatePickerWrapper>
          <div className='sanity'>Select a Date:</div>
          <DatePicker
            selected={selectedDate}
            showTimeSelect={true}
            closeOnScroll={true}
            className='event-datepicker'
            calendarClassName='event-calendar'
            dateFormat={'MMMM d, yyyy'}
            onChange={(date) => setSelectedDate(date)}
            minDate={moment().toDate()}
          />
        </DatePickerWrapper>
        <BaseForm
          initialValues={initialValues}
          fieldArray={fieldArray}
          onSubmit={addNewEvent}
          title={'Create New Event'}
        />
      </BasicModal>
    </CreateEventFormWrapper>
  );
}

export default CreateEventForm;
