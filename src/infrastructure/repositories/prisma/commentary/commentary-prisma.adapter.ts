import { Injectable } from "@nestjs/common";
import { PrismaService } from "../.config/prisma.service";
import { Commentary as PrismaCommentary } from "@prisma/client";
import { Commentary as DomainCommentary} from "src/domain/entities/commentary/commentary.entity";
import { CommentaryMapper } from "src/shared/mappers/commentary.mapper";
import { CommentaryRepository } from "src/domain/repositories/commentary.repository";
import { UtilEntity } from "src/utils/entity.util";
import { CreateCommentaryDto } from "src/shared/dtos/commentary/create-commentary.dto";


@Injectable()
export class CommentaryPrismaAdapter implements CommentaryRepository {

    constructor(private readonly prismaService: PrismaService) {}

    /** FIND */

    async findById(id: number, selectColumns?: (keyof PrismaCommentary)[]): Promise<Partial<DomainCommentary> | null> {
        const select: Record<keyof PrismaCommentary, boolean>|undefined = UtilEntity.getSelectColumns<PrismaCommentary>(selectColumns);

        const commentary: PrismaCommentary | null=  await this.prismaService.commentary.findUnique({
            select: select || undefined,
            where: {
                id
            }
        });
        return CommentaryMapper.toDomain(commentary);
    }

    /** FIND ALL */

    async findAll(selectColumns?: (keyof PrismaCommentary)[]): Promise<Partial<DomainCommentary>[]> {
        const select: Record<keyof PrismaCommentary, boolean>|undefined = UtilEntity.getSelectColumns<PrismaCommentary>(selectColumns);

        return await this.prismaService.commentary.findMany({
            select: select || undefined
        });
    }

    async findAllByArticleId(articleId: number, selectColumns?: (keyof PrismaCommentary)[]): Promise<Partial<DomainCommentary>[]> {
        const select: Record<keyof PrismaCommentary, boolean>|undefined = UtilEntity.getSelectColumns<PrismaCommentary>(selectColumns);

        return await this.prismaService.commentary.findMany({
            select: select || undefined,
            where: {
                articleId
            }
        });
    }

    /** CREATE */

    async create(data: CreateCommentaryDto): Promise<DomainCommentary> {
        return await this.prismaService.commentary.create({
            data 
        });
    }

    /** DELETE */

    async delete(id: number): Promise<void> {
        await this.prismaService.commentary.delete({
            where: {
                id
            }
        });
    }
}