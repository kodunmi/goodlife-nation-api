import { BaseEntity } from 'src/base-entity';
import { Ten } from 'src/ten/entities/ten.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('royal-chapters')
export class RoyalChapter extends BaseEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @OneToMany(type => User, user => user.chapter)
    users: User[];

    @OneToMany(type => Ten, ten => ten.chapter)
    tens: Ten[];

    @OneToOne(() => User)
    @JoinColumn()
    bishop: User
}
