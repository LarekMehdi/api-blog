import { CommentaryOutputDto } from "../commentary/commentary-output.dto";

export class ArticleOutputDto {
    id: number;
    title: string;
    content: string;
    authorDisplay: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date | null;
    commentaries: CommentaryOutputDto[];
}