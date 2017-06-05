package kr.or.connect.todo.service;

import kr.or.connect.todo.persistence.TodoDao;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.or.connect.todo.domain.Todo;

@Service
public class TodoService {
	
	private TodoDao dao;
	//List<Todo> todos = null;

	public TodoService(TodoDao dao) {
		this.dao = dao;
	}

	// todo 삽입
	public Todo insert(Todo Todo) {
		Integer id = dao.insert(Todo);
		Todo.setId(id);
		return Todo;
	}

	// 할 일 리스트 - all
	public List<Todo> getAll() {
		return dao.getAllTodo();
	}

	// 할 일 리스트 필터링 - 완료못한 것
	public List<Todo> getActive() {
		return dao.getActive();
	}

	// 할 일 리스트 필터링 - 완료한 것
	public List<Todo> getCompleted() {
		return dao.getCompleted();
	}

	// 할 일 완료하기 - id값의 todo, 완료 or 비완료 상태변화
	public boolean update(Todo todo) {
		dao.update(todo);
		return todo.isCompleted();
	}

	// 할 일 삭제하기 - id값의 todo 삭제
	public boolean deleteById(Integer id) {
		dao.deleteById(id);
		return (dao.deleteById(id) == 1);
	}

	// 완료된 일 삭제
	public boolean deleteByCompleted() {
		dao.deleteByCompleted();
		return (dao.deleteByCompleted() == 1);
	}

	// 할 일 전체 갯수
	public Integer count() {
		return dao.count();
	}

}
