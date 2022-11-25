import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { Event } from "../model/event.model";

dotenv.config();

export class DatabaseConnectionManager {
  private static sequelize: Sequelize;

  public static async init(): Promise<void> {
    if (!this.sequelize) {
      this.sequelize = this.connect();
      await this.sequelize.authenticate();
    }
  }

  private static connect(): Sequelize {
    // eslint-disable-next-line no-console
    console.log("Connecting to database");
    return new Sequelize(
      process.env.DB_NAME as string,
      process.env.DB_USERNAME as string,
      process.env.DB_PASSWORD as string,
      {
        host: process.env.DB_HOST as string,
        dialect: "mysql",
        models: [Event],
      }
    );
  }
}
