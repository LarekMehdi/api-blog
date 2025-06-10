import { Injectable } from "@nestjs/common";
import { CommentaryRepository } from "src/domain/repositories/commentary.repository";

@Injectable()
export class FindAllCommentaryUseCase {
    constructor(private readonly commentaryRepository: CommentaryRepository) {}
    
    async execute() {
        return await this.commentaryRepository.findAll();
    }
}