import { Recipe } from "@/core/entities/Recipe";

type SerializableValue = string | number | boolean | null | Date | SerializableObject | SerializableArray | Recipe;
type SerializableObject = { [key: string]: SerializableValue };
type SerializableArray = SerializableValue[];

export const serializeDates = <T extends SerializableValue>(obj: T): T => {
  if (obj instanceof Date) {
    return obj.toISOString() as T;
  } else if (Array.isArray(obj)) {
    return obj.map(serializeDates) as T;
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, serializeDates(value)])
    ) as T;
  }
  return obj;
};

