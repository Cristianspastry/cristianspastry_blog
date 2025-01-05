



import { Tip } from "@/core/entities/Tip";
import ITipRepository from "@/core/interfaces/tip/ITipRepository";


export class AddTipUseCase {
    constructor(private tipRepository: ITipRepository) {}

    async execute(tip: Tip): Promise<Tip> {
        return await this.tipRepository.addTip(tip);
    }
}