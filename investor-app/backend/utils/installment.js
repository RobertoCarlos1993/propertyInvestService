const installment = (price, interest, yr) => {
  const interest_month = interest / 100 / 12;
  const total_payments = yr * 12;

  const power = Math.pow(1 + interest_month, total_payments);
  const monthly_installment = (price * power * interest_month) / (power - 1);

  return monthly_installment;
};

module.exports = installment;
