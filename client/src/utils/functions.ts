import { OrderCurrency } from '../state/orderState';

export const formatCurrency = (amount: number, currency: OrderCurrency) => {
    const {code, symbol} = currency;
    let transformedAmount = amount;

    switch (code) {
      case 'HNL':
        transformedAmount = amount * 24;
        break;
      case 'EUR':
        transformedAmount = amount * 1.07;
        break;
      default:
        break;
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: code,
        currencyDisplay: 'code',
        }).format(transformedAmount);
    return `${symbol}${formatter.substring(4)}`;
  };