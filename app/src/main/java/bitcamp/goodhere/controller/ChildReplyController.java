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
import bitcamp.goodhere.service.ChildReplyService;
import bitcamp.goodhere.vo.ChildReply;
import bitcamp.goodhere.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("replys/child")
public class ChildReplyController {
  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("ReplyController 생성됨!");
  }

  @Autowired private ChildReplyService childReplyService;


  @PostMapping
  public Object createChildReply(
      ChildReply childReply,
      HttpSession session) throws Exception {

    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser.getState() == 1) {
      System.out.println("블랙리스트");
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setMessage("사이트 이용이 제한된 사용자입니다.");
    }
    Member writer = new Member();
    writer.setNo(loginUser.getNo());
    //    writer.setNo(1);
    childReply.setWriter(writer);
    childReplyService.add(childReply);

    return new RestResult().setStatus(RestStatus.SUCCESS);
  }

  @GetMapping
  public Object list() {
    //    System.out.println("==>");
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(childReplyService.list());
  }

  @GetMapping("{no}")
  public List<ChildReply> listOfParentNo(@PathVariable int no) throws Exception {
    System.out.println("list 호출");
    ChildReply childReply = new ChildReply();
    childReply.setNo(no);

    return childReplyService.getList(childReply);
  }

  @PutMapping("{no}")
  public Object update(
      @PathVariable int no,
      ChildReply childReply,
      HttpSession session) throws Exception {

    Member loginUser = (Member) session.getAttribute("loginUser");
    childReply.setNo(no);
    //    Member writer = new Member();
    //    writer.setNo(loginUser.getNo());
    //    writer.setNo(1);
    //    childReply.setWriter(writer);

    System.out.println("update controller 호출");
    ChildReply old = childReplyService.get(childReply.getNo());
    if (loginUser.getAuth() != 2) {
      if (old.getWriter().getNo() != loginUser.getNo()) {
        return new RestResult()
            .setStatus(RestStatus.FAILURE)
            .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
            .setData("권한이 없습니다.");
      }
    }

    childReplyService.update(childReply);
    return new RestResult().setStatus(RestStatus.SUCCESS);
  }


  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no, HttpSession session) {

    //    Member loginUser = (Member) session.getAttribute("loginUser");
    Member loginUser = (Member) session.getAttribute("loginUser");
    System.out.println("delete 호출");
    Member writer = new Member();
    writer.setNo(1);

    ChildReply old = childReplyService.get(no);
    if (loginUser.getAuth() != 2) {
      if (old.getWriter().getNo() != writer.getNo()) {
        return new RestResult()
            .setStatus(RestStatus.FAILURE)
            .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
            .setData("권한이 없습니다.33");
      }
    }
    childReplyService.delete(no);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }


}