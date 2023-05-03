package bitcamp.goodhere.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.goodhere.service.AnswerService;
import bitcamp.goodhere.vo.Answer;
import bitcamp.goodhere.vo.Member;
import bitcamp.util.RestResult;
import bitcamp.util.RestStatus;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/answers")
public class AnswerController {

  // 입력: POST   => /boards
  // 목록: GET    => /boards
  // 조회: GET    => /boards/{no}
  // 변경: PUT    => /boards/{no}
  // 삭제: DELETE => /boards/{no}

  Logger log = LogManager.getLogger(getClass());



  @Autowired private AnswerService answerService;
  // @Autowired private ObjectStorageService objectStorageService;
  //  @Autowired private BoardLikeService boardLikeService;
  //private String bucketName = "bitcamp-bucket22";

  @PostMapping
  public Object insert(
      Answer answer,
      HttpSession session) throws Exception{

    Member loginUser = (Member) session.getAttribute("loginUser");

    System.out.println(answer);

    if (loginUser.getState() == 1) {
      System.out.println("블랙리스트");
      return new RestResult()
          .setStatus(RestStatus.FAILURE)
          .setMessage("사이트 이용이 제한된 사용자입니다.");
    }

    Member writer = new Member();
    writer.setNo(loginUser.getNo());
    answer.setWriter(writer);

    answerService.add(answer);

    return new RestResult().setStatus(RestStatus.SUCCESS);

  }

  //  @PostMapping
  //  public Object insert(
  //      Board board,
  //      List<MultipartFile> files,
  //      HttpSession session) throws Exception{
  //
  //    Member loginUser = (Member) session.getAttribute("loginUser");
  //
  //    if (loginUser.getState() == 1) {
  //      return new RestResult()
  //          .setStatus(RestStatus.FAILURE)
  //          .setMessage("사이트 이용이 제한된 사용자입니다.");
  //    }
  //
  //    Member writer = new Member();
  //    writer.setNo(loginUser.getNo());
  //    board.setWriter(writer);
  //
  //    List<BoardFile> boardFiles = new ArrayList<>();
  //    for (MultipartFile file : files) {
  //      String filename = objectStorageService.uploadFile(bucketName, "board/", file);
  //      if (filename == null) {
  //        continue;
  //      }
  //
  //      BoardFile boardFile = new BoardFile();
  //      boardFile.setOriginalFilename(file.getOriginalFilename());
  //      boardFile.setFilepath(filename);
  //      boardFile.setMimeType(file.getContentType());
  //      boardFiles.add(boardFile);
  //    }
  //    board.setAttachedFiles(boardFiles);
  //
  //    boardService.add(board);
  //
  //    return new RestResult()
  //        .setStatus(RestStatus.SUCCESS);
  //  }

  @GetMapping
  public Object list() {
    log.debug("QuestionController.list() 호출됨!");

    // MappingJackson2HttpMessageConverter 가 jackson 라이브러리를 이용해
    // 자바 객체를 JSON 문자열로 변환하여 클라이언트로 보낸다.
    // 이 컨버터를 사용하면 굳이 UTF-8 변환을 설정할 필요가 없다.
    // 즉 produces = "application/json;charset=UTF-8" 를 설정하지 않아도 된다.
    return new RestResult()
        .setStatus(RestStatus.SUCCESS)
        .setData(answerService.list());
  }


  //  @GetMapping("/list")
  //  public Object boardlist(String keyword) {
  //    log.debug("BoardController.list() 호출됨!");
  //
  //    // MappingJackson2HttpMessageConverter 가 jackson 라이브러리를 이용해
  //    // 자바 객체를 JSON 문자열로 변환하여 클라이언트로 보낸다.
  //    // 이 컨버터를 사용하면 굳이 UTF-8 변환을 설정할 필요가 없다.
  //    // 즉 produces = "application/json;charset=UTF-8" 를 설정하지 않아도 된다.
  //    return new RestResult()
  //        .setStatus(RestStatus.SUCCESS)
  //        .setData(boardService.boardlist(keyword));
  //  }

