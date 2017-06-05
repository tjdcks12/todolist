package kr.or.connect.todo.persistence;

public class TodoSqls {
	// 할 일 리스트 - all
	static final String SELECT_ALL = "SELECT * FROM todo ORDER BY date DESC";
	// 할 일 리스트 필터링 - 완료못한 것
	static final String SELECT_ACTIVE = "SELECT * FROM todo WHERE completed = 0 ORDER BY date DESC";
	// 할 일 리스트 필터링 - 완료한 것
	static final String SELECT_COMPLETED = "SELECT * FROM todo WHERE completed = 1 ORDER BY date DESC";
	// 할 일 완료하기 - id값의 todo, 완료 or 비완료 상태변화
	static final String UPDATE_TODO = "UPDATE todo SET completed=:completed where id=:id";
	// 할 일 삭제하기 - id값의 todo 삭제
	static final String DELETE_BY_ID = "DELETE FROM todo WHERE id= :id";
	// 완료한 일 삭제
	static final String DELETE_COMPLETED = "DELETE FROM todo WHERE completed = 1";
	// 할 일 전체 갯수
	static final String SELECT_COUNT_ACTIVE = "SELECT COUNT(*) FROM todo WHERE COMPLETED = 0";

}
