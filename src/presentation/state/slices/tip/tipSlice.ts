import { createSlice, createAsyncThunk, PayloadAction,  } from "@reduxjs/toolkit";
import { Tip } from "@/core/entities/Tip";
import { AddTip, DeleteTip, GetAllTips, GetTipById, GetTipBySlug } from "@/core/use-cases/tip";

export const fetchTips = createAsyncThunk("tips/fetchAll", async () => {
  const tips = await GetAllTips();
  return tips;
});

export const fetchTipById = createAsyncThunk<Tip, string>(
  'tips/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const tip = await GetTipById(id);
      if (!tip) {
        return rejectWithValue('Tip not found');
      }
      return tip;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error fetching tip');
    }
  }
);

export const saveTip = createAsyncThunk<Tip, Tip>(
  "tips/save",
  async (tip: Tip, { rejectWithValue }) => {
    try {
      // Assicurati che lo slug sia presente
      if (!tip.slug) {
        throw new Error('Slug is required');
      }
      const savedTip = await AddTip(tip);
      return savedTip as Tip;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error saving tip');
    }
  }
);

export const fetchTipBySlug = createAsyncThunk(
  'tips/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await GetTipBySlug(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error fetching tip');
    }
  }
);

export const deleteTip = createAsyncThunk(
  'tips/delete',
  async (id: string) => {
    await DeleteTip(id);
    return id;
  }
);

interface TipState {
  tips: Tip[];
  currentTip: Tip | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TipState = {
  tips: [],
  currentTip: null,
  status: "idle",
  error: null
};

const tipSlice = createSlice({
  name: "tips",
  initialState,
  reducers: {},
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
      })

      .addCase(fetchTipById.pending, (state) => {
        state.status = 'loading';
        state.currentTip = null;
        state.error = null;
      })
      .addCase(fetchTipById.fulfilled, (state, action: PayloadAction<Tip>) => {
        state.status = 'succeeded';
        state.currentTip = action.payload;
        state.error = null;
        console.log('Tip fetched successfully:', action.payload)
      })
      .addCase(fetchTipById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to fetch tip';
        state.currentTip = null;
        console.error('Failed to fetch tip:', action.payload)
      })

      .addCase(saveTip.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveTip.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tips.findIndex(tip => tip.id === action.payload.id);
        if (index !== -1) {
          state.tips[index] = action.payload;
        } else {
          state.tips.push(action.payload);
        }
      })
      .addCase(saveTip.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string || "Error saving tip";
      })

      .addCase(deleteTip.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTip.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tips = state.tips.filter(tip => tip.id !== action.payload);
      })
      .addCase(deleteTip.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete tip";
      })

      .addCase(fetchTipBySlug.pending, (state) => {
        state.status = 'loading';
        state.currentTip = null;
      })
      .addCase(fetchTipBySlug.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentTip = action.payload;
        state.error = null;
      })
      .addCase(fetchTipBySlug.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tip';
        state.currentTip = null;
      });
  }
});

export default tipSlice.reducer;

