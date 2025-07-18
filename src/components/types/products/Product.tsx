import { Brand, Category } from "./Enums";
import { SelectibleOption } from "./Selectible-option";

export interface Product {
    id:                string;
    product_name:      string;
    category:          Category;
    price:             number;
    brand:             Brand;
    stock_quantity:    number;
    release_date:      string;
    description:       string;
    selectible_option: SelectibleOption | null;
}

