// console.log("Hello")
let email,password;
document.getElementById('email').addEventListener('input',(e)=>{
    email = e.target.value;
    // console.log(val)
    
})

document.getElementById('password').addEventListener('input',(e)=>{
    password = e.target.value;
    // console.log(val)
    
})

document.getElementById('signin').addEventListener('click',async(e)=>{
    e.preventDefault();
    let res = await fetch('http://localhost:5000/api/auth/login',{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    })
    let data = await res.json();
    if(data.statusCode===200){
        localStorage.setItem('id',data.data)
        location.href = `${location.origin}/Todo.html`
    }else{
        document.getElementById('alert').innerHTML = `<div class="alert alert-warning alert-dismissible fade show mt-4" role="alert" id='alertD'>
        <strong>Warning!</strong> Please enter correct credentials
      </div>`
      setTimeout(()=>{
        document.getElementById('alert').innerHTML = ''
      },5000)
    }
    
})

