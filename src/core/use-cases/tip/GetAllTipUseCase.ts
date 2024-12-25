import { Tip } from "@/core/entities/Tip";
import ITipRepository from "@/core/interfaces/tip/ITipRepository";


export class GetAllTipUseCase {
    constructor(private tipRepository: ITipRepository) {}

    async execute(): Promise<Tip[]> {
        return await this.tipRepository.getAllTips();
    }
}