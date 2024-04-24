import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
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
