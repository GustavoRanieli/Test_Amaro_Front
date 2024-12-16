import './User.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, clearProductList, ProductInterface, setCategory, setName, setNotice } from "../../slices/product.slices";
import { RootState, AppDispatch } from '../../store/store';
import ProductModal from "../../components/productModal/productModal";

 
const User = () => {
    const dispatch: AppDispatch = useDispatch();

    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState< ProductInterface | null >(null);

    // Const Redux
    const name = useSelector((state:RootState) => state.product.name);
    const notice = useSelector((state:RootState) => state.product.notice);
    const category = useSelector((state:RootState) => state.product.category);
    const productList = useSelector((state: RootState) => state.product.productList);

    // Manipulação Product Modal
    const handleOpenProductModal = () => {
        setIsModalProductOpen(true);
    }

    const handleCloseProductModal = () => {
        setIsModalProductOpen(false)
    }

    // Exibindo detalhes do produto
    const handleViewProduct = (product: any) => {
        setCurrentProduct(product);
        handleOpenProductModal();
    };

    useEffect(() => {
        handleProduct();
    }, [name, category, notice]);

    // Pegando a lista de produtos
    const handleProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/products?category=${category}&notice=${notice}&name=${name}`);
            const data = response.data.products;

            // Atualizar o estado do produto list após receber dados da API
            dispatch(clearProductList());
            data.map(element => {
                dispatch(addProduct(element));
            });
        } catch (error) {
            console.error('Erro durante o fetch:', error);
            alert('Erro ao tentar puxar lista de produtos');
        }
    };

    return(
        <div className='container'>
            <h1>User Comum - Gerenciar Produtos</h1>
            {/* Filtros */}
            <div style={{ marginBottom: '20px' }}>
                <label>
                    Nome:
                    <input
                        type="text"
                        placeholder="Nome Produto"
                        onChange={(e) => { e.target.value == '' ? dispatch(setName(null)) : dispatch(setName(e.target.value))}}
                        />
                    </label>
                <label>
                Categoria:
                    <select onChange={(e) => { e.target.value == 'null' ? dispatch(setCategory(null)) : dispatch(setCategory(parseInt(e.target.value)))}}>
                        <option selected value="null">Todas</option>
                        <option value="1">Comum</option>
                        <option value="2">Raro</option>
                    </select>
                </label>
                
                <label style={{ marginLeft: '10px' }}>
                Nota mínima:
                <input
                    type="number"
                    placeholder="Nota mínima"
                    onChange={(e) => { e.target.value == '' ? dispatch(setNotice(null)) : dispatch(setNotice(parseInt(e.target.value)))}}
                />
                </label>
            </div>
            <div>
                {/* Renderização da lista de produtos com chaves únicas */}
                {productList.map((product) => (
                    <div className="productItem" key={product.id}>
                        {product.url_img && <img src={"http://localhost:3000/" + product.url_img.replace(/\\/g, '/')} alt={product.name} style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Preço: R$ {product.price}</p>
                        <p>Nota: {product.notice}</p>
                        <p>Categoria: {product.category === 1 ? 'Comum' : 'Raro'}</p>
                        <button className="viewButton" onClick={() => handleViewProduct(product)}>Ver Detalhes</button>
                    </div>
                ))}
            </div>

            {currentProduct && (
                <ProductModal isOpen={isModalProductOpen} onClose={handleCloseProductModal}>
                    <div className="modalContent">
                        <h2>Detalhes do Produto</h2>
                            {currentProduct.url_img && <img src={"http://localhost:3000/" + currentProduct.url_img.replace(/\\/g, '/')} alt={currentProduct.name} style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                            <p><strong>Nome:</strong> {currentProduct.name}</p>
                            <p><strong>Descrição:</strong> {currentProduct.description}</p>
                            <p><strong>Preço:</strong> R$ {currentProduct.price}</p>
                            <p><strong>Nota:</strong> {currentProduct.notice}</p>
                            <p><strong>Categoria:</strong> {currentProduct.category === 1 ? 'Comum' : 'Raro'}</p>
                    </div>
                </ProductModal>
            )}
        </div>
    )
}

export default User;