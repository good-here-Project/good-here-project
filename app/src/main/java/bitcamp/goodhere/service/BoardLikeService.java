package bitcamp.goodhere.service;

import bitcamp.goodhere.vo.BoardLike;

public interface BoardLikeService {
  void add(BoardLike boardLike);
  void delete(BoardLike boardLike);
  void deleteOfBoardNo(int boardNo);
  boolean isExist(BoardLike boardLike);
  int getCountByBoardNo(int boardNo);
  int getCountByBoardNoAndMemberNo(int boardNo, int memberNo);
}
