import React, { useState } from "react";
import { Box, Select } from "grommet";

export const Dashboard = () => {
  const options = [
    "Task completed",
    "Fluid intake observation",
    "Incontinence pad observation",
    "Check out",
    "Visit completed",
    "Regular medication taken",
    "Food intake observation",
    "General observation",
    "Physical health observation",
    "Mental health observation",
  ];

  const [value, setValue] = useState("");

  return (
    <Box fill align="center" justify="start" pad="large" gap="medium">
      <Select
        id="select"
        name="select"
        placeholder="Select"
        value={value}
        options={options}
        onChange={({ option }) => setValue(option)}
      />
    </Box>
  );
};
