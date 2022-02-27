
export const account_number = () => {
  // const code = Math.floor(100000000 + Math.random() * 9000);
  // return "3" +code;
  let result = "";
  const num = "1234567890";
  
  for ( let i = 0; i < 9; i++ ) {
    result += num.charAt(Math.floor(Math.random() * num.length));
  }
  // const code = Math.floor(100000 + Math.random() * 9000);
  return "3" + result;
}