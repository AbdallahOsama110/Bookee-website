// Get query parameters from the URL
const params = new URLSearchParams(window.location.search);
// Access individual parameters
const categoryName = params.get('categoryName');
console.log('category Name:', categoryName);
title.innerHTML = `${categoryName} Category`;
categoryHeader.innerHTML = categoryName;

$.getJSON(`https://www.googleapis.com/books/v1/volumes?Filtering=free-ebooks&Sorting=relevance&q=${categoryName}`, function (data) {
            var books = data['items'];
            console.log(books[0]);
            $.each(books, function (key, val) {
                var bookName;
                var bookUrl;
                var bookDescription;
                var previewLink = val.volumeInfo.previewLink;

                try{
                    bookDescription = val.volumeInfo.description;
                    bookDescription = bookDescription.replace(/['"]/g, '');
                }catch (error){
                    bookDescription = "Description is not available."
                }
                
                try {
                    bookName = val.volumeInfo.title;
                    bookName = bookName.replace(/['"]/g, '');
                } catch (error) {
                    bookName = "Invalid book";
                }

                try {
                    bookUrl = val.volumeInfo.imageLinks.thumbnail;
                } catch (error) {
                    console.log(`An error occurred: ${error.message}`);
                    bookUrl = "../assets/images/products/watch-3.jpg";
                }

                $('.bookCardContainer').append(
                    `
                    <div class="bookCard" onclick='showDialog("${bookName}","${bookDescription}","${bookUrl}","${previewLink}")'>
                        <img class="bookImage" src="${bookUrl}" alt="">
                        <div class="bookCardDetails">
                            <div class="bookName">
                                ${val.volumeInfo.title}
                            </div>
                            <div class="cardInfo">
                                <span>Free</span>
                                <div>
                                    <i class="material-icons">zoom_in_map</i>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                );
            });
        });


//!====================================(Dialog Section)=================================================================================

const dialog = document.getElementById("bookDialog");
function showDialog(name, description, imgUrl, previewLink) {
    bookName.innerHTML = name;
    bookDescription.innerHTML = description;
    document.getElementById("DiaogImage").src = imgUrl;
    document.getElementById("previewButton").href = previewLink;
    dialog.showModal();
}
function closeDialog() {
    dialog.close();

}