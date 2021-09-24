import { useContext } from "react";
import { APIErrorContext } from "../context/APIErrorProvider";

function useAPIError() {
  const { error, addError, removeError } = useContext(APIErrorContext);
  return { error, addError, removeError };
}

export default useAPIError;
