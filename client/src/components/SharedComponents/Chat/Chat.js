import React, { useState, useEffect } from 'react';
import BaseForm from '../BaseForm';
import { sendMessageField } from './ChatFormFields';
import ChatMessage from './ChatMessage';
import { ChatContainer, MessagesWindow } from './Chat.styles';

function Chat({ messages, onSubmit }) {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  const sendMessage = (message) => {
    onSubmit(message);
  };

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      newValues[sendMessageField.id] = sendMessageField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, sendMessageField]);
    }
  }, []);

  return (
    <ChatContainer>
      <MessagesWindow>
        {messages?.length > 0
          ? messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          : null}
      </MessagesWindow>

      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={sendMessage}
        title={''}
      />
    </ChatContainer>
  );
}

export default Chat;
