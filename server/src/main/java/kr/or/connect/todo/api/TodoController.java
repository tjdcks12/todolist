package kr.or.connect.todo.api;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.service.TodoService;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
	private final TodoService service;
	private final Logger log = LoggerFactory.getLogger(TodoController.class);

	@Autowired
	public TodoController(TodoService service) {
		this.service = service;
	}

	// todo 삽입
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	Todo create(@RequestBody Todo todo) {

		return service.insert(todo);
	}

	// 할 일 리스트 - all
	@GetMapping
	List<Todo> readList() {
		return service.getAll();
	}

	// 할 일 리스트 필터링 - 완료못한 것
	@GetMapping("/active")
	List<Todo> readListActive() {
		return service.getActive();
	}

	// 할 일 리스트 필터링 - 완료한 것
	@GetMapping("/completed")
	List<Todo> readListCompleted() {
		return service.getCompleted();
	}

	// 할 일 완료하기 - id값의 todo, 완료 or 비완료 상태변화
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void update(@PathVariable Integer id, @RequestBody Todo todo) {
		todo.setId(id);
		service.update(todo);
	}

	// 할 일 삭제하기 - id값의 todo 삭제
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void delete(@PathVariable Integer id) {
		service.deleteById(id);
	}

	// 완료된 일 삭제
	@DeleteMapping
	void deleteByCompleted() {
		service.deleteByCompleted();
	}

	// 할일 갯수
	@GetMapping("/count")
	Integer countList() {
		return service.count();
	}
}
