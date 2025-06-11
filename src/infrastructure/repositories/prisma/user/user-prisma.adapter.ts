import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";
import { PrismaService } from "../.config/prisma.service";
import { User as PrismaUser} from "@prisma/client";
import { User as DomainUser} from "src/domain/entities/user/user.entity";
import { UtilEntity } from "src/utils/entity.util";
import { SignupInputDto } from "src/shared/dtos/auth/signup-input.dto";
import { UserFullnameInputDto } from "src/shared/dtos/user/user-fullname-input.dto";

@Injectable()
export class UserPrismaAdapter implements UserRepository {

    constructor(private readonly prismaService: PrismaService) {}

    /** FIND */

    async findById(id: number, selectColumns?: (keyof PrismaUser)[]): Promise<Partial<DomainUser> | null> {
        const select: Record<keyof PrismaUser, boolean>|undefined = UtilEntity.getSelectColumns<PrismaUser>(selectColumns);

        return await this.prismaService.user.findUnique({
            select: select || undefined,
            where: {
                id
            }
        });
    }

    async findByFullname(dto: UserFullnameInputDto, selectColumns?: (keyof PrismaUser)[]): Promise<Partial<DomainUser> | null> {
        const select: Record<keyof PrismaUser, boolean>|undefined = UtilEntity.getSelectColumns<PrismaUser>(selectColumns);
        
        return await this.prismaService.user.findFirst({
            select: select || undefined,
            where: {
                AND: {
                    firstname: dto.firstname,
                    lastname: dto.lastname
                }
            }
        });
    }

    /** FIND ALL */

    async findAllByIds(ids: number[], selectColumns?: (keyof PrismaUser)[]): Promise<Partial<DomainUser>[]> {
        const select: Record<keyof PrismaUser, boolean>|undefined = UtilEntity.getSelectColumns<PrismaUser>(selectColumns);

        return await this.prismaService.user.findMany({
            select: select || undefined,
            where: {
                id: {
                    in: ids
                }
            }
        });
    }

    /** CREATE */

    async signup(data: SignupInputDto): Promise<PrismaUser> {
        return await this.prismaService.user.create({
            data
        });
    }
}