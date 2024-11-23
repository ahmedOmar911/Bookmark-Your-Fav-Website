document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();

    const siteName = document.getElementById('siteName').value;
    const siteURL = document.getElementById('siteURL').value;

    const bookmark = { name: siteName, url: siteURL };

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    document.getElementById('bookmarkForm').reset();

    displayBookmarks();
}

function displayBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmarksTableBody = document.querySelector('#bookmarksTable tbody');
    bookmarksTableBody.innerHTML = '';

    bookmarks.forEach((bookmark, index) => {
        const row = bookmarksTableBody.insertRow();

        const cellIndex = row.insertCell(0);
        cellIndex.textContent = index + 1;

        const cellName = row.insertCell(1);
        cellName.textContent = bookmark.name;

        const cellVisit = row.insertCell(2);
        const visitBtn = document.createElement('button');
        visitBtn.className = 'visit-btn';
        visitBtn.textContent = 'Visit';
        visitBtn.onclick = () => window.open(bookmark.url, '_blank');
        cellVisit.appendChild(visitBtn);

        const cellDelete = row.insertCell(3);
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteBookmark(index);
        cellDelete.appendChild(deleteBtn);
    });
}

function deleteBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
}

document.addEventListener('DOMContentLoaded', displayBookmarks);
