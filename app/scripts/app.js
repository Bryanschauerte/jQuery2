$(document).ready(function(){
  $('#newTaskForm').hide();

  var listo = [];
  var done = [];




  var Task = function(task){
    this.task = task;
    this.id ='new;'

  }

  var addTask = function(task){

    if(task){
      task = new Task(task);
      listo.push(task);
      $('newItemInput').val('');
      $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
  }
    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  };

var advanceTask = function(task){
  var taskToChange = task.text.trim;
  for(var i =0; i < listo.length; i++){

    switch (listo[i].id) {

      case "new":
      listo[i].id = "inProgress";
      break;
      case "inProgress":
      listo[i].id = "archived";
      break;
      default:
      done.push(listo[i]);
      listo.splice(i, 1);

    };

  }

$(task).remove();
};


//checked
  $('#saveNewItem').on('click', function (e) {
      e.preventDefault();
      var task = $('#newItemInput').val().trim();
      addTask(task);
  });

  //Opens form, checked
  $('#newListItem').on('click', function () {
    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');

  });

//closes form checked
  $('#cancel').on('click', function (e) {
    e.preventDefault();
    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  });

//removes default props of the dom as we call it to let it know that certain elements are there
  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task =$(this);
    advanceTask(task);
    this.id = 'inProgress';
    console.log(this.id);
  //moving the actual html tags require pullling on the actual outerHTML
    $('#currentList').append(this.outerHTML);

  });

  $(document).on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
});

  $(document).on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });


})
