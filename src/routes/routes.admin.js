import { LoginAdmin } from "../pages/Admin/LoginAdmin/LoginAdmin";
import { AdminLayout } from "../layouts/AdminLayout/AdminLayout";
const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: LoginAdmin,
    exact: true,
  },
];

export default routesAdmin;
