import { Tip } from "@/core/entities/Tip";

export class TipMapper {
    static toDomain(data: Record<string, unknown>): Tip {
        return {
            id: data.id as string,
            title: data.title as string,
            content: data.content as string,
            imageUrl: data.imageUrl as string,
            createdAt: data.createdAt as Date,
            updatedAt: data.updatedAt as Date
        };
    }
    static toPersistence(tip: Tip): Record<string, unknown> {
        return {
            id: tip.id,
            title: tip.title,
            content: tip.content,
            imageUrl: tip.imageUrl,
            createdAt: tip.createdAt,
            updatedAt: tip.updatedAt
        };
    }

    static toFirestore(tip: Tip): Record<string, unknown> {
        return {
            id: tip.id,
            title: tip.title,
            content: tip.content,
            imageUrl: tip.imageUrl,
            createdAt: tip.createdAt,
            updatedAt: tip.updatedAt
        };
    }
}