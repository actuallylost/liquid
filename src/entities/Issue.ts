import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Issue {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    content!: string;
}
