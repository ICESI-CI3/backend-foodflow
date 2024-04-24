import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ValidRoles } from '../interfaces/valid-role';


@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true, nullable: false})
    email: string;

    @Column('text', {select: false, nullable: false})
    password: string;

    @Column('text', {nullable: false})
    fullName: string;

    @Column('bool', {default: true})
    isActive: boolean;

    @Column({
        type: 'enum',
        enum: ValidRoles,
        default: ValidRoles.mesero
    })
    roles: ValidRoles[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}