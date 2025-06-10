import { Body, Controller, Post } from "@nestjs/common";
import { AuthSignupUseCase } from "src/application/use-cases/auth/signup.usecase";
import { SignupInputDto } from "src/shared/dtos/auth/signup-input.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly signupUC: AuthSignupUseCase) {}

    /** SIGNUP */

    @Post()
    async signup(@Body() signupDto: SignupInputDto) {
        return await this.signupUC.execute(signupDto);
    }

}