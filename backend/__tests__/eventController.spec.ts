import app from "../src/application";
import * as request from "supertest";
import { getEventForCareRecipient } from "../src/service/eventService";

const mockEvent = {
  id: "237a62cc-076e-4217-a9f3-758347d5bf5c",
  eventType: "mood_observation",
  visitId: "5cc781f0-8b66-f8a8-4143-c7893ef5af13",
  timestamp: "2019-04-30T08:28:37+01:00",
  caregiverId: "df50cac5-293c-490d-a06c-ee26796f850d",
  careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
  payload: {
    mood: "happy",
  },
};

const fakeId = "12345";

jest.mock("../src/service/eventService.ts", () => {
  return {
    getEventForCareRecipient: jest.fn(
      () => new Promise((res, _) => res([mockEvent]))
    ),
    mapQueryToSearch: jest.fn(() => fakeId),
  };
});

describe("Event Controller unit test cases", () => {
  it("Returns expected with valid request", async () => {
    await request(app)
      .get(`/events?careRecipientId=${fakeId}&eventType=mood_observation`)
      .expect(200)
      .expect(function (res) {
        expect(res.body).toEqual([mockEvent]);
      });

    expect(getEventForCareRecipient).toHaveBeenCalledWith(fakeId);
  });

  it("Returns error with missing id and event type", async () => {
    await request(app)
      .get("/events")
      .expect(400)
      .expect(function (res) {
        expect(res.body.message).toContain(
          "Bad Request: Must include a careRecipientId and eventType"
        );
      });
  });

  it("Returns error with missing id", async () => {
    await request(app)
      .get("/events?eventType=mood_observation")
      .expect(400)
      .expect(function (res) {
        expect(res.body.message).toContain(
          "Bad Request: Must include a careRecipientId and eventType"
        );
      });
  });

  it("Returns error with missing event type", async () => {
    await request(app)
      .get("/events?careRecipientId=1234")
      .expect(400)
      .expect(function (res) {
        expect(res.body.message).toContain(
          "Bad Request: Must include a careRecipientId and eventType"
        );
      });
  });
});
