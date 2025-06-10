import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";

@Injectable()
export class FindAllUserByIdsUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(ids: number[]) {
        return await this.userRepository.findAllByIds(ids);
    }
}