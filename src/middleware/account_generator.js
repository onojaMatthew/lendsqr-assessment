
export const account_number = () => {
  
  let result = "";
  const num = "1234567890";
  
  for ( let i = 0; i < 9; i++ ) {
    result += num.charAt(Math.floor(Math.random() * num.length));
  }
  
  return "3" + result;
}