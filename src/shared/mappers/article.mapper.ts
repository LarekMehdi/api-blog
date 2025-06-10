import { Article as DomainArticle } from "src/domain/entities/article/article.entity";
import { Article as PrismaArticle } from "@prisma/client";

export abstract class ArticleMapper {

    static toDomain(prismaArticle: PrismaArticle | null): DomainArticle|null {
        if (!prismaArticle) return null;
        return {
            ...prismaArticle,
        };
    }
}