  //  @GetMapping("{no}")
  //  public Object view(@PathVariable int no) {
  //    Board board = boardService.get(no);
  //    if (board != null) {
  //      return new RestResult()
  //          .setStatus(RestStatus.SUCCESS)
  //          .setData(board);
  //    } else {
  //      return new RestResult()
  //          .setStatus(RestStatus.FAILURE)
  //          .setErrorCode(ErrorCode.rest.NO_DATA);
  //    }
  //  }

  //  @PutMapping("{no}")
  //  public Object update(
  //      @PathVariable int no,
  //      Board board,
  //      List<MultipartFile> files,
  //      HttpSession session) throws Exception {
  //    System.out.println("UP 호출");
  //
  //    Member loginUser = (Member) session.getAttribute("loginUser");
  //
  //    // URL 의 번호와 요청 파라미터의 번호가 다를 경우를 방지하기 위해
  //    // URL의 번호를 게시글 번호로 설정한다.
  //    board.setNo(no);
  //
  //    Board old = boardService.get(board.getNo());
  //    if (loginUser.getAuth() != 2) {
  //      if (old.getWriter().getNo() != loginUser.getNo()) {
  //        return new RestResult()
  //            .setStatus(RestStatus.FAILURE)
  //            .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
  //            .setData("권한이 없습니다.");
  //      }
  //    }
  //
  //    List<BoardFile> boardFiles = new ArrayList<>();
  //    for (MultipartFile file : files) {
  //      String filename = objectStorageService.uploadFile(bucketName, "board/", file);
  //      if (filename == null) {
  //        continue;
  //      }
  //
  //      BoardFile boardFile = new BoardFile();
  //      boardFile.setOriginalFilename(file.getOriginalFilename());
  //      boardFile.setFilepath(filename);
  //      boardFile.setMimeType(file.getContentType());
  //      boardFile.setBoardNo(board.getNo());
  //      boardFiles.add(boardFile);
  //    }
  //    board.setAttachedFiles(boardFiles);
  //
  //    boardService.update(board);
  //
  //    return new RestResult()
  //        .setStatus(RestStatus.SUCCESS);
  //  }
  //
  //  @DeleteMapping("{no}")
  //  public Object delete(@PathVariable int no, HttpSession session) {
  //
  //    Member loginUser = (Member) session.getAttribute("loginUser");
  //
  //    if (loginUser.getAuth() != 2) {
  //      // 로그인한 사용자가 관리자가 아닌 경우
  //      Board old = boardService.get(no);
  //      if (old.getWriter().getNo() != loginUser.getNo()) {
  //        return new RestResult()
  //            .setStatus(RestStatus.FAILURE)
  //            .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
  //            .setData("권한이 없습니다.");
  //      }
  //    }
  //
  //    boardLikeService.deleteByBoardNo(no);
  //    boardService.delete(no);
  //
  //    return new RestResult()
  //        .setStatus(RestStatus.SUCCESS);
  //  }
  //
  //  @DeleteMapping("{boardNo}/files/{fileNo}")
  //  public Object filedelete(
  //      @PathVariable int boardNo,
  //      @PathVariable int fileNo,
  //      HttpSession session) {
  //
  //    Member loginUser = (Member) session.getAttribute("loginUser");
  //    Board old = boardService.get(boardNo);
  //
  //    if (old.getWriter().getNo() != loginUser.getNo()) {
  //      return new RestResult()
  //          .setStatus(RestStatus.FAILURE)
  //          .setErrorCode(ErrorCode.rest.UNAUTHORIZED)
  //          .setData("권한이 없습니다.");
  //
  //    } else {
  //      boardService.deleteFile(fileNo);
  //      return new RestResult()
  //          .setStatus(RestStatus.SUCCESS);
  //    }
  //  }

}