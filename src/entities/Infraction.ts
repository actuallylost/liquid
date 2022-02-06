import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { InfractionType } from "../commands/moderation/InfractionTypes";

@Entity()

export class Infraction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    inf_type!: InfractionType;

    @Column()
    offender_id!: string;

    @Column()
    moderator_id!: string;

    @Column()
    guild_id!: string;

    @Column()
    reason!: string;

    // @Column()
    // createdAt!: number;
}