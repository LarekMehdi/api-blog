import { Injectable } from "@nestjs/common";
import { CommentaryRepository } from "src/domain/repositories/commentary.repository";

@Injectable()
export class FindAllCommentaryByArticleIdUseCase {
    constructor(private readonly commentaryRepository: CommentaryRepository) {}
    
    async execute(articleId: number) {
        return await this.commentaryRepository.findAllByArticleId(articleId);
    }
}