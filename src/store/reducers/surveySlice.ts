import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SurveyState {
  answers: Record<string, Record<string, string>>;
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
      action: PayloadAction<{
        surveyId: string;
        questionId: string;
        answer: string;
      }>
    ) => {
      state.answers[action.payload.surveyId] = {
        ...state.answers[action.payload.surveyId],
        [action.payload.questionId]: action.payload.answer,
      };
    },
    setIsMale: (state, action: PayloadAction<boolean>) => {
      state.isMale = action.payload;
    },
    setIsParent: (state, action: PayloadAction<boolean>) => {
      state.isParent = action.payload;
    },
    resetSurvey: (state, action: PayloadAction<string>) => {
      delete state.answers[action.payload];
    },
  },
});

export const { saveAnswer, resetSurvey, setIsMale, setIsParent } =
  surveySlice.actions;
export default surveySlice.reducer;
