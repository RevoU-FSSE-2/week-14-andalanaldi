export interface GetProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface Product {
    id: number;
    title: string;
    status: boolean;
}

export type CategoryForm = Omit<Category,'id'>

// export interface Category extends CategoryForm {
//     id: string | undefined;
// }

// export type ProductForm = Omit<Product,'id'>

export interface LoginForm {
    email: string;
    password: string;
}

export interface LoginResponse {
    // email: string;
    // firstName: string;
    // lastName: string;
    // username: string;
    token: string;
}

export interface RegisForm {
    name: string;
    email   : string;
    password: string;
}

export interface RegisResponse {
    id: string;
    name: string;
    email: string;
    password: string;
    updated_at: string;
    created_at: string;
}

interface token {
    token : string;
}

export interface LoginResponse2 {
    data: token;
}

export const headers = {
    Authorization: `bearer ${localStorage.getItem('token')}`
}

export interface GetCategoryResponse {
    data: Category[];
    current_page: number;
    total_item: number;
    total_page: number;
}

export interface Category {
    id: string | undefined;
    name: string;
    is_active: boolean;
}