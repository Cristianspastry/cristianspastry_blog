import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Tip } from "@/core/entities/Tip";
import { getAllTips } from "@/core/use-cases/tip"; // Funzione per recuperare i tips

// Definisci un createAsyncThunk per il recupero dei tips
export const fetchTips = createAsyncThunk("tips/fetchAll", async () => {
  const tips = await getAllTips();
  return tips;
});

interface TipState {
  tips: Tip[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TipState = {
  tips: [],
  status: "idle",
  error: null,
};

const tipSlice = createSlice({
  name: "tips",
  initialState,
  reducers: {
    addTip: (state, action: PayloadAction<Tip>) => {
      state.tips.push(action.payload);
    },
    removeTip: (state, action: PayloadAction<number>) => {
      state.tips = state.tips.filter((_, index) => index !== action.payload);
    },
    updateTip: (state, action: PayloadAction<{ index: number; updatedTip: Tip }>) => {
      const { index, updatedTip } = action.payload;
      if (index >= 0 && index < state.tips.length) {
        state.tips[index] = updatedTip;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTips.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTips.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tips = action.payload;
      })
      .addCase(fetchTips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tips";
      });
  },
});

export const { addTip, removeTip, updateTip } = tipSlice.actions;
export default tipSlice.reducer;