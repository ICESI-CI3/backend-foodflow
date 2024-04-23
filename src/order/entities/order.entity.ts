/* eslint-disable prettier/prettier */
import { JoinTable, ManyToMany } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from 'src/enum/status_order.enum';

@Entity()
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {nullable: false, unique: true})
  name: string

  @Column('int', {nullable: false})
  tableNumber: number;

  @ManyToMany(() => Product, (product) => product.order, {cascade: true})
  @JoinTable()
  products: Product[];

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATE
  })
  status: OrderStatus;

  @Column('timestamp', {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

}
