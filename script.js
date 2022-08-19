const addBookBtn = document.querySelector('#main-add-book');
const addModal = document.querySelector('#modal');
const modalBookBtn = document.querySelector('#add-book-btn');

const title = document.querySelector('input[name="title"]');
const author = document.querySelector('input[name="author"]');
const page = document.querySelector('input[name="pages"]');
const date = document.querySelector('input[name="date"]');

const bookContainer = document.querySelector('.container');


let books = []

function deleteBook(idx) {
    books.splice(idx, 1);
    refreshContent();
}

function updateReadStatus(idx){
    books[idx].read = true;
}

function refreshContent(){
    bookContainer.innerHTML = '';
    books.forEach((book, idx) => {
        let item = document.createElement('div');
        item.classList.add('book-item');
        item.setAttribute('data-id' , idx);
    
        item.innerHTML = `
                <h3 class="title">${book.title}</h3>
                <p>Author: <span class="author">${book.author}</span></p>
                <p>No. of Pages: <span class="pages">${book.pages}</span></p>
                <p>Date Added: <span class="date">${book.date}</span></p>
                <div class="tool">
                    <img class="read-status" src="./images/${book.read ? 'tick.png' : 'book.png'}">
                    <button  class="del-book"></button>
                </div>
        `

        bookContainer.appendChild(item);
    })

    const delBoolBtns = document.querySelectorAll('.del-book');
    const readBtns = document.querySelectorAll('.read-status');

    delBoolBtns.forEach(element => {
        element.addEventListener('click', (e) => {
            let idx = e.target.parentElement.parentElement.getAttribute('data-id')
            deleteBook(idx);
        })
    })

    readBtns.forEach(element => {
        element.addEventListener('click', (e) => {
            e.target.setAttribute('src', './images/tick.png');
            let idx = e.target.parentElement.parentElement.getAttribute('data-id')
            updateReadStatus(idx);
        })
    })
}

addBookBtn.addEventListener('click', (e)=>{
    addModal.style.display = "block";
})

modalBookBtn.addEventListener('click', (e) => {
    let t = title.value;
    let a = author.value;
    let p = page.value;
    let d = date.value;

    title.value = ''
    author.value = ''
    page.value = ''
    date.value = ''

    if(t && a && p && d){
        books.push({
            'title' : t, 'author' : a, 'pages' : p, 'date' : d, 'read' : false
        })
        addModal.style.display = "none";
        refreshContent();
    }
})



window.onclick = function(event) {
    if (event.target == addModal) {
        addModal.style.display = "none";
    }
  }

