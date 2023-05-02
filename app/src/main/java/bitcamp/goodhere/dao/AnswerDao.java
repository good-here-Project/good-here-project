package bitcamp.goodhere.dao;

import org.apache.ibatis.annotations.Mapper;
import bitcamp.goodhere.vo.Answer;

@Mapper
public interface AnswerDao {
  void insert(Answer answer);
  //List<Question> findAll(String keyword);
  //  List<Board> findListAll(String keyword);
  //  Board findByNo(int no);
  //  void increaseViewCount(int no);
  //  int update(Board b);
  //  int delete(int no);
}























