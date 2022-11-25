import { Event } from "../model/event.model";
import { EventDTO, PageDTO } from "../view/EventDTO";
import { EventSearchDTO } from "../view/EventSearchDTO";
import { FindOptions, Op } from "sequelize";

export const getEventForCareRecipient = async (
  search: EventSearchDTO
): Promise<PageDTO<EventDTO>> => {
  const events = await Event.findAndCountAll(buildDatabaseQuery(search));
  return {
    count: events.count,
    rows: events.rows.map((i) => convertEventToDTO(i)),
  };
};

export const mapQueryToSearch = (query: EventSearchDTO): EventSearchDTO => {
  return {
    ...query,
  };
};

const convertEventToDTO = (event: Event): EventDTO => {
  return {
    id: event.id,
    eventType: event.eventType,
    visitId: event.visitId,
    timestamp: event.timestamp,
    caregiverId: event.caregiverId,
    careRecipientId: event.careRecipientId,
    eventInfo: event.payload,
  };
};

export const buildDatabaseQuery = (search: EventSearchDTO): FindOptions => {
  const result: any = {
    where: {
      careRecipientId: search.careRecipientId,
      eventType: search.eventType,
    },
    limit: 10,
    offset: !search.page ? 0 : parseInt(search.page),
  };
  if (search.caregiverId) {
    result.where.caregiverId = search.caregiverId;
  }
  if (search.startDate && search.endDate) {
    result.where.timestamp = {
      [Op.between]: [search.startDate, search.endDate],
    };
  } else {
    if (search.startDate) {
      result.where.timestamp = {
        [Op.gt]: search.startDate,
      };
    }
    if (search.endDate) {
      result.where.timestamp = {
        [Op.lt]: search.endDate,
      };
    }
  }
  return result;
};
