using RoadSide.Domain.Stripe;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace RoadSide.Infrastructure.Stripe;
public class CheckoutService: ICheckoutService
{
		private readonly ChargeService _chargeService;
		private readonly CustomerService _customerService;
		private readonly TokenService _tokenService;


		public CheckoutService(ChargeService chargeService, CustomerService customerService, TokenService tokenService)
		{
			_chargeService = chargeService;
			_customerService = customerService;
			_tokenService = tokenService;
		}


		public async ValueTask<StripeCustomer> AddStripeCustomerAsync(AddStripeCustomer customer, CancellationToken ct)
		{
			var tokenOptions = customer.CreditCard.CardNumber is null ? new TokenCreateOptions
			{
				Account = new TokenAccountOptions
				{
					Individual = new TokenAccountIndividualOptions
					{
						FirstName = customer.Name,
						Email = customer.Email
					}
				}
			} : new TokenCreateOptions
			{
				Card = new TokenCardOptions
				{
					Name = customer.Name,
					Number = customer.CreditCard.CardNumber,
					ExpYear = customer.CreditCard.ExpirationYear,
					ExpMonth = customer.CreditCard.ExpirationMonth,
					Cvc = customer.CreditCard.Cvc
				}
			};
			
			var stripeToken = await _tokenService.CreateAsync(tokenOptions, null, ct);

			var customerOptions = new CustomerCreateOptions
			{
				Name = customer.Name,
				Email = customer.Email,
				Source = stripeToken.Id
			};	

			Customer createdCustomer = await _customerService.CreateAsync(customerOptions, null, ct);

			return new StripeCustomer(createdCustomer.Name, createdCustomer.Email, createdCustomer.Id);
		}

		public async ValueTask<StripePayment> AddStripePaymentAsync(AddStripePayment payment, CancellationToken ct)
		{

			ChargeCreateOptions paymentOptions = new ChargeCreateOptions
			{
				Customer = payment.CustomerId,
				ReceiptEmail = payment.ReceiptEmail,
				Description = payment.Description,
				Currency = payment.Currency,
				Amount = payment.Amount
			};

			var createdPayment = await _chargeService.CreateAsync(paymentOptions, null, ct);

			return new StripePayment(
			  createdPayment.CustomerId,
			  createdPayment.ReceiptEmail,
			  createdPayment.Description,
			  createdPayment.Currency,
			  createdPayment.Amount,
			  createdPayment.Id);
		}



		public string CreateCheckoutSession([FromBody] List<CreateCheckoutSessionStripeRequest> request)
		{
			var domain = "https://demeter-beta.vercel.app/";

			var lineItems = new List<SessionLineItemOptions>();

			foreach (var item in request)
			{
				var lineItem = new SessionLineItemOptions
				{
					Quantity = item.Quantity,
					PriceData = new SessionLineItemPriceDataOptions
					{
						Currency = "usd",
						ProductData = new SessionLineItemPriceDataProductDataOptions
						{
							Name = item.ProductName
							
						},
						UnitAmount = item.Price
					}
				};
				lineItems.Add(lineItem);
			}


			var options = new SessionCreateOptions
			{
				LineItems = lineItems,
				Mode = "payment",
				SuccessUrl = domain + "/payment-success",
				CancelUrl = domain + "/payment-cancel",
			};
			var service = new SessionService();
			Session session = service.Create(options);
			return session.Url;
		}
}