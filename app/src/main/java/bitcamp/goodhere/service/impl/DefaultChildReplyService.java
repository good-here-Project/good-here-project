package bitcamp.goodhere.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import bitcamp.goodhere.dao.ChildReplyDao;
import bitcamp.goodhere.service.ChildReplyService;
import bitcamp.goodhere.vo.ChildReply;

@Service
public class DefaultChildReplyService implements ChildReplyService {
  @Autowired private ChildReplyDao childReplyDao;


  @Override
  public void add(ChildReply childReply) {
    childReplyDao.insert(childReply);
  }

  @Override
  public ChildReply get(int no) {
    ChildReply cr = childReplyDao.findByNo(no);
    return cr;
  }

  @Override
  public List<ChildReply> list() {
    return childReplyDao.findAll();
  }

  @Override
  public List<ChildReply> getList(ChildReply childReply) {
    // 부모 댓글 번호를 이용한 자식 댓글 조회 비즈니스 로직 수행
    // ...
    // 부모 댓글 번호를 이용한 자식 댓글 조회 DAO 호출
    System.out.println("서비스 호출");
    //    ChildReply childReply = new ChildReply();
    //    childReply.setParentCommentNo(parentCommentNo);
    System.out.println(childReply);
    return childReplyDao.findList(childReply);
  }

  @Transactional
  @Override
  public void update(ChildReply childReply) {
    if (childReplyDao.update(childReply) == 0) {
      throw new RuntimeException("댓글이 존재하지 않습니다!");
    }
  }

  @Transactional
  @Override
  public void delete(int no) {
    if (childReplyDao.delete(no) == 1) {
    } else {
      throw new RuntimeException("댓글이 존재하지 않습니다.");
    }
  }
}