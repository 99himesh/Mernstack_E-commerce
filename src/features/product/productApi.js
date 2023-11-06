export function fetchCount(amount = 1) {
  return new Promise(async(resolve) =>{
    const response=await fetch("http://localhost:3000");
    const result =await response.json();
    resolve()
  }
  );
}
