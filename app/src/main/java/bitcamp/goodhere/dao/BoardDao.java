package bitcamp.goodhere.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.goodhere.vo.Board;

@Mapper
public interface BoardDao {
  void insert(Board board);
  List<Board> findAll(String keyword);
  Board findByNo(int no);
  void increaseViewCount(int no);
  int update(Board b);
  int delete(int no);
}























