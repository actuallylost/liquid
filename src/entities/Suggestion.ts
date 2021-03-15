import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Suggestion {
    @PrimaryGeneratedColumn()
    case!: number;

    // @PrimaryColumn()
    // id!: number;

    @PrimaryColumn()
    guild_id!: string;

    @PrimaryColumn()
    channel_id!: string;

    @PrimaryColumn()
    submitter_id!: string;

    @PrimaryColumn()
    message_id!: string;

    @Column()
    content!: string;
}
