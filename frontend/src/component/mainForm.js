import React, { useState } from "react";
import { Box, Button, Form, FormField, TextInput, Select } from "grommet";
import { getEvents } from "../ApiService";
import { getKeyByValue } from "../helper";
import { eventTypeOptions } from "../helper";

export const MainForm = ({
  setData,
  setTableHeader,
  currentPage,
  information,
  setInformation,
}) => {
  function handleChange(evt) {
    const value = evt.target.value;
    setTableHeader(value);
    setInformation({
      ...information,
      [evt.target.name]: value,
    });
  }

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
    <>
      <Box align="center" pad="large" direction="row" justify="between">
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Box>
            <FormField label="Care Recipient Id" htmlFor="text-input">
              <TextInput
                id="text-input"
                name="careRecipientId"
                placeholder="e.g df50cac5-293c-490d-a06c-ee26796f850d"
                value={information.careRecipientId}
                onChange={handleChange}
              />
            </FormField>
          </Box>
          <Box>
            <FormField label="Event">
              <Select
                id="select"
                name="eventType"
                placeholder="Select"
                value={information.eventType}
                options={Object.values(eventTypeOptions)}
                onChange={handleChange}
              />
            </FormField>
          </Box>
          <Button type="submit" label="submit" />
        </Form>
      </Box>
    </>
  );
};
