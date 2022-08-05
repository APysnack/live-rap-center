import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ASSIGN_AWARD, GET_AWARDS } from './gql';
import { useQuery } from '@apollo/client';
import { Formik, Field, Form } from 'formik';
import { useMutation } from '@apollo/client';

function AssignAwardForm() {
  const [awardId, setAwardId] = useState('');

  const { loading, data, refetch } = useQuery(GET_AWARDS);
  const [assignAward] = useMutation(ASSIGN_AWARD);

  const handleChange = (event) => {
    setAwardId(event.target.value);
  };

  const assignTo = (values) => {
    if (awardId !== '' && values.recipientId !== '') {
      assignAward({
        variables: {
          awardId: awardId,
          recipientId: values.recipientId,
        },
      });
    }
  };

  if (loading) return 'Loading...';

  return (
    <div>
      {data?.awards?.length > 0 ? (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Awards</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={awardId ? awardId : ''}
              label='Award'
              onChange={handleChange}
            >
              {data.awards.map((award) => (
                <MenuItem key={award.id} value={award.id}>
                  {award.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) : null}
      <Formik
        initialValues={{
          recipientId: '',
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          assignTo(values);
        }}
      >
        <Form>
          <label htmlFor='recipientId'>
            Recipient ID: Battler/League/Voter
          </label>
          <Field
            id='recipientId'
            name='recipientId'
            placeholder='Enter recipient ID'
          />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AssignAwardForm;
