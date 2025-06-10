import { User } from "@prisma/client";
import { SignupInputDto } from "src/shared/dtos/auth/signup-input.dto";

export abstract class UserRepository {
    
    abstract signup(dto: SignupInputDto): Promise<User>
    abstract findById(id: number, selectColumns?: (keyof User)[]): Promise<Partial<User>|null>
    abstract findAllByIds(ids: number[], selectColumns?: (keyof User)[]): Promise<Partial<User>[]>
}