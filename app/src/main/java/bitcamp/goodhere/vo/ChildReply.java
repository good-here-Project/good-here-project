package bitcamp.goodhere.vo;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import lombok.Data;

@Data
public class ChildReply {
  private int no;
  private int parentCommentNo;
  private Member writer;
  private String writerName;
  private String content;

  @JsonFormat(
      shape = Shape.STRING,
      pattern = "yyyy-MM-dd@HH:mm:ss", timezone = "Asia/Seoul")
  private LocalDateTime createdDate;
}