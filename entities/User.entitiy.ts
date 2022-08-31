import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./Cart.entitiy";

@Index("uq_user_email", ["email"], { unique: true })
@Index("uq_user_phone_number", ["phoneNumber"], { unique: true })
@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column( {
    type:"varchar",
    unique: true,
    length: 255,
    
  })
  email: string;

  @Column( {
    type:"varchar",
    name: "pssword_hash",
    length: 128,
    
  })
  psswordHash: string;

  @Column( {
    type:"varchar",  length: 64 })
  forename: string;

  @Column( {
    type:"varchar",  length: 64  })
  surname: string;

  @Column( {
    type:"varchar",
    name: "phone_number",
    unique: true,
    length: 24,
   
  })
  phoneNumber: string;

  @Column( { type:"text",name: "postal_adress" })
  postalAdress: string;

  // jer ovaj nas useer moze da ima vise korpi kojoe su bile otvoreno za njega, tako da cemo pomocu carts mi da dobijemo spisak svih mogućih korpi koji pripadaju tom korisniku 
  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
