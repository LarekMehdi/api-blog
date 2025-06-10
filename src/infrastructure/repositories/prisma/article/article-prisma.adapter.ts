import { Injectable } from "@nestjs/common";
import { PrismaService } from "../.config/prisma.service";
import { ArticleRepository } from "src/domain/repositories/article.repository";
import { Article as DomainArticle } from "src/domain/entities/article/article.entity";
import { Article as PrismaArticle } from "@prisma/client";
import { ArticleMapper } from "src/shared/mappers/article.mapper";
import { CreateArticleInputDto } from "src/shared/dtos/article/create-article-input.dto";


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

    async findAll(): Promise<DomainArticle[]> {
        return await this.prismaService.article.findMany();
    }

    /** CREATE */

    async create(data: CreateArticleInputDto): Promise<DomainArticle> {
        return await this.prismaService.article.create({
            data 
        });
    }
}