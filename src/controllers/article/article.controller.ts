import { Controller, Get, Post } from "@nestjs/common";
import { CreateArticleUseCase } from "src/application/use-cases/article/create-article.usecase";
import { FindAllArticleUseCase } from "src/application/use-cases/article/find-all-article.usecase";
import { CreateArticleInputDto } from "src/shared/dtos/article/create-article-input.dto";

@Controller('article')
export class ArticleController {

    constructor(private readonly findAllUC: FindAllArticleUseCase,
                private readonly createArticleUC: CreateArticleUseCase,
    ) {}
    
    /** CREATE */

    @Post('create')
    async create(dto: CreateArticleInputDto) {
        return await this.createArticleUC.execute(dto);
    }

    /** FIND ALL */
    
    @Get()
    async findAll() {
        return await this.findAllUC.execute();
    }
}