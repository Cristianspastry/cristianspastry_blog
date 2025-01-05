import ITipRepository from "@/core/interfaces/tip/ITipRepository";



export class GetTipBySlugUseCase {
    constructor(private repository: ITipRepository) {}
    async execute(slug: string) {
        return await this.repository.getTipBySlug(slug);
    }
}