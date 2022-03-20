import { BaseEntity } from "src/base-entity";
import { Column, Entity } from "typeorm";

@Entity()
export class RpnToday extends BaseEntity{
    @Column()
    imageUrl: string

    @Column({nullable:true})
    date: Date

    @Column({nullable:true})
    title?: string

    @Column({nullable:true})
    description: string
}
