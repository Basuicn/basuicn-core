import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../routes';
import { DashboardLayout } from './components/ui/layout/DashboardLayout';

/**
 * Hàm flattenRoutes: Biến cấu trúc cây thành mảng phẳng để dùng với React Router.
 * Đồng thời xử lý việc ghép nối path với prefix.
 */
const flattenRoutes = (routes: any[], parentPath = ''): any[] => {
  let flat: any[] = [];

  routes.forEach((route) => {
    // Kết hợp đường dẫn từ cha và prefix nếu có
    const combinedPath = [parentPath, route.prefix, route.path]
      .filter(Boolean)
      .join('/')
      .replace(/\/+/g, '/'); // Clean up double slashes

    const processedRoute = {
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
  
  // Tách biệt route có layout và không có layout (standalone)
  const layoutRoutes = allRoutes.filter(r => !r.standalone);
  const standaloneRoutes = allRoutes.filter(r => r.standalone);

  return (
    <BrowserRouter>
      <Routes>
        {/* Render standalone routes first */}
        {standaloneRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {/* Dashboard Layout Routes */}
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
