export class CommentaryOutputDto {
    id: number;
    authorDisplay: string;
    authorId: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date | null;
}