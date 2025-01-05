import FirebaseTipRepository from "@/infrastructure/database/tip/FirebaseTipRepository";
import { GetAllTipUseCase } from "./GetAllTipUseCase";
import { GetTipByIdUseCase } from "./GetTipByIdUseCase";
import { GetTipBySlugUseCase } from "./GetTipBySlugUseCase";
import { AddTipUseCase } from "./AddTipUseCase";
import { Tip } from "@/core/entities/Tip";
import { UpdateTipUseCase } from "./UpDateTipUseCase";
import { DeleteTipUseCase } from "./DeleteTipUseCase";



const repository = new FirebaseTipRepository();


export const GetAllTips= async () => {
  const getAllTipsUseCase = new GetAllTipUseCase(repository);
  return await getAllTipsUseCase.execute();
};

export const GetTipById = async (id: string) : Promise<Tip | null> => {
  const getTipByIdUseCase = new GetTipByIdUseCase(repository);
  return await getTipByIdUseCase.execute(id);
}

export const GetTipBySlug = async (slug: string) => {
  const getTipBySlugUseCase = new GetTipBySlugUseCase(repository);
  return await getTipBySlugUseCase.execute(slug);
}

export const AddTip = async (tip: Tip) => {
  const addTipUseCase = new AddTipUseCase(repository);
  return await addTipUseCase.execute(tip);
}

export const UpdateTip = async (tip: Tip) => {
  const updateTipUseCase = new UpdateTipUseCase(repository);
  return await updateTipUseCase.execute(tip);
}

export const DeleteTip = async (id: string) => {
  const deleteTipUseCase = new DeleteTipUseCase(repository);
  return await deleteTipUseCase.execute(id);
}


