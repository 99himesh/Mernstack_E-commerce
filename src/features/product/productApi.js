
export async function fetchAllProducts(){
  const response=await fetch("http://localhost:8080/products");
  const data =await response.json();
  return {data}
}
export function createProduct(product) {
  return new Promise(async(resolve) =>{
    const response=await fetch("http://localhost:8080/products",{  
      method:"POST",body:JSON.stringify(product),headers:{"content-type":"application/json"}
    });
    const data =await response.json();
    resolve({data})
    console.log(data);
  }
  );
}
export async function fetchProdductbyId(id){
  return new Promise(async (resolve) =>{
  console.log("data  form");
  const response=await fetch("http://localhost:8080/products/"+id);
  const data =await response.json();
  resolve( {data})
  
})}
export async function fetchAllProductsByFilter(filter,sort,pagination){
  let queryString = '';   
  for (let key in filter) {
    let categariesValue=filter[key] 
    if(categariesValue.length>0){
    let lastCategaryValue=categariesValue[categariesValue.length-1]
      queryString +=`${key}=${lastCategaryValue}&`     
    } 
  }
  for (let key in sort){
    queryString +=`${key}=${sort[key]}&`
  }
  for (let key in pagination){
    queryString +=`${key}=${pagination[key]}&`
  }
  const response=await fetch("http://localhost:8080/products?"+queryString);
  const data =await response.json();
  return {data}
}
 

export function updateProduct(update) {
  return new Promise(async (resolve) =>{
    const response=await fetch("http://localhost:8080/products/"+update.id,{  
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{"content-type":"application/json"}
    });
    const data =await response.json();
    resolve({data})
    console.log(data);
  }
  );
}
 