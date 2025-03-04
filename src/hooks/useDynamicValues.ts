import { setIsMale, setIsParent } from "@/store/reducers/surveySlice";
import { DynamicValue } from "@/types";
import { useDispatch } from "react-redux";

export const useDynamicValues = () => {
  const dispatch = useDispatch();

  const setDynamicValue = (key: DynamicValue, value: string) => {
    if (key.toLowerCase() === DynamicValue.GENDER.toLowerCase()) {
      dispatch(setIsMale(value.toLowerCase() === "male"));
    }
    if (key.toLowerCase() === DynamicValue.IS_PARENT.toLowerCase()) {
      dispatch(setIsParent(value.toLowerCase() === "yes"));
    }
  };

  const replaceDynamicValues = (
    textToReplace: string,
    isMale: boolean,
    isParent: boolean
  ) => {
    console.log(textToReplace);
    return textToReplace
      .replace(/\{gender\}/g, isMale ? "male" : "female")
      .replace(/\{isParent\}/g, isParent ? "who have children" : "");
  };

  return {
    setDynamicValue,
    replaceDynamicValues,
  };
};
