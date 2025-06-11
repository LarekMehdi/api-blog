import { Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/user/user.entity";
import { CommentaryRepository } from "src/domain/repositories/commentary.repository";
import { UserRepository } from "src/domain/repositories/user.repository";
import { SignupInputDto } from "src/shared/dtos/auth/signup-input.dto";
import { CreateCommentaryInputDto } from "src/shared/dtos/commentary/create-commentary-input.dto";
import { CreateCommentaryDto } from "src/shared/dtos/commentary/create-commentary.dto";
import { UserFullnameInputDto } from "src/shared/dtos/user/user-fullname-input.dto";

@Injectable()
export class CreateCommentaryUseCase {
    constructor(private readonly commentaryRepository: CommentaryRepository,
                private readonly userRepository: UserRepository,
    ) {}
    
    async execute(dto: CreateCommentaryInputDto, articleId: number) {
      
        const authorDto: UserFullnameInputDto = {
            firstname: dto.firstname,
            lastname: dto.lastname
        }

        let author: Partial<User>|null = await this.userRepository.findByFullname(authorDto);

        if (!author) {
            const signupDto: SignupInputDto = {...authorDto};
            author = await this.userRepository.signup(signupDto);
        }

        const authorId: number = author.id!;
        const createData: CreateCommentaryDto = {
            title: dto.title,
            content: dto.content,
            authorId: authorId,
            articleId: articleId,
        }

        return await this.commentaryRepository.create(createData);
    }
}