package bitcamp.goodhere.dao;

import org.apache.ibatis.annotations.Mapper;
import bitcamp.goodhere.vo.BoardLike;

@Mapper
public interface BoardLikeDao {
  void insert(BoardLike boardLike);
  void delete(BoardLike boardLike);
  int checkState(BoardLike boardlike);
  int likeCnt(int boardNo);
  int countLikerAll(int member);
}
