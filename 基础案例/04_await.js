//await不能单独使用,必须跟async一起出现
async function foo(){
    const p=new Promise((resolve,reject)=>{
        resolve(123)
    })
    const res=await p
    console.log(res);
}

foo()