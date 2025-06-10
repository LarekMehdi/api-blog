
import { Commentary } from "../entities/commentary/commentary.entity";
import { CreateCommentaryInputDto } from "src/shared/dtos/commentary/create-commentary-input.dto";

export abstract class CommentaryRepository {
    abstract findAll(): Promise<Commentary[]>
    abstract findById(id: number): Promise<Commentary|null>
    abstract create(dto: CreateCommentaryInputDto): Promise<Commentary>
}