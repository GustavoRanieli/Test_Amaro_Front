import axios from 'axios';
import Modal from '../../components/modal/modal';
import ProductModal from '../../components/productModal/productModal';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { updateCreateProductInputField, resetCreateProductInputs, addProduct, ProductInterface, removeProduct, setNotice, setCategory, clearProductList, setName } from '../../slices/product.slices';
import './Admin.css'; // Importando o arquivo de estilos

const Admin = () => {
    const dispatch: AppDispatch = useDispatch();

    // States Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState< ProductInterface | null >(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);


    // Const Redux
    const name = useSelector((state:RootState) => state.product.name);
    const notice = useSelector((state:RootState) => state.product.notice);
    const category = useSelector((state:RootState) => state.product.category);
    const productList = useSelector((state: RootState) => state.product.productList);
    const createProductInputs = useSelector((state: RootState) => state.product.createProductInputs);


    // Manipulação Product Modal
    const handleOpenProductModal = () => {
        setIsModalProductOpen(true);
    }

    const handleCloseProductModal = () => {
        setIsModalProductOpen(false)
    }

    // Manipulação do Modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleInputChange = (field: keyof typeof createProductInputs) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.target.type === 'number' || field === 'category' ? parseFloat(event.target.value) : event.target.value;
        dispatch(updateCreateProductInputField({ field, value }));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        dispatch(resetCreateProductInputs());
    };

    // Cadastrando novo produto
    const handleFileChange = (file: File) => {
        setSelectedImage(file);
    };

    // Cadastrando novo produto
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', createProductInputs.name);
        formData.append('description', createProductInputs.description);
        formData.append('price', createProductInputs.price.toString());
        formData.append('notice', createProductInputs.notice.toString());
        formData.append('category', createProductInputs.category.toString());
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            await axios.post('http://localhost:3000/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Produto cadastrado com sucesso!');
            handleCloseModal();
            // Refresh the product list
            handleProduct();
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto.');
        }
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

     // Excluindo produto
     const handleDeleteProduct = async (productId: number) => {
        try {
            await axios.delete(`http://localhost:3000/products/${productId}`);
            dispatch(removeProduct(productId));
            window.location.reload();
            alert('Produto excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto.');
        }
    };

    // Exibindo detalhes do produto
    const handleViewProduct = (product: any) => {
        setCurrentProduct(product);
        handleOpenProductModal();
    };

    return (
        <div className="container">
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="modalContent">
                    <h2>Cadastrar Produto</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="formGroup">
                            <label className="label">Nome:</label>
                            <input
                                type="text"
                                className="inputField"
                                value={createProductInputs.name}
                                onChange={handleInputChange('name')}
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label className="label">Descrição:</label>
                            <textarea
                                className="inputField"
                                value={createProductInputs.description}
                                onChange={handleInputChange('description')}
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label className="label">Preço:</label>
                            <input
                                type="number"
                                className="inputField"
                                value={createProductInputs.price}
                                onChange={handleInputChange('price')}
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label className="label">Nota:</label>
                            <input
                                type="number"
                                className="inputField"
                                value={createProductInputs.notice}
                                onChange={handleInputChange('notice')}
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label className="label">Categoria:</label>
                            <select
                                className="selectField"
                                onChange={handleInputChange('category')}
                                value={createProductInputs.category}
                            >
                                <option selected value="0" disabled ></option>
                                <option value="1">Comum</option>
                                <option value="2">Raro</option>
                            </select>
                        </div>
                        <div className="formGroup">
                            <label className="label">Imagem:</label>
                            <input
                                type="file"
                                className="inputField"
                                onChange={(e) => handleFileChange(e.target.files[0])}
                                accept="image/png, image/jpeg"
                                required
                            />
                        </div>
                        <button type="submit" className="button">Cadastrar</button>
                    </form>
                </div>
            </Modal>
            <h1>Admin - Gerenciar Produtos</h1>
            <button className="button" onClick={handleOpenModal}>Adicionar Produto</button>

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
                        <button className="deleteButton" onClick={() => handleDeleteProduct(product.id)}>Excluir</button>
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
    );
};

export default Admin;
