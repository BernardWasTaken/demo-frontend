import { observer } from "mobx-react";
import { FC, JSX } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import authStore from "../utils/authstore";

const RestrictedRoute: FC<RouteProps> = ({ children }: RouteProps) => {
  if (authStore.user) {
    return <Navigate to="/" />;
  }
  return children as JSX.Element;
};

export default observer(RestrictedRoute);
