import { FC, lazy, Suspense } from "react";
import { Route, RouteProps, Routes as Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";

export enum RouteType {
  PRIVATE,
  RESTRICTED,
}

type AppRoute = RouteProps & {
  type?: RouteType;
};


const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

export const AppRoutes: AppRoute[] = [
  {
    type: RouteType.RESTRICTED,
    path: "/login",
    children: <Login />,
  },
  {
    type: RouteType.RESTRICTED,
    path: "/register",
    children: <Register />,
  },
  {
    type: RouteType.PRIVATE,
    path: "/",
    children: <Home />
  }
];

const Routes: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {AppRoutes.map((r) => {
          const { type } = r;
          if (type === RouteType.PRIVATE) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<PrivateRoute>{r.children}</PrivateRoute>}
              />
            );
          }
          if (type === RouteType.RESTRICTED) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<RestrictedRoute>{r.children}</RestrictedRoute>}
              />
            );
          }

          return (
            <Route key={`${r.path}`} path={`${r.path}`} element={r.children} />
          );
        })}
      </Switch>
    </Suspense>
  );
};

export default Routes;
