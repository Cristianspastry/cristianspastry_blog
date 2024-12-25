export const serializeDates = (obj: any): any => {
    if (obj instanceof Date) {
      return obj.toISOString();
    } else if (Array.isArray(obj)) {
      return obj.map(serializeDates);
    } else if (typeof obj === "object" && obj !== null) {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, serializeDates(value)])
      );
    }
    return obj;
  };
  