import { CreateArticleInputDto } from "src/shared/dtos/article/create-article-input.dto";
import { Article } from "../entities/article/article.entity";

export abstract class ArticleRepository {
    abstract findAll(): Promise<Partial<Article>[]>
    abstract findById(id: number): Promise<Partial<Article>|null>
    abstract create(dto: CreateArticleInputDto): Promise<Article>
}