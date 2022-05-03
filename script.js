'use strict';

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


function addBookToLibrary(title, author, pages, read) {
    const card = new Book(title, author, pages, read);
    myLibrary.push(card);  
}

const container = document.querySelector('.container');


function displayLibrary() {
    myLibrary.forEach(element => {
        //create card
        const card = document.createElement('div');
        card.classList.add('card');
        container.appendChild(card);

        //add title to card
        const title = document.createElement('p');
        title.classList.add('title');
        card.appendChild(title);
        title.textContent = `"${element.title}"`;

        //add author to card
        const author = document.createElement('p');
        author.classList.add('author'); 
        card.appendChild(author);
        author.textContent = `By ${element.author}`;

        //add pages to card
        const pages = document.createElement('p');
        pages.classList.add('pages');
        card.appendChild(pages);
        pages.textContent = `${element.pages} pages`;

        //add toggle 
        const readLabel = document.createElement('label');
        readLabel.setAttribute('for', `read${myLibrary.indexOf(element)}`);
        readLabel.classList.add('read-label')
        if(element.read) {
            readLabel.textContent = 'Read';
        } else {
            readLabel.textContent = 'Not read'
        }
        card.appendChild(readLabel);
        const read = document.createElement('input');
        read.setAttribute('id', `read${myLibrary.indexOf(element)}`);
        read.setAttribute('type', 'checkbox');
        card.appendChild(read); 
        if(element.read) {
            read.checked = true;
            readLabel.style.backgroundColor = '#9fff9c';
        } else {
            read.checked = false;
            readLabel.style.backgroundColor = '#ff9c9c';
        }

        // add remove button
        const remove = document.createElement('button');
        remove.classList.add('remove');
        remove.textContent = 'Remove';
        card.appendChild(remove);
        remove.addEventListener('click', () => {
            card.remove();
            myLibrary.splice(myLibrary.indexOf(element), 1)
        });
        //toggle functional
        readLabel.addEventListener('click', () => {
            if(read.checked){
                readLabel.textContent = 'Not read';
                readLabel.style.backgroundColor = '#ff9c9c';
                element.read = false;
            } else {
                readLabel.textContent = 'Read';
                readLabel.style.backgroundColor = '#9fff9c';
                element.read = true;
            }
        });
    });
}

displayLibrary();


//'add book' button functional(opens modal)
const modal = document.querySelector('.modal');
const addBook = document.querySelector('.add');
addBook.addEventListener("click", () => {
    modal.style.display = 'block';
});


// close modal when clicking outside of modal content
window.addEventListener('click', (e) => {
    if(e.target == modal) {
        console.log(e.target);
        modal.style.display = 'none';
    }
});

const submit =  document.querySelector('.submit');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

submit.addEventListener('click', (e) => {
    if(title.value == '' || author.value == '' || pages.value == '' ) {
        return;
    }
    modal.style.display = 'none';
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    e.preventDefault();
    //clear cards from display
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.remove();
    });

    displayLibrary();
    title.value = '';
    author.value = '';
    pages.value = '';
});





