package bitcamp.goodhere.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.goodhere.service.LikeService;
import bitcamp.goodhere.vo.Like;
import bitcamp.goodhere.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/likes")
public class LikeController {
  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("LikeController 생성됨!");
  }

  @Autowired private LikeService likeService;

  @PostMapping
  public Object insert(
      Like like,
      HttpSession session) throws Exception{

    Member loginUser = (Member) session.getAttribute("loginUser");

    Member writer = new Member();
    writer.setNo(loginUser.getNo());

    likeService.addLike(like);

    return new RestResult().setStatus(RestStatus.SUCCESS);

  }

  @DeleteMapping("{no}")
  public Object delete(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    Like old = likeService.get(no);

    if (old.getMember().getNo() != loginUser.getNo()) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("권한이 없습니다.");
    }
    likeService.deleteLike(no);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }
}
