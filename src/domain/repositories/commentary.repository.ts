
import { Commentary } from "../entities/commentary/commentary.entity";
import { CreateCommentaryInputDto } from "src/shared/dtos/commentary/create-commentary-input.dto";

export abstract class CommentaryRepository {
    abstract findAll(selectColumns?: (keyof Commentary)[]): Promise<Partial<Commentary>[]>
    abstract findAllByArticleId(articleId: number, selectColumns?: (keyof Commentary)[]): Promise<Partial<Commentary>[]>
    abstract findById(id: number, selectColumns?: (keyof Commentary)[]): Promise<Partial<Commentary>|null>
    abstract create(dto: CreateCommentaryInputDto): Promise<Commentary>
    abstract delete(id: number): Promise<void>
}