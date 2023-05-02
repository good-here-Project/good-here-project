package bitcamp.goodhere.vo;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class Answer {
  private int no;
  private int questionNo;
  private String title;
  private String content;

  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd")
  private Date createdDate;

  private Member writer;
  private int writerNo;
  private String writerName;
}