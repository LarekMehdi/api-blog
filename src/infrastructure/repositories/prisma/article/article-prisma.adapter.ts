import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";
import { PrismaService } from "../.config/prisma.service";
import { ArticleRepository } from "src/domain/repositories/article.repository";
import { Article as DomainArticle } from "src/domain/entities/article/article.entity";
import { Article as PrismaArticle } from "@prisma/client";
import { ArticleMapper } from "src/shared/mappers/article.mapper";


@Injectable()
export class ArticlePrismaAdapter implements ArticleRepository {

    constructor(private readonly prismaService: PrismaService) {}
 

    /** FIND */

    async findById(id: number): Promise<DomainArticle | null> {
        const article: PrismaArticle | null=  await this.prismaService.article.findUnique({
            where: {
                id
            }
        });
        return ArticleMapper.toDomain(article);
    }

    /** FIND ALL */

    findAll(): Promise<DomainArticle[]> {
        throw new Error("Method not implemented.");
    }

    /** CREATE */

    create(): Promise<DomainArticle> {
        throw new Error("Method not implemented.");
    }
}