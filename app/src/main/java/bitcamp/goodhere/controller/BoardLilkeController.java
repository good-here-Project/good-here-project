package bitcamp.goodhere.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.goodhere.service.BoardLikeService;
import bitcamp.goodhere.vo.BoardLike;

@RestController
@RequestMapping("/like")
public class BoardLilkeController {

  Logger log = LogManager.getLogger(getClass());

  {
    log.trace("LikeController 생성됨!");
  }

  @Autowired private BoardLikeService boardLikeService;

  @PostMapping
  public ResponseEntity<String> add(BoardLike boardLike) {
    boardLikeService.add(boardLike);
    return ResponseEntity.ok("success");
  }

  @PostMapping("/delete")
  public ResponseEntity<String> delete(BoardLike boardLike) {
    boardLikeService.delete(boardLike);
    System.out.println("삭제 호출");
    return ResponseEntity.ok("success");
  }

  @GetMapping("/exist")
  public ResponseEntity<Boolean> isExist(@RequestParam int boardNo, @RequestParam int memberNo) {
    BoardLike boardLike = new BoardLike();
    boardLike.setBoardNo(boardNo);
    boardLike.setMemberNo(memberNo);
    boolean isExist = boardLikeService.isExist(boardLike);
    return ResponseEntity.ok(isExist);
  }

  @GetMapping("/count/{boardId}")
  public ResponseEntity<Integer> getCountByBoardNo(@PathVariable int boardNo) {
    int count = boardLikeService.getCountByBoardNo(boardNo);
    return ResponseEntity.ok(count);
  }

  @GetMapping("/count/{boardId}/{memberNo}")
  public ResponseEntity<Integer> getCountByBoardNoAndMemberNo(@PathVariable int boardNo, @PathVariable int memberNo) {
    int count = boardLikeService.getCountByBoardNoAndMemberNo(boardNo, memberNo);
    return ResponseEntity.ok(count);
  }

}