import { Tip } from "@/core/entities/Tip";
import ITipRepository from "@/core/interfaces/tip/ITipRepository";



export class GetTipByIdUseCase {
    constructor(private repository: ITipRepository) {}
  
    async execute(id: string): Promise<Tip | null> {
      return await this.repository.getTipById(id);
    }
  }