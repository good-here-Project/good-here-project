package bitcamp.goodhere.controller;

import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.goodhere.service.ReplyService;
import bitcamp.goodhere.vo.Member;
import bitcamp.goodhere.vo.Reply;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/replys")
public class ReplyController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("ReplyController 생성됨!");
  }

  @Autowired private ReplyService replyService;

  @PostMapping
  public Object insert(
      Reply reply,
      HttpSession session) throws Exception{

    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser.getState() == 1) {
      System.out.println("블랙리스트");
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setMessage("사이트 이용이 제한된 사용자입니다.");
    }

    Member writer = new Member();
    writer.setNo(loginUser.getNo());
    reply.setWriter(writer);

    replyService.add(reply);

    return new RestResult().setStatus(RestStatus.SUCCESS);

  }

  @GetMapping
  public Object list() {
    System.out.println("==>");
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(replyService.list());
  }

  @GetMapping("/adminlist")
  public Object adminlist() {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(replyService.adminlist());
  }

  @GetMapping("{no}")
  public List<Reply> view(@PathVariable int no) throws Exception {
    Reply reply = new Reply();
    reply.setNo(no);

    return replyService.getList(reply);
  }

  @PutMapping("{no}")
  public Object update(
      @PathVariable int no,
      Reply reply,
      HttpSession session) throws Exception {

    Member loginUser = (Member) session.getAttribute("loginUser");
    reply.setNo(no);

    Reply old = replyService.get(reply.getNo());
    System.out.println("호출이요");
    if (loginUser.getAuth() != 2) {
      if (old.getWriter().getNo() != loginUser.getNo()) {
        return new RestResult()
            .setStatus(RestStatus.FAILURE)
            .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
            .setData("권한이 없습니다.");
      }
    }

    replyService.update(reply);
    return new RestResult().setStatus(RestStatus.SUCCESS);
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    Reply old = replyService.get(no);

    if (loginUser.getAuth() != 2) {
      if (old.getWriter().getNo() != loginUser.getNo()) {
        return new RestResult()
            .setStatus(RestStatus.FAILURE)
            .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
            .setData("권한이 없습니다.222");
      }
    }
    replyService.delete(no);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }
}