import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArticleFeature } from "./Article-Feature.entity";
import { Category } from "./Category.entity";

@Index("fk_feature_category_id", ["categoryId"], {})
@Index("uq_feature_name_category_id", ["name", "categoryId"], { unique: true })
@Entity("feature")
export class Feature {
  @PrimaryGeneratedColumn({ type: "int", name: "feature_id", unsigned: true })
  featureId: number;

  @Column( {type:  "varchar",name: "name", length: 32 })
  name: string;

  @Column( {type:"int",  name: "category_id", unsigned: true })
  categoryId: number;


  //to zanci da ovaj features moze da nas dovede do artikla features polja iz kojeg cemo moci da dodjemo do spiska artikala kojim je ovaj feature pridruzen
  @OneToMany(() => ArticleFeature, (articleFeature) => articleFeature.feature)
  articleFeatures: ArticleFeature[];



  @ManyToOne(() => Category, (category) => category.features, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })

  // svaki feature pripada jednoj kategoriji ovdje cemo vidjeti kojoj kategoriji 
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;
}
