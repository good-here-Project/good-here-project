package bitcamp.goodhere.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.goodhere.vo.BoardFile;

@Mapper
public interface BoardFileDao {
  int insert(BoardFile boardFile);
  int insertList(List<BoardFile> boardFiles);
  List<BoardFile> findAllOfBoard(int boardNo);
  BoardFile findByNo(int boardFileNo);
  int delete(int boardFileNo);
  int deleteOfBoard(int boardNo);
}























