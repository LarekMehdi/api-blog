
import { Commentary as PrismaCommentary } from "@prisma/client";
import { Commentary, Commentary as DomainCommentary} from "src/domain/entities/commentary/commentary.entity";
import { User } from "src/domain/entities/user/user.entity";
import { CommentaryOutputDto } from "../dtos/commentary/commentary-output.dto";
import { UtilEntity } from "src/utils/entity.util";

export abstract class CommentaryMapper {

    static toDomain(prismaCommentary: PrismaCommentary | null): DomainCommentary|null {
        if (!prismaCommentary) return null;
        return {
            ...prismaCommentary,
        };
    }

    static toCommentaryOutputs(commentaries: Partial<Commentary>[], authors: Partial<User>[]): CommentaryOutputDto[] {
        const dtos: CommentaryOutputDto[] = [];

        for (const comment of commentaries) {
            const author: Partial<User>|undefined = authors.find((a) => a.id === comment.authorId);

            const dto: CommentaryOutputDto = {
                id: comment.id!,
                authorDisplay: UtilEntity.getAuthorDisplay(author),
                authorId: comment.authorId!,
                title: comment.title!,
                content: comment.content!,
                createdAt: comment.createdAt!,
                updatedAt: comment.updatedAt || null,
            }
            dtos.push(dto);
        }
        return dtos;
    }
}