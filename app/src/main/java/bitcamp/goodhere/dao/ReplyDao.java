package bitcamp.goodhere.dao;

import org.apache.ibatis.annotations.Mapper;
import bitcamp.goodhere.vo.Reply;

@Mapper
public interface ReplyDao {
  int insert(Reply reply);
}
