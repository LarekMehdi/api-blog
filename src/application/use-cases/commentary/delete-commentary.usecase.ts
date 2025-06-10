import { Injectable } from "@nestjs/common";
import { CommentaryRepository } from "src/domain/repositories/commentary.repository";

@Injectable()
export class DeleteCommentaryUseCase {
    constructor(private readonly commentaryRepository: CommentaryRepository) {}
    
    async execute(id: number) {
        return await this.commentaryRepository.delete(id);
    }
}