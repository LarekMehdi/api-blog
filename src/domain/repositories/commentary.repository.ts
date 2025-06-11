
import { CreateCommentaryDto } from "src/shared/dtos/commentary/create-commentary.dto";
import { Commentary } from "../entities/commentary/commentary.entity";

export abstract class CommentaryRepository {
    abstract findAll(selectColumns?: (keyof Commentary)[]): Promise<Partial<Commentary>[]>
    abstract findAllByArticleId(articleId: number, selectColumns?: (keyof Commentary)[]): Promise<Partial<Commentary>[]>
    abstract findById(id: number, selectColumns?: (keyof Commentary)[]): Promise<Partial<Commentary>|null>
    abstract create(dto: CreateCommentaryDto): Promise<Commentary>
    abstract delete(id: number): Promise<void>
}