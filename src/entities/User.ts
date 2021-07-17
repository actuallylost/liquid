import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    user_id!: string;

    // @Column()
    // punishments!: Array<string>;
}
