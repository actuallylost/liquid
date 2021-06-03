import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Warning {
    @PrimaryColumn()
    user_id!: string;

    @Column()
    guild_id!: string;

    @Column()
    reason!: string;
}
