
// library.js
function searchBooks() {
    const input = document.getElementById('search').value.toLowerCase();
    const books = document.getElementsByClassName('book');
    const selectedCategory = document.getElementById('category').value;
    
    Array.from(books).forEach(book => {
        const title = book.getAttribute('data-title').toLowerCase();
        const category = book.getAttribute('data-category');
        book.style.display = title.includes(input) && (selectedCategory === 'all' || selectedCategory === category) ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search').addEventListener('keyup', searchBooks);
    document.getElementById('category').addEventListener('change', searchBooks);
});