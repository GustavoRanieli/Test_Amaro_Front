import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectRoutes';
import CreateUser from '../pages/createUser/createUser';
import LoginPage from '../pages/login/login';
import Dashbord from '../pages/dashbord/dashbord';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/createUser' element={<CreateUser />} />
                <Route path='/dashbord' element={
                    <ProtectedRoute>
                        <Dashbord />
                    </ProtectedRoute>
                } /> 
            </Routes>
        </Router>
    )
}

export default AppRouter