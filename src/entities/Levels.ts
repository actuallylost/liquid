import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Levels {
    @PrimaryColumn()
    userID!: string;

    @Column()
    guildID!: string;

    @Column()
    xp!: number;

    @Column()
    level!: number;
}
