import { User } from "@prisma/client";
import { SignupInputDto } from "src/shared/dtos/auth/signup-input.dto";
import { UserFullnameInputDto } from "src/shared/dtos/user/user-fullname-input.dto";

export abstract class UserRepository {
    
    abstract signup(dto: SignupInputDto): Promise<User>
    abstract findById(id: number, selectColumns?: (keyof User)[]): Promise<Partial<User>|null>
    abstract findAllByIds(ids: number[], selectColumns?: (keyof User)[]): Promise<Partial<User>[]>
    abstract findByFullname(dto: UserFullnameInputDto, selectColumns?: (keyof User)[]): Promise<Partial<User>|null>
}