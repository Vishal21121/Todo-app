// console.log("Hello")
let name,email,password;
console.log(document.getElementById('email'))

document.getElementById('name').addEventListener('input',(e)=>{
    name = e.target.value;
    console.log(name)
    
})

document.getElementById('email').addEventListener('input',(e)=>{
    email = e.target.value;
    // console.log(val)
    
})

document.getElementById('password').addEventListener('input',(e)=>{
    password = e.target.value;
    // console.log(val)
    
})

document.getElementById('signup').addEventListener('click',async(e)=>{
    e.preventDefault();
    let res = await fetch('http://localhost:5000/api/auth/createuser',{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:name,
            email:email,
            password:password
        })
    })
    let data = await res.json();
    console.log(data.data)
    
    if(data.statusCode===201){
        localStorage.setItem('id',data.data)
        location.href = `${location.origin}/Todo.html`
    }else{
        document.getElementById('alert').innerHTML = `<div class="alert alert-warning alert-dismissible fade show mt-4" role="alert" id='alertD'>
        <strong>Warning!</strong> A user with this email already exits
      </div>`
      setTimeout(()=>{
        document.getElementById('alert').innerHTML = ''
      },5000)
    }
    
})

document.getElementById('signin').addEventListener('click',(e)=>{
    e.preventDefault();
    location.href = `${location.origin}/signin.html`
})

