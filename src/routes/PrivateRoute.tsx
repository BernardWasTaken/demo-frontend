import { observer } from "mobx-react";
import { FC, JSX } from "react";
import { Navigate, RouteProps, useLocation } from "react-router-dom";
import authStore from "../utils/authstore";

const PrivateRoute: FC<RouteProps> = ({ children }: RouteProps) => {

  if (!authStore.user) {
    return (
      <Navigate
        to={"/login"}
      />
    );
  }

  return children as JSX.Element;
};

export default observer(PrivateRoute);
