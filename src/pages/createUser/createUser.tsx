import './createUser.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setEmail, setPassword, setToken, setFk_function, setName } from '../../slices/user.slices';

const createUser = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // Captura os valores do estado do Redux no nível do componente
    const name = useSelector((state: RootState) => state.user.name);
    const email = useSelector((state: RootState) => state.user.email);
    const password = useSelector((state: RootState) => state.user.password);
    const fk_function = useSelector((state: RootState) => state.user.fk_function);

    const returnLogin = () => {
        navigate('/');
    }

    const createUserForm = async () => {
        try {
            const response = await axios.post('http://localhost:3000/users/register', {
                name,
                email,
                password,
                fk_function,
            });
            navigate('/'); // Redireciona para a página de login
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            alert('Erro ao tentar Criar usuário');
        }
    };

    return(
        <>
            <div className="create-user-container">
                <h2>Criar Usuário</h2>
                <input 
                    type="text" 
                    placeholder="Nome"
                    onChange={(e) => dispatch(setName(e.target.value))}
                />
                <input 
                    type="text" 
                    placeholder="E-mail"
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                />
                <select onChange={(e) => dispatch(setFk_function(parseInt(e.target.value)))}>
                    <option value="" disabled selected>Selecione uma função</option>
                    <option value="1">Admin</option>
                    <option value="2">Usuário</option>
                </select>
                <button onClick={createUserForm}>Enviar</button>
                <button onClick={returnLogin}>Voltar</button>
            </div>
        </>
    )
}

export default createUser