import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SurveyState {
  answers: Record<string, string>;
  isMale: boolean;
  isParent: boolean;
}

const initialState: SurveyState = {
  answers: {},
  isMale: false,
  isParent: false,
};

export const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    saveAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string }>
    ) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    setIsMale: (state, action: PayloadAction<boolean>) => {
      state.isMale = action.payload;
    },
    setIsParent: (state, action: PayloadAction<boolean>) => {
      state.isParent = action.payload;
    },
    resetSurvey: (state) => {
      state.answers = {};
    },
  },
});

export const { saveAnswer, resetSurvey, setIsMale, setIsParent } =
  surveySlice.actions;
export default surveySlice.reducer;
