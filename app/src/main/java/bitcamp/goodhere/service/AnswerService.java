package bitcamp.goodhere.service;

import java.util.List;
import bitcamp.goodhere.vo.Answer;

public interface AnswerService {
  void add(Answer answer);
  List<Answer> list();
  //  List<Board> boardlist(String keyword);
  //  Board get(int no);
  //  void update(Board board);
  //  void delete(int no);
  //
  //  BoardFile getFile(int fileNo);
  //  void deleteFile(int fileNo);
}