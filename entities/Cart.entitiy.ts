import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entitiy";
import { CartArticle } from "./Cart.Article.entity";
import { Order } from "./Order.entitiy";

@Index("fk_cart_user_id", ["userId"], {})
@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn({ type: "int", name: "cart_id", unsigned: true })
  cartId: number;

  @Column( {type:"int", name: "user_id", unsigned: true, })
  userId: number;

  @Column( {
    type:"timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.carts, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;


  // relaicije -> hocu da za ovaj trenutni cart u kojem se nalazim da vidim sve
  // cart artikle vezne rekorde, preko kojih cu doci do svih artikl stavki koje su dodane u korpu
  @OneToMany(() => CartArticle, (cartArticle) => cartArticle.cart)
  cartArticles: CartArticle[];


  //gdje tacno određeni cart mogu da vidim koji je to oreder 
  
  @OneToOne(() => Order, (order) => order.cart)
  order: Order;
}
