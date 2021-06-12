document.addEventListener("DOMContentLoaded", getBooks());

let library;
if(!localStorage.getItem('library')){
	library = [];
	localStorage.setItem('library', JSON.stringify(library));
}else{
	library = JSON.parse(localStorage.getItem("library"));
}
const addBook = document.getElementById("addBook");
const bookForm = document.getElementById("bookForm");
const submit = document.getElementById("submit");
const showAllBooks = document.getElementById("showAllBooks");

addBook.addEventListener('click', () => {
	bookForm.style.display = 'block';
});

submit.addEventListener('click', ()=>{
	let bookName = document.getElementById("bookName").value;
	let authorName = document.getElementById("authorName").value;
	let pages = document.getElementById("pages").value;
	let ifRead = document.getElementById("ifRead"); 
	let ifNotRead = document.getElementById("ifNotRead");
	let readVal;
	if(ifRead.checked){
		readVal = ifRead.value;
	}else if(ifNotRead.checked){
		readVal = ifNotRead.value;
	}
	addBooktoLibrary(bookName, authorName, pages, readVal);
	bookForm.style.display = 'none';

	showBooks();
	location.reload();
});

function Book(title, author, noOfPages, read){
	this.title = title;
	this.author = author;
	this.noOfPages = noOfPages;
	this.read = read;
	return {title, author, noOfPages, read};
}

function addBooktoLibrary(title, author, noOfPages, read){
	let book = new Book(title, author, noOfPages, read);
	library.push(JSON.stringify(book));
	localStorage.setItem('library',JSON.stringify(library));
}

function getBooks(){
	let libArray = JSON.parse(localStorage.getItem('library'));
	libArray = libArray.map(x => JSON.parse(x));
	return libArray;
}

function showBooks(){
	let books = getBooks();
	for(let i=0;i<books.length;i++){
		let bookDiv = document.createElement('div');
		bookDiv.classList.add('book');
		bookDiv.setAttribute('id', i);
		let t = document.createElement('h2');
		let a = document.createElement('h3');
		let n = document.createElement('h4');
		let r = document.createElement('h4');
		let b = document.createElement('button');
		b.textContent = "Delete";
		//b.setAttribute('id', 'deleteButton');
		b.classList.add("deleteButton");
		b.setAttribute('id',i);
		t.textContent = books[i].title;
		a.textContent = books[i].author;
		n.textContent = books[i].noOfPages;
		r.textContent = books[i].read;
		bookDiv.appendChild(t);
		bookDiv.appendChild(a);
		bookDiv.appendChild(n);
		bookDiv.appendChild(r);
		bookDiv.appendChild(b);
		showAllBooks.appendChild(bookDiv);
	}
	addDeleteToButton();
}


function deleteBook(e){
	let bookId = e.target.id;
	console.log(e.target.id);
	alert("works fine");
	let library1 = JSON.parse(localStorage.getItem('library'));
	//library1 = library1.map(x => JSON.parse(x));
	//console.log(library1[bookId]);
	library1.splice(bookId, 1);
	//console.log(library1);
	//console.log(JSON.stringify(library1));
	//library1.push(JSON.stringify(book));
	localStorage.setItem('library', JSON.stringify(library1));
	location.reload();
}

function addDeleteToButton(){
	let deleteButton = document.getElementsByClassName("deleteButton");
	let buttons = Array.from(deleteButton);
	//let c = [...deleteButton];
	buttons.map(x => x.addEventListener('click', deleteBook));
}

