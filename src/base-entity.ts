import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @CreateDateColumn()
    createDateTime: Date;

    @UpdateDateColumn()
    lastChangedDateTime: Date;
}
