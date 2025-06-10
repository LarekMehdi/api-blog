import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";

@Injectable()
export class FindUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: number) {
        return await this.userRepository.findById(id);
    }
}