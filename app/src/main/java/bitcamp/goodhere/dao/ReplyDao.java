package bitcamp.goodhere.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.goodhere.vo.Reply;

@Mapper
public interface ReplyDao {
  int insert(Reply reply);
  List<Reply> findAll();
  Reply findByNo(int no);
  int delete(int no);
  int deleteOfBoard(int boardNo);
}
