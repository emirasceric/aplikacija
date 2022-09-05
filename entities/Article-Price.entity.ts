import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article.entitiy";

@Index("FK_article_price_article", ["articleId"], {})
@Entity("article_price")
export class ArticlePrice {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "article_price_id",
    unsigned: true,
  })
  articlePriceId: number;

  @Column( {type:"int", name: "article_id", unsigned: true })
  articleId: number;

  @Column( {
    type:"decimal",
    name: "price",
    unsigned: true,
    precision: 10,
    scale: 2,
    
  })
  price: number;

  @Column({
    type:"timestamp", 
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  // postoji samo jer je relacija dvosmjerna, vjerovatno nikad necemo korisiti, 
  //jer cemo iz artikla doci u artikla price
  @ManyToOne(() => Article, (article) => article.articlePrices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;
}
