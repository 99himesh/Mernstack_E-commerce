export function createOrder(order) {
  return new Promise(async (resolve) =>{
    debugger
    const response=await fetch("http://localhost:8080/orders",{  
      method:"POST",
      body:JSON.stringify(order),
      headers:{"content-type":"application/json"}
    });
    const data =await response.json();
    resolve({data})
  }
  );
}
export async function fetchAllOrder(pagination){
  let queryString = '';    
  for (let key in pagination){
    queryString +=`${key}=${pagination[key]}&`
  }
  const response=await fetch("http://localhost:8080/orders?"+queryString);
  const data =await response.json();
  return {data}
}

export function updateOrder(order) {
  return new Promise(async (resolve) =>{
    const response=await fetch("http://localhost:8080/orders/"+order.id,{  
      method:"PATCH",
      body:JSON.stringify(order),
      headers:{"content-type":"application/json"}
    });
    const data =await response.json();
    resolve({data})
    console.log(data);
  }
  );
}
