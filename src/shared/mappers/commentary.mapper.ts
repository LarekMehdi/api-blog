
import { Commentary as PrismaCommentary } from "@prisma/client";
import { Commentary as DomainCommentary} from "src/domain/entities/commentary/commentary.entity";

export abstract class CommentaryMapper {

    static toDomain(prismaCommentary: PrismaCommentary | null): DomainCommentary|null {
        if (!prismaCommentary) return null;
        return {
            ...prismaCommentary,
        };
    }
}