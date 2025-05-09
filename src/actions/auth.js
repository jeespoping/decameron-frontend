import { login, loginByToken } from "../api/auth";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../reducers/authReducer";
import { setAccesToken } from "../utils/token";

export const getMe = () => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await loginByToken();
    dispatch(
      loginSuccess({
        user: response.user,
      })
    );
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message));
    return null;
  }
};

export const loginActions = (formData) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await login(formData);

    dispatch(loginSuccess(response));
    setAccesToken(response.token);

    return response;
  } catch (error) {
    dispatch(loginFailure(error.message));
    return null;
  }
};
