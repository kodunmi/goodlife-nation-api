import { Column, ManyToOne } from 'typeorm';
import { Entity } from 'typeorm';
import { BaseEntity } from 'src/base-entity';
import { User } from 'src/user/entities/user.entity';

@Entity('converts')
export class Convert extends BaseEntity {
    @Column()
    firstName: string;

    @Column()
    lastName: string

    @Column({nullable:true})
    gender: 'male' | 'female'

    @Column({nullable:true})
    location: string

    @Column({nullable:true})
    occupation:string

    @Column({nullable:true})
    phone: string

    @Column({nullable:true})
    dob: string

    @ManyToOne(() => User, user => user.converts,{
        eager: true
    })
    user: User

}
