import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateCommentaryUseCase } from "src/application/use-cases/commentary/create-commentary.usecase";
import { DeleteCommentaryUseCase } from "src/application/use-cases/commentary/delete-commentary.usecase";
import { FindAllCommentaryUseCase } from "src/application/use-cases/commentary/find-all-comentary.usecase";
import { FindAllCommentaryByArticleIdUseCase } from "src/application/use-cases/commentary/find-all-commentary-by-article-id.usecase";
import { CreateCommentaryInputDto } from "src/shared/dtos/commentary/create-commentary-input.dto";

@Controller('commentary')
export class CommentaryController {

    constructor(
                private readonly findAllCommentaryUC: FindAllCommentaryUseCase,
                private readonly findAllByArticleIdUC: FindAllCommentaryByArticleIdUseCase,
                private readonly deleteUC: DeleteCommentaryUseCase,
    ) {}


    /** FIND ALL */
    
    @Get()
    async findAll() {
        return await this.findAllCommentaryUC.execute();
    }

    /** FIND */

    @Get(':articleId')
    async findAllByArticleId(@Param('articleId', ParseIntPipe) articleId: number) {
        return await this.findAllByArticleIdUC.execute(articleId);
    }

    /** DELETE */

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.deleteUC.execute(id);
    }
}