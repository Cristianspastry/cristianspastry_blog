import { Tip } from "@/core/entities/Tip";

export class TipMapper {
    static toDomain(data: Record<string, unknown>): Tip {
        return {
            id: data.id as string,
            title: data.title as string,
            slug : data.slug as string,
            content: data.content as string,
            imageUrl: data.imageUrl as string,
            createdAt: data.createdAt as Date,
            updatedAt: data.updatedAt as Date
        };
    }
    static toPersistence(tip: Tip): Record<string, unknown> {
       return this.toFirestore(tip);
    }

    static toFirestore(tip: Tip): Record<string, unknown> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = tip;
        return {
            ...rest,
        };
    }
}