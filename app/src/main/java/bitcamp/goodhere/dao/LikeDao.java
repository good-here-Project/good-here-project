package bitcamp.goodhere.dao;

import org.apache.ibatis.annotations.Mapper;
import bitcamp.goodhere.vo.Like;

@Mapper
public interface LikeDao {
  int insert(Like like);
  Like findByNo(int no);
  int delete(int no);
}
