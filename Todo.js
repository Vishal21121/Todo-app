console.log("Hello")
let id;

//! Function which is used for getting the todos from database
async function get(id) {
  let res = await fetch(`http://localhost:5000/api/todo/get/${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  let data = await res.json()
  console.log(data)
  document.getElementById('cards').innerHTML = ''
  data.data.forEach(element => {
    document.getElementById('cards').innerHTML += `<div class="col">
      <div class="card shadow-sm">
        <div class="card-body">
          <h4>${element.title}</h4>
          <p class="card-text">${element.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <button type="button" class="btn btn-sm btn-outline-secondary" style="margin:5px">${element.label}</button>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-primary">Edit</button>
            <button type="button" class="btn btn-danger delete" onclick="deleteIt()">Delete</button>
            </div>
          </div>
        </div>
      </div>
      </div>`
  });
}

const deleteIt = async function () {
  setTimeout(() => {
    Array.from(document.getElementsByClassName('delete')).forEach((element) => {
      element.addEventListener('click', async () => {
        let val = element.parentElement.parentElement.parentElement.firstElementChild.innerText;
        console.log("Val is:", val)
        let response = await fetch(`http://localhost:5000/api/todo/delete/${id}`, {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "title": val
          })
        })
        console.log(await response.json())
        get(id)
      })
    })
  },2000)
}

//! Function which is used for checking whether the user has logged in and after that he is opening this website
window.addEventListener('load', async () => {
  if (!localStorage.getItem('id')) {
    location.href = `${location.origin}/signup.html`
  }
  id = localStorage.getItem('id');
  get(id)
  deleteIt()
})

//! Signout button listening
document.getElementById('signOut').addEventListener('click', (e) => {
  e.preventDefault();
  location.href = `${location.origin}/signup.html`
  localStorage.clear()
})

//! create todo malipulation
document.getElementById('title').addEventListener('click', () => {
  //! toggling the visibilty of the description and label 
  document.getElementById('visibilitychange').classList.toggle('invisible')
  let title, description, label;

  //! listening the title textspace
  document.getElementById('title').addEventListener('input', (e) => {
    title = e.target.value;
  })

  //! listening the description textspace
  document.getElementById('description').addEventListener('input', (e) => {
    description = e.target.value;
  })

  //! listening the label textspace
  document.getElementById('label').addEventListener('input', (e) => {
    label = e.target.value;
    console.log(label)

  })

  //! listening the submit button
  document.getElementById('submit').addEventListener("click", async () => {
    let res = await fetch(`http://localhost:5000/api/todo/add/${id}`, {
      method: "POST",
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
        label: label
      })
    })
    let val = await res.json();
    console.log(val)
    if (val.statusCode == 404) {
      console.log(val.msg)
      document.getElementById('container').innerHTML = `<div class="alert alert-primary mt-4" role="alert">
      <strong>Warning </strong>${val.msg}
    </div>`
      setTimeout(() => {
        document.getElementById('container').innerHTML = ``
      }, 8000)
    }
    else if (val.statusCode == 401) {
      console.log(val.msg)
      document.getElementById('container').innerHTML = `<div class="alert alert-primary mt-4" role="alert">
      <strong>Warning </strong>${val.msg}
    </div>`
      setTimeout(() => {
        document.getElementById('container').innerHTML = ``
      }, 3000)
    }
    else {
      get(id)
      deleteIt()
    }

    //! setting the value of the title description and label value to blank
    document.getElementById('title').value = ''
    document.getElementById('description').value = ''
    document.getElementById('label').value = ''

    //! setting the createnode to invisible
    document.getElementById('visibilitychange').classList.add('invisible')
  })
})
