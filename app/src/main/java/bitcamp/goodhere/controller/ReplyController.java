package bitcamp.goodhere.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.goodhere.service.ReplyService;
import bitcamp.goodhere.vo.Member;
import bitcamp.goodhere.vo.Reply;
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
}
