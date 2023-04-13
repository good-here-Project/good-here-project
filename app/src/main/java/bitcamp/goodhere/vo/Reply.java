package bitcamp.goodhere.vo;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class Reply {
  private int no;
  private String content;

  private int boardNo;

  private Member writer;
  private int writerNo;
  private String writerName;

  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd")
  private Date createdDate;
}
