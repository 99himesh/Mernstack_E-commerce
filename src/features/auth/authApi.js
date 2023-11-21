// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async(resolve) =>{
    const response=await fetch("http://localhost:8080/users",{  
      method:"POST",body:JSON.stringify(userData),headers:{"content-type":"application/json"}
    });
    const data =await response.json();
    resolve({data})
    console.log(data);
  }
  );
}
export function cheackUser(loggedinInfo) {
  console.log(loggedinInfo); 
  return new Promise(async(resolve,reject) =>{
    const email=loggedinInfo.email;
    const password=loggedinInfo.password;
    const response=await fetch("http://localhost:8080/users?email="+email);
    const data =await response.json();
    if(data.length){
      if(password===data[0].password){
        resolve({data:data[0]})
        console.log(data);
      }else{
        reject({message:"wrong credenial"})
        console.log("wrong credential");
      }
    }else{
      reject({message:"user not found"})
    }
   
  }
  );
}
