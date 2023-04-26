package bitcamp.goodhere.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import bitcamp.goodhere.service.MemberService;
import bitcamp.goodhere.service.ObjectStorageService;
import bitcamp.goodhere.vo.Member;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/members")
public class MemberController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("MemberController 생성됨!");
  }

  @Autowired private MemberService memberService;
  @Autowired private ObjectStorageService objectStorageService;
  private String bucketName = "bitcamp-bucket22-member-photo";

  @PostMapping
  public Object insert(@RequestBody Member member) {
    memberService.add(member);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping
  public Object list() {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(memberService.list());
  }

  @GetMapping("{no}")
  public Object view(@PathVariable int no) {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(memberService.get(no));
  }

  @PutMapping("{no}")
  public Object update(
      @PathVariable int no,
      Member member,
      MultipartFile file,
      HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    String filename = objectStorageService.uploadFile(bucketName, "", file);
    if (filename != null) {
      loginUser.setPhoto(filename);
    }

    log.debug(member);

    loginUser.setNickname(member.getNickname() != loginUser.getNickname() ? member.getNickname() : loginUser.getNickname());
    loginUser.setTel(member.getTel() != loginUser.getTel() ? member.getTel() : loginUser.getTel());

    // 보안을 위해 URL 번호를 게시글 번호로 설정한다.
    member.setNo(no);

    memberService.update(loginUser);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no) {
    memberService.delete(no);
    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  //아이디 중복체크
  @GetMapping("/emailCheck")
  @ResponseBody
  public int checkEmail(String email) {
    int cnt = memberService.emailCheck(email);
    return cnt;
  }

  //닉네임 중복체크
  @GetMapping("/nickCheck")
  @ResponseBody
  public int checkNick(String nickname) {
    int cnt = memberService.nickCheck(nickname);
    return cnt;
  }

}
