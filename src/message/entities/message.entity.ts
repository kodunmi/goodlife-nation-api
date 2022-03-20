import { BaseEntity } from 'src/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('messages')
export class Message extends BaseEntity {
    @Column()
    title: string

    @Column()
    description: string

    @Column()
    imageUrl: string

    @Column()
    videoUrl: string

    @Column()
    date: Date

    @Column()
    tag: 'NCR'|'7DOA'|'TGP'|'PEM'
}
