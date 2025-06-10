import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";
import { PrismaService } from "../.config/prisma.service";
import { ArticleRepository } from "src/domain/repositories/article.repository";
import { Article as DomainArticle } from "src/domain/entities/article/article.entity";
import { Commentary as PrismaCommentary } from "@prisma/client";
import { ArticleMapper } from "src/shared/mappers/article.mapper";
import { Commentary as DomainCommentary} from "src/domain/entities/commentary/commentary.entity";
import { CommentaryMapper } from "src/shared/mappers/commentary.mapper";
import { CreateCommentaryInputDto } from "src/shared/dtos/commentary/create-commentary-input.dto";
import { CommentaryRepository } from "src/domain/repositories/commentary.repository";


@Injectable()
export class CommentaryPrismaAdapter implements CommentaryRepository {

    constructor(private readonly prismaService: PrismaService) {}
 

    /** FIND */

    async findById(id: number): Promise<DomainCommentary | null> {
        const commentary: PrismaCommentary | null=  await this.prismaService.commentary.findUnique({
            where: {
                id
            }
        });
        return CommentaryMapper.toDomain(commentary);
    }

    /** FIND ALL */

    async findAll(): Promise<DomainCommentary[]> {
        return await this.prismaService.commentary.findMany();
    }

    /** CREATE */

    async create(data: CreateCommentaryInputDto): Promise<DomainCommentary> {
        return await this.prismaService.commentary.create({
            data 
        });
    }
}