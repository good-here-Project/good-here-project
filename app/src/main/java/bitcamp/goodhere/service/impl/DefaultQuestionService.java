package bitcamp.goodhere.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.goodhere.dao.QuestionDao;
import bitcamp.goodhere.service.QuestionService;
import bitcamp.goodhere.vo.Question;

@Service
public class DefaultQuestionService implements QuestionService {

  @Autowired private QuestionDao questionDao;
  //  @Autowired private BoardFileDao boardFileDao;
  //  @Autowired private ReplyDao replyDao;

  //  @Transactional
  //  @Override
  //  public void add(Board board) {
  //    boardDao.insert(board);
  //    if (board.getAttachedFiles().size() > 0) {
  //      for (BoardFile boardFile : board.getAttachedFiles()) {
  //        boardFile.setBoardNo(board.getNo());
  //      }
  //      boardFileDao.insertList(board.getAttachedFiles());
  //    }
  //  }

  @Override
  public List<Question> list() {
    return questionDao.findAll();
  }

  //  @Override
  //  public List<Board> boardlist(String keyword) {
  //    // TODO Auto-generated method stub
  //    return boardDao.findListAll(keyword);
  //  }
  //
  //  @Override
  //  public Board get(int no) {
  //    Board b = boardDao.findByNo(no);
  //    if (b != null) {
  //      boardDao.increaseViewCount(no);
  //    }
  //    return b;
  //  }
  //
  //  @Transactional
  //  @Override
  //  public void update(Board board) {
  //    if (boardDao.update(board) == 0) {
  //      throw new RuntimeException("게시글이 존재하지 않습니다!");
  //    }
  //    if (board.getAttachedFiles().size() > 0) {
  //      boardFileDao.insertList(board.getAttachedFiles());
  //    }
  //  }
  //
  //  @Transactional
  //  @Override
  //  public void delete(int no) {
  //    replyDao.deleteOfBoard(no);
  //    boardFileDao.deleteOfBoard(no);
  //    System.out.println("델리트 호출");
  //    if (boardDao.delete(no) == 0) {
  //      throw new RuntimeException("게시글이 존재하지 않습니다!");
  //    }
  //  }
  //
  //
  //  @Override
  //  public BoardFile getFile(int fileNo) {
  //    return boardFileDao.findByNo(fileNo);
  //  }
  //
  //  @Override
  //  public void deleteFile(int fileNo) {
  //    boardFileDao.delete(fileNo);
  //  }
}





