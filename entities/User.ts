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
@Entity("user", { schema: "aplikacija" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", {
    name: "email",
    unique: true,
    length: 255,
    default: () => "'0'",
  })
  email: string;

  @Column("varchar", {
    name: "pssword_hash",
    length: 128,
    default: () => "'0'",
  })
  psswordHash: string;

  @Column("varchar", { name: "forename", length: 64, default: () => "'0'" })
  forename: string;

  @Column("varchar", { name: "surname", length: 64, default: () => "'0'" })
  surname: string;

  @Column("varchar", {
    name: "phone_number",
    unique: true,
    length: 24,
    default: () => "'0'",
  })
  phoneNumber: string;

  @Column("text", { name: "postal_adress" })
  postalAdress: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
