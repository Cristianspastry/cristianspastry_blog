import ITipRepository from "@/core/interfaces/tip/ITipRepository";



export class DeleteTipUseCase {
    constructor(private tipRepository: ITipRepository) {}
    async execute(id: string): Promise<void> {
        return await this.tipRepository.deleteTip(id);
    }
  }