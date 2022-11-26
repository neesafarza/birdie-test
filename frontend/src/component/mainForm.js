import React from "react";
import styled from "styled-components";
import { Box, Button, Form, FormField, TextInput, Select } from "grommet";
import { getEvents } from "../ApiService";
import { getKeyByValue } from "../helper";
import { eventTypeOptions } from "../helper";

export const MainForm = ({
  setData,
  setTableHeader,
  information,
  setInformation,
  currentPage,
  setCurrentPage,
}) => {
  const handleChange = (evt) => {
    setData("");
    setInformation("");
    setTableHeader("");
    setCurrentPage(1);
    const value = evt.target.value;
    setInformation({
      ...information,
      [evt.target.name]: value,
    });
  };

  const careRecipientIdValidation = /[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}/g;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableHeader(e.value.eventType);
    getEvents(
      e.value.careRecipientId,
      getKeyByValue(eventTypeOptions, e.value.eventType),
      currentPage
    ).then((res) => {
      setData(res);
    });
  };

  return (
    <Box display="flex">
      <CustomForm
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <FormFieldContainer validate="change">
          <FormField
            label="Care Recipient Id"
            htmlFor="text-input"
            name="careRecipientId"
            required
            validate={{
              regexp: careRecipientIdValidation,
              message: "Must enter a valid Id",
              status: "error",
            }}
          >
            <TextInput
              id="text-input"
              name="careRecipientId"
              placeholder="e.g df50cac5-293c-490d-a06c-ee26796f850d"
              value={information.careRecipientId}
              onChange={handleChange}
            />
          </FormField>
        </FormFieldContainer>
        <FormFieldContainer>
          <FormField label="Event" name="eventType" required>
            <Select
              id="select"
              name="eventType"
              placeholder="Select"
              value={information.eventType}
              options={Object.values(eventTypeOptions)}
              onChange={handleChange}
            />
          </FormField>
        </FormFieldContainer>
        <SubmitButton type="submit" label="submit" />
      </CustomForm>
    </Box>
  );
};

const CustomForm = styled(Form)`
  display: flex;
  justify-content: flex-start;
  margin: 2rem;
`;

const SubmitButton = styled(Button)`
  display: block;
  height: 2.3rem;
  margin: 2rem;
`;

const FormFieldContainer = styled.div`
  margin-right: 1.5rem;
`;
