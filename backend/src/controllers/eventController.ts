import * as express from "express";

import {
  getEventForCareRecipient,
  mapQueryToSearch,
} from "../service/eventService";
import { ErrorDTO } from "../view/ErrorDTO";
import { EventDTO, PageDTO } from "../view/EventDTO";
import { EventSearchDTO } from "../view/EventSearchDTO";

export const eventController = express.Router();

type SearchRequest = express.Request<
  Record<string, unknown>,
  PageDTO<EventDTO> | ErrorDTO,
  Record<string, unknown>,
  EventSearchDTO
>;

eventController.get("/events", (req: SearchRequest, res) => {
  if (!req.query || !req.query.careRecipientId || !req.query.eventType) {
    res.status(400).json({
      message: "Bad Request: Must include a careRecipientId and eventType",
    });
  } else {
    getEventForCareRecipient(mapQueryToSearch(req.query))
      .then((items) => res.status(200).json(items))
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          message: err,
        });
      });
  }
});
