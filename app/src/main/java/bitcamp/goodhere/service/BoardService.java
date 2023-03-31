package bitcamp.goodhere.service;

import java.util.List;
import bitcamp.goodhere.vo.Board;
import bitcamp.goodhere.vo.BoardFile;

public interface BoardService {
  void add(Board board);
  List<Board> list(String keyword);
  Board get(int no);
  void update(Board board);
  void delete(int no);

  BoardFile getFile(int fileNo);
  void deleteFile(int fileNo);
}





