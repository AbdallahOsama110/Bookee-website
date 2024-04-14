//!=============================(Get Home Books List Section)===========================================================================================

$.getJSON("https://www.googleapis.com/books/v1/volumes?q=api", function (data) {
    var books = data['items'];
    $.each(books, function (key, val) {
        var bookName = val.volumeInfo.title;
        var bookUrl = val.volumeInfo.imageLinks.thumbnail;
        var bookDescription = val.volumeInfo.description;
        bookDescription = bookDescription.replace(/['"]/g, '');
        var previewLink = val.volumeInfo.previewLink;

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
//!====================================(Search Section)=======================================================================================================

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
var element = document.getElementById('showResults');
element.style.display = 'none';

function bookSearch() {
    searchResults.innerHTML = '';
    const userInput = searchInput.value;
    if (searchInput.value == null || searchInput.value == '') {
        element.style.display = 'none';
    } else {
        $.getJSON(`https://www.googleapis.com/books/v1/volumes?Filtering=free-ebooks&Sorting=relevance&q=${userInput}`, function (data) {
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

                $('.searchResults').append(`
                    <div id="searchBookItem"  onclick='showDialog("${bookName}","${bookDescription}","${bookUrl}","${previewLink}")'>
                        <img src="${bookUrl}" alt="">
                        <h4>${bookName}</h4>
                    </div>
        `);
            });
        });
        element.style.display = 'block';
    }
}

//!===================================(Category Section)=======================================================================================================

const categoryItemList = [
    {
        categoryName: 'Electronics',
        categoryPath: 'category_page.html?categoryName=Electronics',
        categoryImage: '../assets/images/category/Electronics.jpg'
    },
    {
        categoryName: 'Artificial Intelligence',
        categoryPath: 'category_page.html?categoryName=Artificial Intelligence',
        categoryImage: '../assets/images/category/AI.jpg'
    },
    {
        categoryName: 'Stories',
        categoryPath: 'category_page.html?categoryName=Stories',
        categoryImage: '../assets/images/category/stories.jpg'
    },{
        categoryName: 'Science',
        categoryPath: 'category_page.html?categoryName=Science',
        categoryImage: '../assets/images/category/Science.jpg'
    },{
        categoryName: 'Sports',
        categoryPath: 'category_page.html?categoryName=Sports',
        categoryImage: '../assets/images/category/sports.jpg'
    },
];

let categoryItem;

for (let item in categoryItemList) {
    categoryItem = categoryItemList[item];

    $('.categoryListContainer').append(`
        <a style="
        width: 20%;
        height:20%;
        flex: 0 0 auto;
        border-radius: 20px;
        background-image: url('${categoryItem.categoryImage}');
        background-repeat: no-repeat;
        background-position: 50% 0px;
        background-size: cover;
        color: #f5f5f5;" 
        href="${categoryItem.categoryPath}">
            <div class="categoryName">${categoryItem.categoryName}</div>
        </a>
    `);

}