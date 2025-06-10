import { User } from "@prisma/client";

export abstract class UserRepository {
    
    abstract findById(id: number, selectColumns?: (keyof User)[]): Promise<Partial<User>|null>
    abstract findAllByIds(ids: number[], selectColumns?: (keyof User)[]): Promise<Partial<User>[]>
}