// interfaces
import { Price } from "../price";
import { Product } from "../product";

export interface ProductWithPrice extends Product{
    prices?: Price[];
}