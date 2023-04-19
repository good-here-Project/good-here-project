package bitcamp.goodhere.vo;

import lombok.Data;

@Data
public class Like {
  private int no;
  private int boardNo;
  private int memberNo;
  private Member member;
}
