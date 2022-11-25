import React, { useState } from "react";
import { Box, Button, Form, FormField, TextInput } from "grommet";
import { Dashboard } from "./dashboard";

export const MainPage = () => {
  const [state, setState] = useState("");
  const onChange = (event) => {
    setState(event.target.value);
  };

  return (
    <Box align="center" pad="large">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(state);
        }}
      >
        <FormField label="Care Recipient Id" htmlFor="text-input">
          <TextInput
            id="text-input"
            placeholder="e.g df50cac5-293c-490d-a06c-ee26796f850d"
            onChange={onChange}
            value={state}
          />
        </FormField>
        <Button type="submit" label="submit" />

        <Dashboard />
      </Form>
    </Box>
  );
};
