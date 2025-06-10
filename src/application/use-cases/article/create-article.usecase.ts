import { Injectable } from "@nestjs/common";
import { ArticleRepository } from "src/domain/repositories/article.repository";
import { CreateArticleInputDto } from "src/shared/dtos/article/create-article-input.dto";

@Injectable()
export class CreateArticleUseCase {
    constructor(private readonly articleRepository: ArticleRepository) {}
    
    async execute(dto: CreateArticleInputDto) {
        return await this.articleRepository.create(dto);
    }
}