import './login.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setEmail, setPassword, setToken } from '../../slices/user.slices';

const Login = () => {
    const navigate = useNavigate();

    // Config Store
    const dispatch: AppDispatch = useDispatch();

    // Config states
    const [loading, setLoading] = useState(false);
    const email =  useSelector((state: RootState ) => state.user.email );
    const password = useSelector((state: RootState ) => state.user.password );

    const handleLogin = async () => {
        setLoading(true);
        try {
          const response = await axios.post('http://localhost:3000/users/login', {
            email,
            password
          });
    
          const data = response.data;
          if (data.token) {
            dispatch(setToken(data.token)); // Salva o token no estado e nos cookies
            navigate('/dashbord', { state: { fk_function: data.fk_function } })
          } else {
            alert('Login falhou: ' + data.message);
          }
        } catch (error) {
          console.error('Erro durante o login:', error);
          alert('Erro ao tentar fazer login.');
        }
      };

    return(
        <div className='loginContainer'>
          <div className="login-container">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => dispatch(setEmail(e.target.value))}
            />
            <input
                type="password"
                placeholder="Senha"
                onChange={(e) => dispatch(setPassword(e.target.value))}
            />
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Entrando...' : 'Login'}
            </button>
            <a href="/createUser">Criar usuário</a>
          </div>
        </div>
    )
}

export default Login