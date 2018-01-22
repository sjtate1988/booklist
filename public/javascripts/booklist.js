// This file deals with ajax requests to create and delete books on the boot list.
$(document).ready(function(){
  // When we submit the form, we want to make a post request to our server in order to send the new details to the mongoDB database.
    $('#submitButton').on('click', function(){
        //This takes in the data from the form and saves it as variables.
        var title = $('#newTitle').val();
        var author = $('#newAuthor').val();
        var haveRead = $('#newHaveRead').val();
        var category = $('#newCategory').val();
        var bookCover = $('#newBookCover').val();
        // We create the variable book to hold all the data of the new book.
        var book = {
          title: title,
          author: author,
          category: category,
          haveRead: haveRead,
          bookCover: bookCover
        };
        // We make an ajax post request to send the data to the mongoDB database.
        $.ajax({
          type:     'POST',
          url:      '/books',
          data:     book,
          success:  function(data){
            location.reload();
          }
        });
        return false;
    });
    // Set up jquery to handle a delete request.
    $('.bookTitleDiv img').on('click', function(){
      var deleteTitle = $(this).attr('id').replace(/_/g,"-");
      $.ajax({
        type: 'DELETE',
        url: '/books/'+deleteTitle,
        success: function(data){
          location.reload();
        }
      });
      return false;
    });
});
