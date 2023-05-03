package bitcamp.goodhere.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.goodhere.vo.Question;

@Mapper
public interface QuestionDao {
  //  void insert(Board board);
  List<Question> findAll();
  List<Question> findmylist();
  //  List<Board> findListAll(String keyword);
  //  Board findByNo(int no);
  //  void increaseViewCount(int no);
  //  int update(Board b);
  //  int delete(int no);
void insert(Question question);
}























