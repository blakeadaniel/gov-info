import { TEXT } from "../constants/Text";

export const errorText = (error?: any) => `${TEXT.PLEASE_TRY_AGAIN}${error ?? ''}`