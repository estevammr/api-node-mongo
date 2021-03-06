// Array de usuários
var userListData = [];

//DOM
$(document).ready(function() {

  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
  $('#btnAddUser').on('click', addUser);
  $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
  $('#userList table tbody').on('click', 'td a.linkupdateuser', changeUserInfo);
  $('#btnCancelUpdateUser').on('click', togglePanels);
  $('#updateUser form div div input').on('change', function(){$(this).addClass('updated')});
  $('#btnUpdateUser').on('click', updateUser);
  populateTable();
});

// GET tabela de usuários
function populateTable() {
  var tableContent = '';

  // jQuery AJAX
  $.getJSON( '/users/userlist', function( data ) {
    userListData = data;

    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Exibir detalhes">' + this.username + '</a></td>';
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser btn-floating teal darken-3" rel="' + this._id + '"><i class="material-icons">delete</i></a></td>';
      tableContent += '<td><a href="#" class="linkupdateuser btn-floating teal darken-3" rel="' + this._id + '"><i class="material-icons">mode_edit</i></a></td>';
      tableContent += '</tr>';
    });

    $('#userList table tbody').html(tableContent);
  });
};

// Mostrar informações de usuários
function showUserInfo(event) {

  event.preventDefault();
  var thisUserName = $(this).attr('rel');
  var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);
  var thisUserObject = userListData[arrayPosition];

  //Popula os campos de info
  $('#userInfoName').text(thisUserObject.fullname);
  $('#userInfoAge').text(thisUserObject.age);
  $('#userInfoGender').text(thisUserObject.gender);
  $('#userInfoLocation').text(thisUserObject.location);

};

// POST dos usuários
function addUser(event) {
  event.preventDefault();

  //Validação básica para o usuário preencher algo nos campos
  var errorCount = 0;
  $('#addUser input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  if(errorCount === 0) {

    var newUser = {
      'username': $('#addUser input#inputUserName').val(),
      'email': $('#addUser input#inputUserEmail').val(),
      'fullname': $('#addUser input#inputUserFullname').val(),
      'age': $('#addUser input#inputUserAge').val(),
      'location': $('#addUser input#inputUserLocation').val(),
      'gender': $('#addUser input#inputUserGender').val()
    }

    // AJAX para realizar o POST
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function( response ) {

      if (response.msg === '') {

        // Limpa os campos depois de add
        $('#addUser input').val('');

        // Reload da tabela de usuários
        populateTable();
      }
      else {
        // Erro 
        alert('Error: ' + response.msg);
      }
    });
  }
  else {
    // Se o usuário não preenche os campos exibe a mensagem
    alert('Preencha os campos!');
    return false;
  }
};

function changeUserInfo(event) {
  //
  event.preventDefault();

  if($('#addUserPanel').is(":visible")){
    togglePanels();
  }

  var _id = $(this).attr('rel');
  var arrayPosition = userListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(_id);

  var thisUserObject = userListData[arrayPosition];

  $('#updateUserFullname').val(thisUserObject.fullname);
  $('#updateUserAge').val(thisUserObject.age);
  $('#updateUserGender').val(thisUserObject.gender);
  $('#updateUserLocation').val(thisUserObject.location);
  $('#updateUserName').val(thisUserObject.username);
  $('#updateUserEmail').val(thisUserObject.email);
  $('#updateUser').attr('rel',thisUserObject._id);
};

// PUT dos usuários
function updateUser(event){
  event.preventDefault();

  // Tela para confirmar a edição
  var confirmation = confirm('Deseja editar o usuário ?');
  
  if (confirmation === true) {

    var _id = $('#updateUser').attr('rel');

    //Criação da collection no Mongo para edição
    var fieldsToBeUpdated = $('#updateUser form div div .updated');
  
    var updatedFields = {};
      
    $(fieldsToBeUpdated).each(function(){
      var key = $(this).attr('field');
      var value = $(this).val();
      updatedFields[key]=value;
      
    });
    console.log(_id);
    // AJAX PUT
    $.ajax({
      type: 'PUT',
      url: '/users/updateuser/' + _id,
      data: updatedFields
    }).done(function( response ) {
      console.log(response);
      if (response.msg['error']) {
        alert('Error: ' + response.msg);
      } else {
        togglePanels();
      }
      // Reload da tabela
      populateTable();
    });
    
  }
  else {

    return false;
  }
};

// DELETE dos usuários
function deleteUser(event) {
  event.preventDefault();

  // Tela para confirmar a exclusão
  var confirmation = confirm('Deseja deletar o usuário ?');

  if (confirmation === true) {

    // AJAX DELETE
    $.ajax({
      type: 'DELETE',
      url: '/users/deleteuser/' + $(this).attr('rel')
    }).done(function( response ) {

      if (response.msg === '') {
      }
      else {
        alert('Error: ' + response.msg);
      }
      // Reload da tabela
      populateTable();
    });
  }
  else {

    return false;
  }
};

// Toggle dos painéis de add e editar usuários
function togglePanels(){
  $('#addUserPanel').toggle();
  $('#updateUserPanel').toggle();
};
