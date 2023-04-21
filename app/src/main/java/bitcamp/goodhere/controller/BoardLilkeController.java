package bitcamp.goodhere.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.goodhere.service.BoardLikeService;
import bitcamp.goodhere.vo.BoardLike;
import bitcamp.goodhere.vo.Member;
import bitcamp.util.ErrorCode;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/like")
public class BoardLilkeController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("LikeController 생성됨!");
  }

  @Autowired private BoardLikeService boardLikeService;

  @PostMapping()
  public Object insert(BoardLike boardlike, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    boardlike.setMemberNo(loginUser.getNo());
    boardLikeService.add(boardlike);

    //    System.out.println(boardlike);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @PostMapping("/delete")
  public Object delete(BoardLike boardlike, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    boardlike.setMemberNo(loginUser.getNo());
    boardLikeService.delete(boardlike);

    return new RestResult()
        .setStatus(RestStatus.SUCCESS);
  }

  @GetMapping("{no}")
  public Object checkState(@PathVariable int no, HttpSession session) {
    Member loginUser = (Member) session.getAttribute("loginUser");

    if (loginUser == null) {
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
          .setData("로그인 요망");
    }

    BoardLike boardlike = new BoardLike();
    boardlike.setBoardNo(no);
    boardlike.setMemberNo(loginUser.getNo());


    //    System.out.println(boardlike);

    if(!boardLikeService.checkState(boardlike)) {
      return new RestResult()
          .setStatus(RestStatus.SUCCESS)
          .setData("false");
    }

    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData("true");
  }

  @GetMapping("cnt/{no}")
  public Object likeCnt(@PathVariable int no) {
    BoardLike boardlike = new BoardLike();

    return boardLikeService.likeCnt(no);
  }

}