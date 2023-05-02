package bitcamp.goodhere.vo;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class Question {
  private int no;
  private Member writer;
  private int writerNo;
  private String writerName;
  private String title;
  private String content;
  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd")
  private Date createdDate;
}
