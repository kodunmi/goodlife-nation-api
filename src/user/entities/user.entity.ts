import { Convert } from './../../convert/entities/convert.entity';
import { BaseEntity } from 'src/base-entity';
import { RoyalChapter } from 'src/royal-chapter/entities/royal-chapter.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, BeforeInsert, BeforeRecover, BeforeUpdate, OneToMany } from 'typeorm';
// import bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { Ten } from 'src/ten/entities/ten.entity';

@Entity('users')
export class User extends BaseEntity {

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column({ default: false })
    accountVerified: boolean;

    @Column({ default: false })
    emailVerified: boolean;

    @Column({ nullable: false, unique:true })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    state: string;

    @Column({ nullable: true })
    country: string;

    @Column({ nullable: true})
    otp: number;


    @Column({ nullable: true})
    forgetPasswordOtp: number;

    @Column({ type: 'timestamp', nullable: true })
    forgetPasswordExpireAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    expireAt: Date;

    @Column({ nullable: true })
    verifiedAt: Date;

    @Column({ nullable: false, default: false })
    verified: boolean;

    @Column({ type: 'timestamp', nullable: true})
    lastLoginAt: Date;

    @Column({ nullable: true })
    lastLoginIp: string;

    @Column({default: false})
    isBishop: boolean

    @Column({default:false})
    isTenLeader: boolean

    @Column({default:false})
    isLeader: boolean

    @Column({default:false})
    isVip: boolean

    @Column({default:false})
    isVp: boolean

    @ManyToOne(() => RoyalChapter, chapter => chapter.users,{
        eager: true
    })
    chapter: RoyalChapter;

    @Column({nullable:true})
    chapterId: string;

    @ManyToOne(() => Ten, ten => ten.users, {
        eager: true,
    })
    ten: Ten;

    @Column({nullable:true})
    tenId: string;

    @OneToMany(type => Convert, convert => convert.user)
    converts: Convert[]

    @BeforeInsert() 
    // @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}