import { BaseEntity } from "src/base-entity";
import { RoyalChapter } from "src/royal-chapter/entities/royal-chapter.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity('tens')
export class Ten extends BaseEntity {
    @Column()
    name: string;

    @ManyToOne(type => RoyalChapter, chapter => chapter.tens)
    chapter: RoyalChapter;

    @OneToMany(type => User, user => user.ten)
    users: User[];

    @OneToOne(() => User,{
        eager: false
    })
    @JoinColumn()
    leader: User

    @OneToOne(() => User,{
        eager: false
    })
    @JoinColumn()
    vp: User

    @OneToOne(() => User,{
        eager: false
    })
    @JoinColumn()
    vip: User


}
