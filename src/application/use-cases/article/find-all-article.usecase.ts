import { Injectable } from "@nestjs/common";
import { ArticleRepository } from "src/domain/repositories/article.repository";
import { CreateArticleInputDto } from "src/shared/dtos/article/create-article-input.dto";

@Injectable()
export class FindAllArticleUseCase {
    constructor(private readonly articleRepository: ArticleRepository) {}
    
    async execute() {
        // todo: author
        const result =  await this.articleRepository.findAll();
        console.log(result);
        return result;
    }
}