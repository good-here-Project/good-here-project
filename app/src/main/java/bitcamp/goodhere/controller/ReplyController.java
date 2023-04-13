package bitcamp.goodhere.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    Member writer = new Member();
    writer.setNo(loginUser.getNo());
    reply.setWriter(writer);

    //    reply.setWriterNo(loginUser.getNo());
    //    reply.setWriter(writer);

    replyService.add(reply);

    return new RestResult().setStatus(RestStatus.SUCCESS);

  }

  @GetMapping
  public Object list() {
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(replyService.list());
  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    Reply old = replyService.get(no);

    if (old.getWriter().getNo() != loginUser.getNo()) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("권한이 없습니다.");
    }
    replyService.delete(no);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }
}
