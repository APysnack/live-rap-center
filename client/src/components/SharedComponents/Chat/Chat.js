import React, { useState, useEffect } from "react";
import BaseForm from "../BaseForm";
import { sendMessageField } from "./ChatFormFields";

function Chat({ messages, title, onSubmit }) {
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
    <div>
      {messages?.length > 0
        ? messages.map((message) => (
            <div key={message.id}>
              <div>{message.attributes.username}</div>
              <div>{message.attributes.body}</div>
            </div>
          ))
        : null}
      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={sendMessage}
        title={"Add New Battle"}
      />
    </div>
  );
}

export default Chat;
