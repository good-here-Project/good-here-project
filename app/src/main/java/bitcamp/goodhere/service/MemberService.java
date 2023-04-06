package bitcamp.goodhere.service;

import java.util.List;
import bitcamp.goodhere.vo.Member;

public interface MemberService {
  void add(Member member);
  List<Member> list();
  Member get(int no);
  Member get(String email, String password);
  Member get(String email);
  void update(Member member);
  void delete(int no);

  int emailCheck(String email);
  int nickCheck(String nickname);
}





