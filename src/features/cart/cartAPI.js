export function addToCart(item) {
  return new Promise(async (resolve) =>{
    console.log("cart");
    debugger
    const response=await fetch("http://localhost:8080/cart",{  
      method:"POST",
      body:JSON.stringify(item),
      headers:{"content-type":"application/json"}
    });
    const data =await response.json();
    resolve({data})
    console.log(data);
  }
  );
}
export function updateCart(update) {
  return new Promise(async (resolve) =>{
    const response=await fetch("http://localhost:8080/cart/"+update.id,{  
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
export function deleteCart(itemId) {
  return new Promise(async (resolve) =>{
    const response=await fetch("http://localhost:8080/cart/"+itemId,{  
      method:"DELETE",
    });
    const data =await response.json();
    resolve({data:{id:itemId}})
  }
  );
}
export async function fetchItemByUserId(userId){
  const response=await fetch("http://localhost:8080/cart?user="+userId);
  const data =await response.json();
  return {data}
}


export  async function reseCart(id){
  return new Promise(async (resolve) =>{
   const response=await fetchItemByUserId(id);
   const items=response.data;
   console.log(items);
   if(items.length>0){
    console.log();
    for(let item of items){
      await deleteCart(item.id)
     }
    resolve({status:"success"})
   }
  })
}