import { createBrowserRouter } from 'react-router-dom';
import userRoutes from './userRoutes';
import adminRoutes from './adminRoutes';
import publicRoutes from './publicRoutes';

const router = createBrowserRouter([
    ...userRoutes,
    ...adminRoutes,
    ...publicRoutes,
]);

export default router;
