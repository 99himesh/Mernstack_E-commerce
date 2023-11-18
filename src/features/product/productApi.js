
export async function fetchAllProducts(){
  const response=await fetch("http://localhost:8080/products");
  const data =await response.json();
  return {data}
}

export async function fetchProdductbyId(id){
  const response=await fetch("http://localhost:8080/products/"+id);
  const data =await response.json();
  return {data}
}
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
 
 