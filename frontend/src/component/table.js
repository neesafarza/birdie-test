import react, { useState, useEffect } from "react";
import { Box, DataTable, Pagination } from "grommet";
import { getEvents } from "../ApiService";

export const Table = ({
  data,
  eventTypeEnum,
  information,
  setData,
  currentPage,
  setCurrentPage,
}) => {
  const numberItems = data.count;
  const limit = 10;

  useEffect(() => {
    getEvents(information.careRecipientId, eventTypeEnum, currentPage)
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.error("Unable to get data:", error));
  }, [currentPage]);

  const handleChange = (opts) => {
    setCurrentPage(opts.page);
  };

  const columns = [
    {
      property: "visitId",
      header: "Visit Id",
    },
    {
      property: "timestamp",
      header: "Date",
      render: (datum) => new Date(datum.timestamp).toLocaleDateString("en-GB"),
      align: "end",
    },
    {
      property: "caregiverId",
      header: "Caregiver Id",
    },
  ];

  switch (eventTypeEnum) {
    case "task_completed":
      columns.push(
        {
          property: "eventInfo.task_definition_description",
          header: "Description",
          render: (datum) => datum.eventInfo.task_definition_description,
        },
        {
          property: "eventInfo.task_schedule_note",
          header: "Note",
          render: (datum) => datum.eventInfo.task_schedule_note,
        }
      );
      break;
    case "mood_observation":
      columns.push({
        property: "eventInfo",
        header: "Mood",
        render: (datum) => datum.eventInfo.mood,
      });
      break;
    case "fluid_intake_observation":
      columns.push(
        {
          property: "eventInfo.fluid",
          header: "Fluid",
          render: (datum) => datum.eventInfo.fluid,
        },
        {
          property: "eventInfo.consumed_volume_ml",
          header: "Consumed Volume",
          render: (datum) => datum.eventInfo.consumed_volume_ml,
        }
      );
      break;
    case "food_intake_observation":
      columns.push(
        {
          property: "eventInfo.meal",
          header: "Meal",
          render: (datum) => datum.eventInfo.meal,
        },
        {
          property: "eventInfo.note",
          header: "Consumed Volume",
          render: (datum) => datum.eventInfo.note,
        }
      );
      break;
    case "physical_health_observation":
    case "general_observation":
    case "mental_health_observation":
      columns.push({
        property: "eventInfo.note",
        header: "Note",
        render: (datum) => datum.eventInfo.note,
      });
      break;
    case "check_out":
      columns.push({
        property: "eventInfo.timestamp",
        header: "Checkout time",
        render: (datum) =>
          new Date(datum.eventInfo.timestamp).toLocaleTimeString("en-GB"),
      });
      break;
    default:
  }

  return (
    <Box align="center" pad="large" overflow="auto">
      <DataTable columns={columns} data={data.rows} resizeable />
      <Box>
        <Pagination
          numberItems={numberItems}
          page={currentPage}
          step={limit}
          value={currentPage}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};
