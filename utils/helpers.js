export const plural = (quantity, text) => {
  let formattedText = `${quantity} ${text}`
  if(quantity > 1) formattedText += 's'
  return formattedText
}
