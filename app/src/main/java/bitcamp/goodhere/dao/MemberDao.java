package bitcamp.goodhere.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.goodhere.vo.Member;

@Mapper
public interface MemberDao {
  void insert(Member m);
  List<Member> findAll();
  Member findByNo(int no);
  Member findByEmailAndPassword(Map<String, Object> params);
  Member findByEmail(String email);
  int update(Member m);
  int delete(int no);

  int emailCheck(String email);
  int nickCheck(String nickname);
}









