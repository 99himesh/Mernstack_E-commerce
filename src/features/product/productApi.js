// export  function fetchAllProducts() {
//   return new Promise(async(resolve) =>{
//     const response=await fetch("http://localhost:8080/products");
//     const data =await response.json();
//     resolve({data})
//   }
//   );
// }
export async function fetchAllProducts(){
  const response=await fetch("http://localhost:8080/products");
  const data =await response.json();
  return {data}
}
export async function fetchAllProductsByFilter(filter){
  let queryString=""
   
  for(let key in filter){
    queryString=queryString+`${key}=${filter[key]}&`
  }
  const response=await fetch("http://localhost:8080/products?"+queryString);
  const data =await response.json();
  return {data}
}
 
 