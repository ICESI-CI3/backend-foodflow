import { Column, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class User {

    @Column({ primary: true, nullable: false})
    id: string;

    @Column('text', {nullable: false})
    name: string;

    @Column('text', { unique: true, nullable: false})
    email: string;

    @Column('text', {nullable: false})
    password: string;

    @Column('text',{array: true})
    role: string[];

    @Column({default: -1})
    rating: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
