import Navbar from '../../components/navbar/navbar';
import AdminDash from '../admin/admin';
import UserDash from '../user/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { clearToken } from '../../slices/user.slices';
import axios from 'axios';
import { useEffect } from 'react';


const Dashbord = () => {
    // Config Store
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const fk_function:number = location.state?.fk_function;
    const token = useSelector((state: RootState ) => state.user.token );
    
    const removeToken = () => {
        dispatch(clearToken());
        navigate('/');
    }
    

    return(
        <>
            <Navbar username={(fk_function == 1) ? 'Admin' : 'Usuario'} token={token} onLogout={removeToken} />
            { (fk_function == 1 ) ? <AdminDash /> : <UserDash />}
        </>
    )
}

export default Dashbord