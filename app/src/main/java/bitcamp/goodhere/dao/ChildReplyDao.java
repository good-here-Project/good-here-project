package bitcamp.goodhere.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.goodhere.vo.ChildReply;

@Mapper
public interface ChildReplyDao {
  int insert(ChildReply childReply);
  ChildReply findByNo(int no);
  List<ChildReply> findAll();
  List<ChildReply> findList(ChildReply childReply);
  int delete(int no);
  int deleteOfChildReply(int boardNo);
  int update(ChildReply childReply);
}