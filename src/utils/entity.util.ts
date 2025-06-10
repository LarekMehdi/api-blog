import { User } from "src/domain/entities/user/user.entity";

export abstract class UtilEntity {

    static getAuthorDisplay(author: Partial<User>|undefined): string {
        if (!author) return '';
        return `${author.firstname} ${author.lastname}`
    }

    static getSelectColumns<T>(columns?: (keyof T)[]): Record<keyof T, boolean>|undefined {

        const select = columns?.reduce((acc, column) => {
            acc[column] = true;
            return acc;
        }, {} as Record<keyof T, boolean>);

        return select;
    }
}