import { Product } from "../Product/types";

export interface ProductFormProps {
    action: (FormData: FormData, id: string) => Promise<{error?: string; success?: string, id?: string}>;
    initialData?: Product;
}