import { Injectable, NotFoundException } from "@nestjs/common";
import { Article } from "src/domain/entities/article/article.entity";
import { Commentary } from "src/domain/entities/commentary/commentary.entity";
import { ArticleRepository } from "src/domain/repositories/article.repository";
import { ArticleOutputDto } from "src/shared/dtos/article/article-output.dto";
import { ArticleMapper } from "src/shared/mappers/article.mapper";
import { User } from "src/domain/entities/user/user.entity";
import { CommentaryRepository } from "src/domain/repositories/commentary.repository";
import { UserRepository } from "src/domain/repositories/user.repository";

@Injectable()
export class FindArticleByIdUseCase {
    constructor(private readonly articleRepository: ArticleRepository,
                private readonly commentaryRepository: CommentaryRepository,
                private readonly userRepository: UserRepository,
    ) {}

    async execute(id: number): Promise<ArticleOutputDto> {
        const article: Partial<Article>|null = await this.articleRepository.findById(id);
        if (!article || !article.authorId) throw new NotFoundException(`No article found with id ${id}`);

        const commentaries: Partial<Commentary>[] = await this.commentaryRepository.findAllByArticleId(id);

        const articleAuthorId: number = article.authorId;
        const articleAuthor: Partial<User>|null = await this.userRepository.findById(articleAuthorId, ['id', 'firstname', 'lastname']);
        if (!articleAuthor) throw new NotFoundException(`No author found for article ${id} [userId: ${articleAuthorId}]`);

        const commentaryAuthorIds: number[] = commentaries.map((c) => c.authorId as number);
        const commentaryAuthors: Partial<User>[] = await this.userRepository.findAllByIds(commentaryAuthorIds, ['id', 'firstname', 'lastname']);

        const dto: ArticleOutputDto = ArticleMapper.toArticleOutput(article, commentaries, articleAuthor, commentaryAuthors);
        return dto;
    }
}