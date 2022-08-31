import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./Cart.entitiy";

@Index("uq_order_cart_id", ["cartId"], { unique: true })
@Entity("order")
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "order_id", unsigned: true })
  orderId: number;

  @Column( {
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column( {type: "int", name: "cart_id", unique: true, unsigned: true })
  cartId: number;


  //koje su moguce vrijednosti 
 //defaultna vrijednost pending
 // status je promjenjiva koja moze imati 

  @Column( {
    type: "enum",
    name: "status",
    enum: ["rejected", "accepted", "shipped", "pendig"],
    default: () => "'pendig'",
  })
  status: "rejected" | "accepted" | "shipped" | "pendig";


  

  @OneToOne(() => Cart, (cart) => cart.order, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })


  @JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
  cart: Cart;
}
