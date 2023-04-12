package bitcamp.goodhere.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.goodhere.dao.ReplyDao;
import bitcamp.goodhere.service.ReplyService;
import bitcamp.goodhere.vo.Reply;

@Service
public class DefaultReplyService implements ReplyService {
  @Autowired private ReplyDao replyDao;


  @Override
  public void add(Reply reply) {
    replyDao.insert(reply);
  }

}
