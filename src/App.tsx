import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES, type RouteConfig } from '../routes';
import { DashboardLayout } from './components/layout/Layout';

interface FlatRoute extends RouteConfig {
  path: string;
}

const flattenRoutes = (routes: RouteConfig[], parentPath = ''): FlatRoute[] => {
  let flat: FlatRoute[] = [];

  routes.forEach((route) => {
    const combinedPath = [parentPath, route.prefix, route.path]
      .filter(Boolean)
      .join('/')
      .replace(/\/+/g, '/');

    const processedRoute: FlatRoute = {
      ...route,
      path: combinedPath === '' ? '/' : combinedPath,
    };

    if (route.element) {
      flat.push(processedRoute);
    }

    if (route.children) {
      flat = [...flat, ...flattenRoutes(route.children, combinedPath)];
    }
  });

  return flat;
};

const App = () => {
  const allRoutes = React.useMemo(() => flattenRoutes(ROUTES), []);

  const layoutRoutes = allRoutes.filter(r => !r.standalone);
  const standaloneRoutes = allRoutes.filter(r => r.standalone);

  return (
    <BrowserRouter>
      <Routes>
        {standaloneRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route path="/" element={<DashboardLayout />}>
          {layoutRoutes.map((route) => (
            <Route
              key={route.path}
              index={route.path === '/'}
              path={route.path === '/' ? undefined : route.path.replace(/^\//, '')}
              element={route.element}
            />
          ))}

          <Route path="*" element={<div className="p-20 text-center text-muted-foreground">Đang xây dựng...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
