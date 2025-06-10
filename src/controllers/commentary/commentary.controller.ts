import { Controller, Get, Post } from "@nestjs/common";
import { CreateArticleUseCase } from "src/application/use-cases/article/create-article.usecase";
import { FindAllArticleUseCase } from "src/application/use-cases/article/find-all-article.usecase";
import { CreateCommentaryUseCase } from "src/application/use-cases/commentary/create-commentary.usecase";
import { FindAllCommentaryUseCase } from "src/application/use-cases/commentary/find-all-comentary.usecase";
import { CreateArticleInputDto } from "src/shared/dtos/article/create-article-input.dto";
import { CreateCommentaryInputDto } from "src/shared/dtos/commentary/create-commentary-input.dto";

@Controller('commentary')
export class CommentaryController {

    constructor(private readonly createCommentaryUC: CreateCommentaryUseCase,
                private readonly findAllCommentaryUC: FindAllCommentaryUseCase,
               
    ) {}
    
    /** CREATE */

    @Post('create')
    async create(dto: CreateCommentaryInputDto) {
        return await this.createCommentaryUC.execute(dto);
    }

    /** FIND ALL */
    
    @Get()
    async findAll() {
        return await this.findAllCommentaryUC.execute();
    }
}