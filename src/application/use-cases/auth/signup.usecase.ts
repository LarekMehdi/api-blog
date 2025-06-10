import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";
import { SignupInputDto } from "src/shared/dtos/auth/signup-input.dto";

@Injectable()
export class AuthSignupUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(dto: SignupInputDto) {
        return this.userRepository.signup(dto);
    }
}