import { BaseEntity } from "src/base-entity";
import { Column, Entity } from "typeorm";

@Entity('quotes')
export class Quote extends BaseEntity {
    @Column()
    imageUrl: string

    @Column({nullable:true})
    date: Date

    @Column({nullable:true})
    title?: string

    @Column({nullable:true})
    description: string
}
