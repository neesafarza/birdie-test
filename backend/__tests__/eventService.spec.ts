import { mocked } from "ts-jest";
import { Event } from "../src/model/event.model";
import {
  getEventForCareRecipient,
  buildDatabaseQuery,
} from "../src/service/eventService";
import { EventSearchDTO } from "../src/view/EventSearchDTO";
import { Op } from "sequelize";

const searchItem = {
  id: "237a62cc-076e-4217-a9f3-758347d5bf5c",
  eventType: "mood_observation",
  visitId: "5cc781f0-8b66-f8a8-4143-c7893ef5af13",
  timestamp: "2019-04-30T08:28:37+01:00",
  caregiverId: "df50cac5-293c-490d-a06c-ee26796f850d",
  careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
  payload: {
    otherKey: "someValue",
    mood: "happy",
  },
};

const expectedQuery = {
  limit: 10,
  offset: 0,
  where: {
    careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
    caregiverId: "df50cac5-293c-490d-a06c-ee26796f850d",
    eventType: "mood_observation",
  },
};

const promiseFrom = (data: any): Promise<any> => {
  return new Promise((res, _) => res(data));
};

jest.mock("../src/model/event.model.ts");

describe("Event Service unit test cases", () => {
  const eventMock = mocked(Event);

  beforeEach(() => {
    eventMock.mockClear();
    eventMock.findAndCountAll.mockImplementation(() =>
      promiseFrom({ count: 10, rows: [] })
    );
  });

  describe("getEventForCareRecipient test cases", () => {
    it("getEventForCareRecipient returns empty list if no data", async () => {
      const actual = await getEventForCareRecipient(searchItem);
      expect(eventMock.findAndCountAll).toBeCalledWith(expectedQuery);
      expect(actual).toEqual({ count: 10, rows: [] });
    });

    it("getEventForCareRecipient returns expected with data found", async () => {
      eventMock.findAndCountAll.mockImplementation(() =>
        promiseFrom({ count: 10, rows: [searchItem] })
      );
      const actual = await getEventForCareRecipient(searchItem);
      expect(eventMock.findAndCountAll).toBeCalledWith(expectedQuery);
      expect(actual).toEqual({
        count: 10,
        rows: [
          {
            careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
            caregiverId: "df50cac5-293c-490d-a06c-ee26796f850d",
            eventInfo: {
              mood: "happy",
              otherKey: "someValue",
            },
            eventType: "mood_observation",
            id: "237a62cc-076e-4217-a9f3-758347d5bf5c",
            timestamp: "2019-04-30T08:28:37+01:00",
            visitId: "5cc781f0-8b66-f8a8-4143-c7893ef5af13",
          },
        ],
      });
    });
  });

  describe("buildDatabaseQuery", () => {
    const mandatoryMockSearch: EventSearchDTO = {
      eventType: "mood_observation",
      careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
    };

    let optionalMockSearch: EventSearchDTO;

    beforeEach(() => {
      optionalMockSearch = {
        eventType: "mood_observation",
        careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
        caregiverId: "5c9090ab-7d5e-4a72-8bf7-197190ad4c98",
        startDate: new Date("2019-02-03T07:24:10.276Z"),
        endDate: new Date("2019-05-03T07:24:10.276Z"),
        page: "1",
      };
    });

    it("buildDatabaseQuery returns mandatory only with no optional provided", async () => {
      const actual = await buildDatabaseQuery(mandatoryMockSearch);
      expect(actual).toEqual({
        where: {
          careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
          eventType: "mood_observation",
        },
        limit: 10,
        offset: 0,
      });
    });

    it("buildDatabaseQuery resturns expected with optional parameters", async () => {
      const actual = await buildDatabaseQuery(optionalMockSearch);
      expect(actual).toEqual({
        limit: 10,
        offset: 1,
        where: {
          careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
          caregiverId: "5c9090ab-7d5e-4a72-8bf7-197190ad4c98",
          eventType: "mood_observation",
          timestamp: {
            [Op.between]: [
              new Date("2019-02-03T07:24:10.276Z"),
              new Date("2019-05-03T07:24:10.276Z"),
            ],
          },
        },
      });
    });

    it("buildDatabaseQuery resturns expected with just start date", async () => {
      optionalMockSearch.endDate = undefined;
      const actual = await buildDatabaseQuery(optionalMockSearch);
      expect(actual).toEqual({
        limit: 10,
        offset: 1,
        where: {
          careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
          caregiverId: "5c9090ab-7d5e-4a72-8bf7-197190ad4c98",
          eventType: "mood_observation",
          timestamp: {
            [Op.gt]: new Date("2019-02-03T07:24:10.276Z"),
          },
        },
      });
    });

    it("buildDatabaseQuery resturns expected with just start date", async () => {
      optionalMockSearch.startDate = undefined;
      const actual = await buildDatabaseQuery(optionalMockSearch);
      expect(actual).toEqual({
        limit: 10,
        offset: 1,
        where: {
          careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
          caregiverId: "5c9090ab-7d5e-4a72-8bf7-197190ad4c98",
          eventType: "mood_observation",
          timestamp: {
            [Op.lt]: new Date("2019-05-03T07:24:10.276Z"),
          },
        },
      });
    });
  });
});
