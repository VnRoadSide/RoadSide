export interface AddStripeCard{
    Name: string;
    CardNumber: string;
    ExpirationYear: string;
    ExpirationMonth: string;
    Cvc: string;
}

export interface StripeCustomer{
    Name: string;
    CustomerId: string;
    Email: string;
} 

export interface StripePayment{
    Amount: number;
    Currency: string;
    Description: string;
    CustomerId: string;
    ReceiptEmail: string;
    PaymentId: string;
} 

export interface AddStripePayment{
    Amount: number;
    Currency: string;
    Description: string;
    CustomerId: string;
    ReceiptEmail: string;
}
export interface AddStripeCustomer{
    Email: string;
    Name: string;
    CreditCard: AddStripeCard;
} 
export interface CreateCheckoutSessionStripeRequest{
    quantity: number
    price: number;
    productName: string;
    userId: string;
} 