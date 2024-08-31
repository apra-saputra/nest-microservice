import { IsInt } from "class-validator";

export class PostFavoriteDto {
    @IsInt()
    bookId: number
}