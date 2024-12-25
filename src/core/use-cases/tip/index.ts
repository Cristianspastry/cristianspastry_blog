import FirebaseTipRepository from "@/infrastructure/database/tip/FirebaseTipRepository";
import { GetAllTipUseCase } from "./GetAllTipUseCase";



const repository = new FirebaseTipRepository();


export const getAllTips= async () => {
  const getAllTipsUseCase = new GetAllTipUseCase(repository);
  return await getAllTipsUseCase.execute();
};