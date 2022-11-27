import { MainApp } from "./mainApp";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../ApiService";
import { getKeyByValue } from "../helper";

jest.mock("../ApiService");

window.scrollTo = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});
describe("Main App", () => {
  const careId = "df50cac5-293c-490d-a06c-ee26796f850d";
  const eventType = "Mood Observation";
  const eventTypeEnum = getKeyByValue(eventType);
  getEvents.mockResolvedValue({
    count: 1,
    rows: [
      {
        id: "01f547a3-7eb1-48f0-86d2-ddc996abd617",
        eventType: "mood_observation",
        visitId: "2ddc77cd-521f-11e9-b63f-06a80bfbb33e",
        timestamp: "2019-05-10T12:27:21+01:00",
        caregiverId: "5ca42f72-9e70-4b8d-b8be-da5ed779b586",
        careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
        eventInfo: {
          id: "01f547a3-7eb1-48f0-86d2-ddc996abd617",
          mood: "okay",
          visit_id: "2ddc77cd-521f-11e9-b63f-06a80bfbb33e",
          timestamp: "2019-05-10T12:27:21+01:00",
          event_type: "mood_observation",
          caregiver_id: "5ca42f72-9e70-4b8d-b8be-da5ed779b586",
          care_recipient_id: "df50cac5-293c-490d-a06c-ee26796f850d",
        },
      },
    ],
  });
  it("Form items show as expected", async () => {
    render(<MainApp />);
    expect(screen.getByLabelText("Care Recipient Id")).toBeInTheDocument();
    expect(screen.getByTestId("event-select")).toBeInTheDocument();
  });

  it("Can Submit form with both inputs selected", async () => {
    // Arrange
    getEvents.mockResolvedValue({
      count: 1,
      rows: [
        {
          id: "01f547a3-7eb1-48f0-86d2-ddc996abd617",
          eventType: "mood_observation",
          visitId: "2ddc77cd-521f-11e9-b63f-06a80bfbb33e",
          timestamp: "2019-05-10T12:27:21+01:00",
          caregiverId: "5ca42f72-9e70-4b8d-b8be-da5ed779b586",
          careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
          eventInfo: {
            id: "01f547a3-7eb1-48f0-86d2-ddc996abd617",
            mood: "okay",
            visit_id: "2ddc77cd-521f-11e9-b63f-06a80bfbb33e",
            timestamp: "2019-05-10T12:27:21+01:00",
            event_type: "mood_observation",
            caregiver_id: "5ca42f72-9e70-4b8d-b8be-da5ed779b586",
            care_recipient_id: "df50cac5-293c-490d-a06c-ee26796f850d",
          },
        },
      ],
    });

    // Act
    render(<MainApp />);
    const careIdEl = screen.getByLabelText("Care Recipient Id");
    const eventTypeEl = screen.getByTestId("event-select");
    const submitButtonEl = screen.getByRole("button", { name: "Submit" });

    // Assert
    expect(screen.queryByTestId("main-table")).not.toBeInTheDocument();

    await userEvent.type(careIdEl, careId);
    userEvent.click(eventTypeEl);

    await waitFor(() => {
      expect(screen.getByText(eventType)).toBeInTheDocument();
    });

    screen.getByText(eventType).click();

    await waitFor(() => {
      expect(eventTypeEl.value).toEqual(eventType);
    });

    submitButtonEl.click();

    await waitFor(() => {
      expect(screen.getByTestId("main-table")).toBeInTheDocument();
    });

    expect(screen.getByTestId("table-header").textContent).toEqual(eventType);

    expect(getEvents).toBeCalledWith(careId, eventTypeEnum, 1);
  });

  it("Cannot submit with no care recipient id", async () => {
    render(<MainApp />);
    const eventTypeEl = screen.getByTestId("event-select");
    const submitButtonEl = screen.getByRole("button", { name: "Submit" });

    userEvent.click(eventTypeEl);

    await waitFor(() => {
      expect(screen.getByText(eventType)).toBeInTheDocument();
    });

    screen.getByText(eventType).click();

    await waitFor(() => {
      expect(eventTypeEl.value).toEqual(eventType);
    });

    submitButtonEl.click();

    await waitFor(() => {
      expect(screen.getByText("required")).toBeInTheDocument();
    });
  });

  it("Cannot submit with no event type", async () => {
    render(<MainApp />);
    const careIdEl = screen.getByLabelText("Care Recipient Id");
    const submitButtonEl = screen.getByRole("button", { name: "Submit" });
    await userEvent.type(careIdEl, careId);

    submitButtonEl.click();

    await waitFor(() => {
      expect(screen.getByText("required")).toBeInTheDocument();
    });
  });
});
