import { Module } from '@nestjs/common';

// Domain
import { UserRepository } from './domain/repositories/user.repository';
import { ArticleRepository } from './domain/repositories/article.repository';
import { CommentaryRepository } from './domain/repositories/commentary.repository';

// Application (Use cases)
import { AuthSignupUseCase } from './application/use-cases/auth/signup.usecase';
import { CreateArticleUseCase } from './application/use-cases/article/create-article.usecase';
import { FindAllArticleUseCase } from './application/use-cases/article/find-all-article.usecase';
import { CreateCommentaryUseCase } from './application/use-cases/commentary/create-commentary.usecase';
import { FindAllCommentaryUseCase } from './application/use-cases/commentary/find-all-comentary.usecase';

// Infrastructure (Concrete implementation)
import { PrismaModule } from './infrastructure/repositories/prisma/.config/prisma.module';
import { UserPrismaAdapter } from './infrastructure/repositories/prisma/user/user-prisma.adapter';
import { ArticlePrismaAdapter } from './infrastructure/repositories/prisma/article/article-prisma.adapter';
import { CommentaryPrismaAdapter } from './infrastructure/repositories/prisma/commentary/commentary-prisma.adapter';

// Controllers
import { AuthController } from './controllers/auth/auth.controller';
import { ArticleController } from './controllers/article/article.controller';
import { CommentaryController } from './controllers/commentary/commentary.controller';
import { FindAllCommentaryByArticleIdUseCase } from './application/use-cases/commentary/find-all-commentary-by-article-id.usecase';
import { DeleteCommentaryUseCase } from './application/use-cases/commentary/delete-commentary.usecase';
import { FindArticleByIdUseCase } from './application/use-cases/article/find-by-id.usecase';
import { FindAllUserByIdsUseCase } from './application/use-cases/user/find-all-by-ids.usecase';
import { FindUserByIdUseCase } from './application/use-cases/user/find-by-id.usecase';


@Module({
  imports: [
    // Import necessary modules here
    PrismaModule,

  ],
  controllers: [
    // Controllers (entry points – e.g., HTTP)
    AuthController,
    ArticleController,
    CommentaryController,
  ],
  providers: [
    // Use cases (Application layer)
    AuthSignupUseCase,
    FindAllUserByIdsUseCase,
    FindUserByIdUseCase,
    CreateArticleUseCase,
    FindAllArticleUseCase,
    FindArticleByIdUseCase,
    CreateCommentaryUseCase,
    FindAllCommentaryUseCase,
    FindAllCommentaryByArticleIdUseCase,
    DeleteCommentaryUseCase,


    // Concrete implementations (Infrastructure layer)
    UserPrismaAdapter,
    ArticlePrismaAdapter,

    // Bind domain abstractions to infrastructure implementations
    {
      provide: UserRepository,
      useClass: UserPrismaAdapter,
    },
    {
      provide: ArticleRepository,
      useClass: ArticlePrismaAdapter,
    },
    {
      provide: CommentaryRepository,
      useClass: CommentaryPrismaAdapter
    },
  ],
})
export class AppModule {}
