import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SurveyState {
  answers: Record<string, string>;
}

const initialState: SurveyState = {
  answers: {
    q1: "Male",
  },
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
    resetSurvey: (state) => {
      state.answers = {};
    },
  },
});

export const { saveAnswer, resetSurvey } = surveySlice.actions;
export default surveySlice.reducer;
