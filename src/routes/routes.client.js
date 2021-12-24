import { ClientLayout } from "../layouts/ClientLayout/ClientLayout";
import { Home } from "../pages/Client/Home";

const routesClient = [
  {
    path: "/",
    layout: ClientLayout,
    component: Home,
    exact: true,
  },
];

export default routesClient;
