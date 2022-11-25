import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  underscored: true,
})
export class Event extends Model {
  @Column({
    primaryKey: true,
  })
  id!: string;

  @Column
  eventType!: string;

  @Column
  visitId!: string;

  @Column
  timestamp!: Date;

  @Column
  caregiverId!: string;

  @Column
  careRecipientId!: string;

  @Column(DataType.JSON)
  payload!: any;
}
