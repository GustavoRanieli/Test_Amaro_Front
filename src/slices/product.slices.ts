import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductInputs {
    name: string | null;
    description: string;
    notice: number;
    price: number;
    category: number;
    url_img: string[]; // Adicionado
}

interface ProductInterface {
    id: number;
    name: string | null;
    description: string;
    notice: number;
    price: number;
    category: number;
    url_img: string[]; // Adicionado
}

interface ProductState {
    productList: ProductInterface[];
    name: string | null;
    notice: number | null;
    category: number | null;
    createProductInputs: ProductInputs;
}

const initialState: ProductState = {
    productList: [],
    name: null,
    notice: null,
    category: null,
    createProductInputs: {
        name: '',
        description: '',
        notice: 0,
        price: 0,
        category: 0,
        url_img: [], // Inicializado
    },
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (
            state,
            action: PayloadAction<{
                id: number;
                name: string;
                description: string;
                notice: number;
                price: number;
                category: number;
                url_img: string[]; // Incluindo imagens no payload
            }>
        ) => {
            const productExists = state.productList.some(
                (product) => product.id === action.payload.id
            );

            if (!productExists) {
                state.productList.push(action.payload);
            } else {
                console.warn(`Produto com id ${action.payload.id} já existe e não será adicionado novamente.`);
            }
        },

        removeProduct: (
            state,
            action: PayloadAction<{ id: number }>
        ) => {
            state.productList = state.productList.filter(product => product.id !== action.payload.id);
        },

        setName: (state, action: PayloadAction<string | null>) => {
            state.name = action.payload;
        },

        setNotice: (state, action: PayloadAction<number | null>) => {
            state.notice = action.payload;
        },

        setCategory: (state, action: PayloadAction<number | null>) => {
            state.category = action.payload;
        },

        updateCreateProductInputField: (
            state,
            action: PayloadAction<{ field: keyof ProductInputs; value: string | number | string[] }>
        ) => {
            const { field, value } = action.payload;
            state.createProductInputs[field] = value as any;
        },

        resetCreateProductInputs: (state) => {
            state.createProductInputs = { ...initialState.createProductInputs };
        },

        clearProductList: (state) => {
            state.productList = [];
        },

        addImageToProduct: (
            state,
            action: PayloadAction<{ productId: number; imageUrl: string }>
        ) => {
            const product = state.productList.find(product => product.id === action.payload.productId);
            if (product) {
                product.url_img.push(action.payload.imageUrl);
            }
        },

        removeImageFromProduct: (
            state,
            action: PayloadAction<{ productId: number; imageUrl: string }>
        ) => {
            const product = state.productList.find(product => product.id === action.payload.productId);
            if (product) {
                product.url_img = product.url_img.filter(image => image !== action.payload.imageUrl);
            }
        },

        clearImagesFromProduct: (
            state,
            action: PayloadAction<{ productId: number }>
        ) => {
            const product = state.productList.find(product => product.id === action.payload.productId);
            if (product) {
                product.url_img = [];
            }
        },
    },
});

export const {
    addProduct,
    updateCreateProductInputField,
    resetCreateProductInputs,
    removeProduct,
    setNotice,
    setCategory,
    clearProductList,
    addImageToProduct,
    removeImageFromProduct,
    clearImagesFromProduct,
    setName
} = productSlice.actions;

export default productSlice.reducer;
export type { ProductInterface };
