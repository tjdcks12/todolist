(function (window) {
	'use strict';
	// Your starting point. Enjoy the ride!
	count();  // 현재 수행하지 않은 todo 갯수
	loadTodo();  // todo데이터 받아옴

	//엔터 키 이벤트
	$(".new-todo").keypress(function(event) {
	        if (event.keyCode == 13) {
	            var todo = $(this).val();
							var now = new Date();
	            if (todo == "") {
	                alert("내용을 입력하세요.");
	            } else {
	                $.ajax({
	                    url: "/api/todos",
	                    dataType: "json",
	                    contentType: "application/json; charset=UTF-8",
	                    type: 'POST',
	                    data: JSON.stringify({ "todo": todo , "date": now }),
	                    success: function(result) {
												//selected 클래스 제거
	                        $('.filters').children().children().removeClass()
	                        $('#filter_all').attr('class', 'selected');
													count();
													loadTodo();
	                        $('.todo-list').prepend("<li id='" + result.id + "'>" + '<div class="view">' + '<input class="toggle" type="checkbox">' + '<label>' + todo + '</label>' + '<button class="destroy"></button>' + '</div>' + '</li>');

	                    }
	                }).error(function() {
	                    alert('insert error!');
	                });
	                $('.new-todo').val("");
	            }
	        }
	    });

			//필터링 All
			$("#filter_all").on('click', function(){
				//hash 출력 제거
				event.preventDefault()
        filter(0);
    });

    //필터링 Active
    $("#filter_active").on('click', function(){
			event.preventDefault()
        filter(1);
    });

    //필터링 completed
    $("#filter_completed").on('click', function(){
			event.preventDefault()
        filter(2);
    });

		//Clear completed
		$(".clear-completed").on('click', function(){
			$.ajax({
             url: "/api/todos",
             type: "DELETE",
             success: function(result) {
                $('.filters').children().children().removeClass()
                $('#filter_all').attr('class', 'selected');
								count();
							 loadTodo();

             }
         }).error(function() {
             alert('deleteByCompleted error!');
         });
     });


		 //체크박스 클릭 이벤트
			$(document).on('click', '.toggle', function() {
         var li = $(this).closest('li');
         var li_num = li.attr('id');
				 //check되있는지 bool변수
         var checked = $(this).prop("checked");
         var current = $('.filters').children().children().attr('id')
         var filterNum;

        if(current==="filter_all"){
            filterNum=0;
         }else if(currentTap=="filter_active"){
             filterNum=1;
         }else{
             filterNum=2;
         }

        if (checked) {
            $.ajax({
                url: "/api/todos/" + li_num,
                 dataType: "json",
                 contentType: "application/json; charset=UTF-8",
                 type: "PUT",
                 data: JSON.stringify({ "completed": 1 }),
                 success: function(result) {
                     li.attr('class', 'completed');
                     filter(filterNum);
                     count();
                 }
             }).error(function() {
                 alert('update error!');
             });
         } else {
             $.ajax({
                 url: "/api/todos/" + li_num,
                 dataType: "json",
                 contentType: "application/json; charset=UTF-8",
                 type: "PUT",
                 data: JSON.stringify({ "completed": 0 }),
                 success: function(result) {
                     li.removeClass();
                     filter(filterNum); //탭 구분
                     count();
                 }
             }).error(function() {
                 alert('update error!');
             });
         }
     })


})(window);


//filter 값에따라 출력변경
function filter(num){

	//filter_all 클릭시
	if(num == 0){
		//selected 전부 지운후 해당되는것 select
		$('.filters').children().children().removeClass();
		$('#filter_all').attr('class', 'selected');
		loadTodo();
	}
	//filter_active 클릭시
	else if(num == 1){
		$('.filters').children().children().removeClass();
		$('#filter_active').attr('class', 'selected');
		$.ajax({
            url: '/api/todos/active',
            type: 'GET',
            dataType: 'json',
            success: function(result) {
                $(".todo-list").empty();
                var todos = [];
                $.each(result, function(i) {
                    todos.push("<li id=" + result[i].id + ">" + "<div class='view'><input class='toggle' type='checkbox'>\
                               <label>" + result[i].todo + "</label><button class='destroy'></button></div></li>");

                });
                for (var i = 0; i < result.length; i++) {
                    $('.todo-list').append(todos[i]);
                }
            }
        }).error(function() {
            alert('select error!');
        });
	}
	//filter_completed 클릭시
	else{
		$('.filters').children().children().removeClass();
		$('#filter_completed').attr('class', 'selected');
		$.ajax({
            url: '/api/todos/completed',
            type: 'GET',
            dataType: 'json',
            success: function(result) {
                $(".todo-list").empty();
                var todos = [];
                $.each(result, function(i) {
                    todos.push("<li id=" + result[i].id +" class ='completed'>" + "<div class='view'><input class='toggle' type='checkbox' checked>\
                               <label>" + result[i].todo + "</label><button class='destroy'></button></div></li>");

                });
                for (var i = 0; i < result.length; i++) {
                    $('.todo-list').append(todos[i]);
                }
            }
        }).error(function() {
            alert('select error!');
        });
	}

}


function loadTodo() {
		 $(document).ready(function() {
				$.ajax({
						url: '/api/todos',
						type: 'GET',
						dataType: 'json',
						success: function(result) {
								$(".todo-list").empty();
								var todos = [];
								// console.log(result);
								$.each(result, function(i) {
										var checked = '';
										var className = '';
										if (result[i].completed == 1) {
												className = 'class = completed';
												checked = 'checked';
										}
										todos.push("<li " + className + " id=" + result[i].id + ">" + "<div class='view'><input class='toggle' type='checkbox'" + checked + ">\
															 <label>" + result[i].todo + "</label><button class='destroy'></button></div></li>");

								});

								for (var i = 0; i < result.length; i++) {
										$('.todo-list').append(todos[i]);
								}
						}
				}).error(function() {
						alert('loadTodo가 에럽니다');
				});
		});
}

function count() {
     $.ajax({
         url: '/api/todos/count',
         type: "GET",
         success: function(result) {
             $('.todo-count strong').text(result);
         }
     }).error(function() {
         alert('ajax request fail');
     });
 }
