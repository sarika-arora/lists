$(document).ready(function() {

// Start: Item button's functionality

function appendToList(itemText) {
  var $item = $('<li><span class="item-value">' + itemText + '</span><i class="glyphicon glyphicon-pencil"></i><i class="glyphicon glyphicon-remove"></i></li>');
  $('.list').append($item);

  $item.find('.glyphicon-remove').on('click', function() {
    $(this).parent().remove();
  });

  $item.find('.glyphicon-pencil').on('click', function() {
    enableEditMode($(this).parent());
  });

}

//Getting the list
function getInitialList() {
    $.ajax({
    method: 'GET',
    url: 'http://localhost:8080/listitem',
    success: function(listItems){
      console.log('SUCCESS');
      listItems.forEach((item) => appendToList(item.description));
    }
  });
}

//Add items to the list

function addItemToList() {
  var itemText = $('#item-input').val();
  $.ajax({
    method: 'POST',
    url: 'http://localhost:8080/listitem',
    contentType: 'application/json',
    data: JSON.stringify({
      listId: 1,
      done: false,
      position: 0,
      description: itemText,
      color: 'f2e6e9'
    }),
    success: function(){
      console.log('SUCCESS');
      appendToList(itemText);
    }
  });
  $('#item-input').val('');
}

//Edit items in the list

function enableEditMode(element) {
  console.log(element);
  var currentText = $(element).find('.item-value').text();
  var html = $(element).html();
  //$(element).addClass('hide');
  $(element).html('<input type=text/>');
}

/*
function editListItem() {
  var itemText = $('#item-input').val();
  $.ajax({
    method: 'PUT',
    url: 'http://localhost:8080/listitem',
    contentType: 'application/json',
    data: JSON.stringify({
      listId: 1,
      done: false,
      position: 0,
      description: itemText,
      color: 'f2e6e9'
    }),
    success: function(){
      console.log('SUCCESS');
      editList(itemText);
    }
  });
  $('#item-input').val('');
}
*/

//Event Listeners

function bindEventListeners() {
  $('#item-form .btn').on('click', addItemToList);


  $('.btn').hover(function() {
    $(this).toggleClass('button-hover');
  });



}

getInitialList();
bindEventListeners();


});

/*
val item = {id: 5, listId: 1, description: 'Hello World'};
item.description = 'NEW DESCRIPTION';
*/
