import { Injectable } from "@nestjs/common";
import { CommentaryRepository } from "src/domain/repositories/commentary.repository";
import { CreateCommentaryInputDto } from "src/shared/dtos/commentary/create-commentary-input.dto";

@Injectable()
export class CreateCommentaryUseCase {
    constructor(private readonly commentaryRepository: CommentaryRepository) {}
    
    async execute(dto: CreateCommentaryInputDto) {
        return await this.commentaryRepository.create(dto);
    }
}