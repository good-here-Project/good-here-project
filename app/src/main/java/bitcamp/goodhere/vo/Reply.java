package bitcamp.goodhere.vo;

import java.util.Date;
import lombok.Data;

@Data
public class Reply {
  private int no;
  private String content;

  private int boardNo;

  private Member writer;
  private int writerNo;
  private String writerName;

  private Date createdDate;
}
