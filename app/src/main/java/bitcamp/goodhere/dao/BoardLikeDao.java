package bitcamp.goodhere.dao;

import org.apache.ibatis.annotations.Mapper;
import bitcamp.goodhere.vo.BoardLike;

@Mapper
public interface BoardLikeDao {
  void insert(BoardLike boardLike);
  void update(BoardLike boardLike);
  void delete(BoardLike boardLike);
  BoardLike selectByBoardAndMember(BoardLike boardLike);
  int selectCountByBoardNo(int boardNo);
  int selectCountByBoardNoAndMemberNo(int boardNo, int memberNo);
  void updateLikesToZero(int boardNo);
  void deleteOfBoardNo(int boardNo);
}
