package bitcamp.goodhere.service;

import java.util.List;
import bitcamp.goodhere.vo.Reply;

public interface ReplyService {
  void add(Reply reply);
  List<Reply> list();
  Reply get(int no);
  void delete(int no);
}
