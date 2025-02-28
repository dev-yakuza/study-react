import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ListPage from "./pages/ListPage";
import EditPage from "./pages/EditPage";
import ShowPage from "./pages/ShowPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from './pages/NotFoundPage'

const routes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/blogs',
    element: <ListPage />
  },
  {
    path: '/admin',
    element: <AdminPage />,
    auth: true,
  },
  {
    path: '/blogs/create',
    element: <CreatePage />,
    auth: true,
  },
  {
    path: '/blogs/:id/edit',
    element: <EditPage />,
    auth: true,
  },
  {
    path: '/blogs/:id',
    element: <ShowPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]

export default routes;