import { createBrowserRouter } from 'react-router-dom';
import userRoutes from './userRoutes';
import adminRoutes from './adminRoutes';
import publicRoutes from './publicRoutes';
import NotFound from '../pages/Error/NotFound';

const router = createBrowserRouter([
    ...userRoutes,
    ...adminRoutes,
    ...publicRoutes,
    {
        path:'*',
        Component:NotFound
    }
]);

export default router;
