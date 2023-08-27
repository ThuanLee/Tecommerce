const moneyFormat = (money) => {
  money = Math.round(money)
  if (money < 1000) return (<small>{money}</small>)
  money = money.toString()
  let formattedMoney = ""
  for (let i = money.length - 1; i >= 0; i--) {
    formattedMoney = money[i] + formattedMoney
    if ((money.length - i) % 3 === 0 && (i !== 0)) {
      formattedMoney = "." + formattedMoney
    }
  }
  return (
    <span>
      {formattedMoney.slice(0, formattedMoney.length-3)}
      {formattedMoney.slice(formattedMoney.length-3, formattedMoney.length)} VND
    </span>
  )
}

const shippingFee = (amount) => {
  const shippingFee = amount * 0.05
  if (shippingFee > 100000) {
    return 100000 
  } else if (shippingFee < 10000) {
    return 10000
  }
  return shippingFee
}

export { moneyFormat, shippingFee }