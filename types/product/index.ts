import Stripe from "stripe";

export interface Product {
    id: string;
    active?: boolean;
    name?: string;
    description?: string;
    iamge?: string;
    metadata?: Stripe.Metadata;
}