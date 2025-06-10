import { Article, Article as DomainArticle } from "src/domain/entities/article/article.entity";
import { Article as PrismaArticle } from "@prisma/client";
import { Commentary } from "src/domain/entities/commentary/commentary.entity";
import { ArticleOutputDto } from "../dtos/article/article-output.dto";
import { CommentaryMapper } from "./commentary.mapper";
import { User } from "src/domain/entities/user/user.entity";
import { UtilEntity } from "src/utils/entity.util";

export abstract class ArticleMapper {

    static toDomain(prismaArticle: PrismaArticle | null): DomainArticle|null {
        if (!prismaArticle) return null;
        return {
            ...prismaArticle,
        };
    }

    static toArticleOutput(article: Partial<Article>, commentaries: Partial<Commentary>[], author: Partial<User>|null, commentaryAuthors: Partial<User>[]): ArticleOutputDto {
        const dto: ArticleOutputDto = {
            id: article.id!,
            title: article.title!,
            content: article.content!,
            authorDisplay: UtilEntity.getAuthorDisplay(author),
            authorId: article.authorId!,
            createdAt: article.createdAt!,
            updatedAt: article.updatedAt || null,
            commentaries: CommentaryMapper.toCommentaryOutputs(commentaries, commentaryAuthors)
        }
        return dto;
    }
}