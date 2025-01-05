import { Tip } from "@/core/entities/Tip";
import ITipRepository from "@/core/interfaces/tip/ITipRepository";


export class UpdateTipUseCase {
    constructor(private tipRepository: ITipRepository) {}

    execute(tip: Tip): Promise<Tip> {
        return this.tipRepository.updateTip(tip.id, tip);
    }
}