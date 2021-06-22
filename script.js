let library;
if(!localStorage.getItem('library')){
	library = [];
	localStorage.setItem('library', JSON.stringify(library));
}else{
	library = JSON.parse(localStorage.getItem("library"));
}

document.addEventListener("DOMContentLoaded", getBooks());

const addBook = document.getElementById("addBook");
const bookForm = document.getElementById("bookForm");
const submit = document.getElementById("submit");
const showAllBooks = document.getElementById("showAllBooks");
const input = document.getElementsByTagName("input");
const closeBtn = document.getElementById('close');


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
	if(bookName!='' && authorName!='' && pages!='' && readVal!=''){
		addBooktoLibrary(bookName, authorName, pages, readVal);
		showBooks();
		location.reload();
	} else {
		alert("Please fill in all details.")
	}
	
});

/*function Book(title, author, noOfPages, read){
	this.title = title;
	this.author = author;
	this.noOfPages = noOfPages;
	this.read = read;
}*/

class Book{
	constructor(title, author, noOfPages, read){
		this.title = title;
		this.author = author;
		this.noOfPages = noOfPages;
		this.read = read;
	}

	change(){
		if(this.read == "Read"){
			this.read = "Not Read";
		}else if(this.read == "Not Read"){
			this.read = "Read";
		}
	}
}

/*Book.prototype.change = function(){
	if(this.read == "Read"){
		this.read = "Not Read";
	}else if(this.read == "Not Read"){
		this.read = "Read";
	}
}*/

function addBooktoLibrary(title, author, noOfPages, read){
	let book = new Book(title, author, noOfPages, read);
	let val = checkBooks(book);
	if(val == 0){
		library.push(JSON.stringify({title, author, noOfPages, read}));
		localStorage.setItem('library',JSON.stringify(library));
	} else {
		alert("Book already exists");
	}
}

function checkBooks(book){
	let flag = 0;
	for(let bk of library){
		bk=JSON.parse(bk);
		if(bk.title == book.title){
			flag=1;
			break;
		}
	}
	return flag;
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
		let c = document.createElement('button');
		r.setAttribute('id', 'readStatus'+i);
		b.textContent = "Delete";
		c.textContent = "Change Read Status"
		//b.setAttribute('id', 'deleteButton');
		b.classList.add("deleteButton");
		b.setAttribute('id',i);
		c.classList.add("changeButton");
		c.setAttribute('id',i);
		t.textContent = books[i].title;
		a.textContent = books[i].author;
		n.textContent = books[i].noOfPages;
		r.textContent = books[i].read;
		if(r.textContent == "Not Read"){
			bookDiv.style.backgroundColor = 'rgb(100, 8, 0)';
		} else if (r.textContent == "Read"){
			bookDiv.style.backgroundColor = 'rgb(8, 100, 0)';
		}
		bookDiv.appendChild(t);
		bookDiv.appendChild(a);
		bookDiv.appendChild(n);
		bookDiv.appendChild(r);
		bookDiv.appendChild(b);
		bookDiv.appendChild(c);
		showAllBooks.appendChild(bookDiv);
	}
	addDeleteToButton();
	addChangeToButton();
}


function deleteBook(e){
	let bookId = e.target.id;
	console.log(e.target.id);
	const answer = confirm("Do you really want to delete?");
	if(answer == true){
		let library1 = JSON.parse(localStorage.getItem('library'));
		library1.splice(bookId, 1);
		localStorage.setItem('library', JSON.stringify(library1));
		location.reload();
	}
	
}

function addDeleteToButton(){
	let deleteButton = document.getElementsByClassName("deleteButton");
	let buttons = Array.from(deleteButton);
	//let c = [...deleteButton];
	buttons.map(x => x.addEventListener('click', deleteBook));
}



function addChangeToButton(){
	let changeButton = document.getElementsByClassName("changeButton");
	let buttons = Array.from(changeButton);
	//let c = [...deleteButton];
	buttons.map(x => x.addEventListener('click', changeReadStatus));
}


function changeReadStatus(e){
	let library1 = JSON.parse(localStorage.getItem('library'));
	let bookId = e.target.id;
	library1 = library1.map(x => JSON.parse(x));
	let book = library1[bookId];
	newBook = new Book(book.title, book.author, book.noOfPages, book.read);
	newBook.change();
	let statusId = 'readStatus'+bookId;
	let readStatus = document.getElementById(statusId);
	readStatus.textContent = newBook.read;
	library1[bookId].read = newBook.read;
	library1 = library1.map(x => JSON.stringify(x));
	localStorage.setItem('library', JSON.stringify(library1));
	location.reload();
}


closeBtn.addEventListener('click', () => {
	bookForm.style.display = 'none';
})

