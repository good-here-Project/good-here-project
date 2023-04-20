package bitcamp.goodhere.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.goodhere.dao.BoardLikeDao;
import bitcamp.goodhere.service.BoardLikeService;
import bitcamp.goodhere.vo.BoardLike;

@Service
public class DefaultBoardLikeService implements BoardLikeService {
  @Autowired private BoardLikeDao boardLikeDao;

  @Override
  public void add(BoardLike boardLike) {
    BoardLike result = boardLikeDao.selectByBoardAndMember(boardLike);
    if (result == null) {
      boardLikeDao.insert(boardLike);
      boardLikeDao.update(boardLike);
    } else {
      boardLikeDao.update(boardLike);
    }
  }

  @Override
  public void delete(BoardLike boardLike) {
    boardLikeDao.delete(boardLike);
    boardLikeDao.update(boardLike);
    if (boardLikeDao.selectCountByBoardNo(boardLike.getBoardNo()) == 0) {
      boardLikeDao.updateLikesToZero(boardLike.getBoardNo());
    }
  }

  @Override
  public void deleteOfBoardNo(int boardNo) {
    boardLikeDao.deleteOfBoardNo(boardNo);
  }


  @Override
  public boolean isExist(BoardLike boardLike) {
    BoardLike result = boardLikeDao.selectByBoardAndMember(boardLike);
    return result != null;
  }

  @Override
  public int getCountByBoardNo(int boardNo) {
    return boardLikeDao.selectCountByBoardNo(boardNo);
  }

  @Override
  public int getCountByBoardNoAndMemberNo(int boardNo, int memberNo) {
    return boardLikeDao.selectCountByBoardNoAndMemberNo(boardNo, memberNo);
  }
}
