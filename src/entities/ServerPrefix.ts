import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()

export class ServerPrefix {
    @PrimaryColumn()
    id!: string;
    
    @Column()
    prefix!: string;
}
