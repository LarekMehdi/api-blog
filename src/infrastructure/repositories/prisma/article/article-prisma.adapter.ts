import { Injectable } from "@nestjs/common";
import { PrismaService } from "../.config/prisma.service";
import { ArticleRepository } from "src/domain/repositories/article.repository";
import { Article as DomainArticle } from "src/domain/entities/article/article.entity";
import { Article as PrismaArticle } from "@prisma/client";
import { ArticleMapper } from "src/shared/mappers/article.mapper";
import { CreateArticleInputDto } from "src/shared/dtos/article/create-article-input.dto";
import { UtilEntity } from "src/utils/entity.util";


@Injectable()
export class ArticlePrismaAdapter implements ArticleRepository {

    constructor(private readonly prismaService: PrismaService) {}
 

    /** FIND */

    async findById(id: number, selectColumns?: (keyof PrismaArticle)[]): Promise<DomainArticle | null> {
        const select: Record<keyof PrismaArticle, boolean>|undefined = UtilEntity.getSelectColumns<PrismaArticle>(selectColumns);

        const article: PrismaArticle | null=  await this.prismaService.article.findUnique({
            select: select || undefined,
            where: {
                id
            }
        });
        return ArticleMapper.toDomain(article);
    }

    /** FIND ALL */

    async findAll(selectColumns?: (keyof PrismaArticle)[]): Promise<DomainArticle[]> {
        const select: Record<keyof PrismaArticle, boolean>|undefined = UtilEntity.getSelectColumns<PrismaArticle>(selectColumns);

        return await this.prismaService.article.findMany({
            select: select || undefined
        });
    }

    /** CREATE */

    async create(data: CreateArticleInputDto): Promise<DomainArticle> {
        return await this.prismaService.article.create({
            data 
        });
    }
}