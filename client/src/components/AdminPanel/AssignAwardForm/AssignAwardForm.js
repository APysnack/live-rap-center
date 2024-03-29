import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { ASSIGN_AWARD, GET_AWARDS } from './gql';
import { useQuery } from '@apollo/client';
import { Formik, Field, Form } from 'formik';
import { useMutation } from '@apollo/client';
import { AssignAwardFormContainer } from './AssignAwardForm.styles';
import { useTheme } from 'styled-components';
import StyledSelect from '../../SharedComponents/StyledSelect/StyledSelect';
import Loading from '../../SharedComponents/Loading/Loading';

function AssignAwardForm() {
  const { loading, data, refetch } = useQuery(GET_AWARDS);
  const [assignAward] = useMutation(ASSIGN_AWARD);
  const [selectedOption, setSelectedOption] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);

  const theme = useTheme();
  const reactSelectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: theme.primaryContrast,
      color: theme.primary,
      width: '14vw',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: theme.secondary,
      color: theme.fontColor,
    }),
  };

  useEffect(() => {
    if (data?.awards?.length > 0) {
      const options = data.awards.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
      setMenuOptions(options);
      setSelectedOption(options[0]);
    }
  }, [data]);

  const handleChange = (newSelection) => {
    setSelectedOption(newSelection);
  };

  const assignTo = (values) => {
    if (selectedOption?.value !== '' && values.recipientId !== '') {
      assignAward({
        variables: {
          awardId: selectedOption.value,
          recipientId: values.recipientId,
        },
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <AssignAwardFormContainer>
      {data?.awards?.length > 0 ? (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <StyledSelect
              styles={reactSelectStyles}
              options={menuOptions}
              value={selectedOption}
              onChange={(selection) => handleChange(selection)}
            ></StyledSelect>
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
          <Field
            id='recipientId'
            name='recipientId'
            placeholder='Enter recipient ID'
            autocomplete='off'
          />
          <button className='lrc-button form-submit-btn' type='submit'>
            Submit
          </button>
        </Form>
      </Formik>
    </AssignAwardFormContainer>
  );
}

export default AssignAwardForm;
