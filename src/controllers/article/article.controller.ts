import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateArticleUseCase } from "src/application/use-cases/article/create-article.usecase";
import { FindAllArticleUseCase } from "src/application/use-cases/article/find-all-article.usecase";
import { FindArticleByIdUseCase } from "src/application/use-cases/article/find-by-id.usecase";
import { CreateArticleInputDto } from "src/shared/dtos/article/create-article-input.dto";

@Controller('article')
export class ArticleController {

    constructor(private readonly findAllUC: FindAllArticleUseCase,
                private readonly createArticleUC: CreateArticleUseCase,
                private readonly findByIdUC: FindArticleByIdUseCase
    ) {}
    
    /** CREATE */

    @Post()
    async create(@Body() dto: CreateArticleInputDto) {
        return await this.createArticleUC.execute(dto);
    }

    /** FIND ALL */
    
    @Get()
    async findAll() {
        return await this.findAllUC.execute();
    }

    /** FIND */

    @Get('id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return await this.findByIdUC.execute(id);
    }
}