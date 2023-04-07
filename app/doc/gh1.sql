-- 회원
DROP TABLE IF EXISTS gh_member RESTRICT;

-- 댓글
DROP TABLE IF EXISTS gh_comment RESTRICT;

-- 게시글
DROP TABLE IF EXISTS gh_board RESTRICT;

-- 신고
DROP TABLE IF EXISTS gh_report RESTRICT;

-- 대댓글
DROP TABLE IF EXISTS gh_re_comment RESTRICT;

-- 1:1문의
DROP TABLE IF EXISTS gh_inquiry RESTRICT;

-- 좋아요
DROP TABLE IF EXISTS gh_like RESTRICT;

-- 첨부파일
DROP TABLE IF EXISTS gh_boardfile RESTRICT;

-- 알림유형
DROP TABLE IF EXISTS gh_alarm_type RESTRICT;

-- 회원알림설정
DROP TABLE IF EXISTS gh_alarm RESTRICT;

-- 알림로그
DROP TABLE IF EXISTS gh_alarm_log RESTRICT;

-- 팔로워
DROP TABLE IF EXISTS gh_follow RESTRICT;

-- 게시판유형
DROP TABLE IF EXISTS gh_board_type RESTRICT;

-- 회원
CREATE TABLE gh_member (
  member_id    INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  email        VARCHAR(40)  NOT NULL COMMENT '아이디(이메일)', -- 아이디(이메일)
  pwd          VARCHAR(255) NOT NULL COMMENT '비밀번호', -- 비밀번호
  name         VARCHAR(60)  NOT NULL COMMENT '이름', -- 이름
  tel          VARCHAR(30)  NOT NULL COMMENT '전화번호', -- 전화번호
  nickname     VARCHAR(60)  NOT NULL COMMENT '별명', -- 별명
  introduce    TEXT         NULL     COMMENT '자기소개', -- 자기소개
  photo        VARCHAR(255) NULL     COMMENT '사진', -- 사진
  created_date DATETIME     NOT NULL DEFAULT now() COMMENT '가입일', -- 가입일
  state        INTEGER      NULL     COMMENT '상태', -- 상태
  auth         INTEGER      NULL     COMMENT '권한' -- 권한
)
COMMENT '회원';

-- 회원
ALTER TABLE gh_member
  ADD CONSTRAINT PK_gh_member -- 회원 기본키
  PRIMARY KEY (
  member_id -- 회원번호
  );

-- 회원 유니크 인덱스
CREATE UNIQUE INDEX UIX_gh_member
  ON gh_member ( -- 회원
    email ASC,    -- 아이디(이메일)
    nickname ASC  -- 별명
  );

-- 회원 인덱스
CREATE INDEX IX_gh_member
  ON gh_member( -- 회원
    name ASC,     -- 이름
    email ASC,    -- 아이디(이메일)
    nickname ASC  -- 별명
  );

ALTER TABLE gh_member
  MODIFY COLUMN member_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원번호';

-- 댓글
CREATE TABLE gh_comment (
  comment_id   INTEGER  NOT NULL COMMENT '댓글번호', -- 댓글번호
  board_id     INTEGER  NOT NULL COMMENT '게시글번호', -- 게시글번호
  member_id    INTEGER  NOT NULL COMMENT '회원번호', -- 회원번호
  content      TEXT     NOT NULL COMMENT '댓글내용', -- 댓글내용
  created_date DATETIME NOT NULL DEFAULT now() COMMENT '댓글작성일' -- 댓글작성일
)
COMMENT '댓글';

-- 댓글
ALTER TABLE gh_comment
  ADD CONSTRAINT PK_gh_comment -- 댓글 기본키
  PRIMARY KEY (
  comment_id -- 댓글번호
  );

ALTER TABLE gh_comment
  MODIFY COLUMN comment_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '댓글번호';

-- 게시글
CREATE TABLE gh_board (
  board_id      INTEGER      NOT NULL COMMENT '게시글번호', -- 게시글번호
  board_type_id INTEGER      NOT NULL COMMENT '게시판유형번호', -- 게시판유형번호
  writer        INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  title         VARCHAR(100) NOT NULL COMMENT '게시글명', -- 게시글명
  content       LONGTEXT     NOT NULL COMMENT '게시글내용', -- 게시글내용
  created_date  DATETIME     NOT NULL DEFAULT now() COMMENT '등록일', -- 등록일
  view_cnt      INTEGER      NOT NULL DEFAULT 0 COMMENT '조회수', -- 조회수
  location      TEXT         NULL     COMMENT '위치' -- 위치
)
COMMENT '게시글';

-- 게시글
ALTER TABLE gh_board
  ADD CONSTRAINT PK_gh_board -- 게시글 기본키
  PRIMARY KEY (
  board_id -- 게시글번호
  );

-- 게시글 인덱스
CREATE INDEX IX_gh_board
  ON gh_board( -- 게시글
    title ASC -- 게시글명
  );

ALTER TABLE gh_board
  MODIFY COLUMN board_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '게시글번호';
  
--ALTER table gh_board
--  add column writer int,
--  add constraint app_board_fk foreign key (writer) references app_member(member_id); // Foreign키값 밑에 있으나 혹시 안된다면 이걸로 ALTER해서 member_id값 writer로 받기

-- 신고
CREATE TABLE gh_report (
  report_id    INTEGER      NOT NULL COMMENT '신고번호', -- 신고번호
  board_id     INTEGER      NOT NULL COMMENT '게시글번호', -- 게시글번호
  member_id    INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  title        VARCHAR(100) NOT NULL COMMENT '신고제목', -- 신고제목
  content      TEXT         NOT NULL COMMENT '신고내용', -- 신고내용
  created_date DATETIME     NOT NULL DEFAULT now() COMMENT '신고일', -- 신고일
  answer       TEXT         NULL     COMMENT '신고답변', -- 신고답변
  answer_date  DATETIME     NULL     DEFAULT now() COMMENT '답변일' -- 답변일
)
COMMENT '신고';

-- 신고
ALTER TABLE gh_report
  ADD CONSTRAINT PK_gh_report -- 신고 기본키
  PRIMARY KEY (
  report_id -- 신고번호
  );

-- 신고 인덱스
CREATE INDEX IX_gh_report
  ON gh_report( -- 신고
    title ASC -- 신고제목
  );

ALTER TABLE gh_report
  MODIFY COLUMN report_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '신고번호';

-- 대댓글
CREATE TABLE gh_re_comment (
  re_comment_id INTEGER  NOT NULL COMMENT '대댓글번호', -- 대댓글번호
  member_id     INTEGER  NOT NULL COMMENT '회원번호', -- 회원번호
  comment_id    INTEGER  NOT NULL COMMENT '댓글번호', -- 댓글번호
  content       TEXT     NOT NULL COMMENT '대댓글내용', -- 대댓글내용
  created_date  DATETIME NOT NULL DEFAULT now() COMMENT '대댓글작성일' -- 대댓글작성일
)
COMMENT '대댓글';

-- 대댓글
ALTER TABLE gh_re_comment
  ADD CONSTRAINT PK_gh_re_comment -- 대댓글 기본키
  PRIMARY KEY (
  re_comment_id -- 대댓글번호
  );

ALTER TABLE gh_re_comment
  MODIFY COLUMN re_comment_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '대댓글번호';

-- 1:1문의
CREATE TABLE gh_inquiry (
  inquiry_id   INTEGER      NOT NULL COMMENT '문의번호', -- 문의번호
  member_id    INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  title        VARCHAR(100) NOT NULL COMMENT '문의제목', -- 문의제목
  content      TEXT         NOT NULL COMMENT '문의내용', -- 문의내용
  created_date DATETIME     NOT NULL DEFAULT now() COMMENT '문의일', -- 문의일
  answer       TEXT         NULL     COMMENT '답변', -- 답변
  answer_bool  INTEGER      NOT NULL COMMENT '답변여부', -- 답변여부
  answer_date  DATETIME     NULL     DEFAULT now() COMMENT '답변일' -- 답변일
)
COMMENT '1:1문의';

-- 1:1문의
ALTER TABLE gh_inquiry
  ADD CONSTRAINT PK_gh_inquiry -- 1:1문의 기본키
  PRIMARY KEY (
  inquiry_id -- 문의번호
  );

-- 1:1문의 인덱스
CREATE INDEX IX_gh_inquiry
  ON gh_inquiry( -- 1:1문의
    title ASC -- 문의제목
  );

ALTER TABLE gh_inquiry
  MODIFY COLUMN inquiry_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '문의번호';

-- 좋아요
CREATE TABLE gh_like (
  board_id  INTEGER NOT NULL COMMENT '게시글번호', -- 게시글번호
  member_id INTEGER NOT NULL COMMENT '회원번호' -- 회원번호
)
COMMENT '좋아요';

-- 좋아요
ALTER TABLE gh_like
  ADD CONSTRAINT PK_gh_like -- 좋아요 기본키
  PRIMARY KEY (
  board_id,  -- 게시글번호
  member_id  -- 회원번호
  );

-- 첨부파일
CREATE TABLE gh_boardfile (
  boardfile_id    INTEGER      NOT NULL COMMENT '첨부파일번호', -- 첨부파일번호
  board_id        INTEGER      NOT NULL COMMENT '게시글번호', -- 게시글번호
  origin_filename VARCHAR(255) NOT NULL COMMENT '파일명', -- 파일명
  filepath        VARCHAR(255) NULL     COMMENT '파일경로', -- 파일경로
  mime_type       VARCHAR(60)  NOT NULL COMMENT 'MIMETYPE' -- MIMETYPE
)
COMMENT '첨부파일';

-- 첨부파일
ALTER TABLE gh_boardfile
  ADD CONSTRAINT PK_gh_boardfile -- 첨부파일 기본키
  PRIMARY KEY (
  boardfile_id -- 첨부파일번호
  );

ALTER TABLE gh_boardfile
  MODIFY COLUMN boardfile_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '첨부파일번호';

-- 알림유형
CREATE TABLE gh_alarm_type (
  alarm_type_id INTEGER NOT NULL COMMENT '알림유형번호', -- 알림유형번호
  alarm         TEXT    NOT NULL COMMENT '알림' -- 알림
)
COMMENT '알림유형';

-- 알림유형
ALTER TABLE gh_alarm_type
  ADD CONSTRAINT PK_gh_alarm_type -- 알림유형 기본키
  PRIMARY KEY (
  alarm_type_id -- 알림유형번호
  );

-- 회원알림설정
CREATE TABLE gh_alarm (
  member_id     INTEGER NOT NULL COMMENT '회원번호', -- 회원번호
  alarm_type_id INTEGER NOT NULL COMMENT '알림유형번호' -- 알림유형번호
)
COMMENT '회원알림설정';

-- 회원알림설정
ALTER TABLE gh_alarm
  ADD CONSTRAINT PK_gh_alarm -- 회원알림설정 기본키
  PRIMARY KEY (
  member_id,     -- 회원번호
  alarm_type_id  -- 알림유형번호
  );

-- 알림로그
CREATE TABLE gh_alarm_log (
  alarm_log_id  INTEGER  NOT NULL COMMENT '알림로그번호', -- 알림로그번호
  alarm_type_id INTEGER  NOT NULL COMMENT '알림유형번호', -- 알림유형번호
  member_id     INTEGER  NOT NULL COMMENT '회원번호', -- 회원번호
  alarm_date    DATETIME NOT NULL DEFAULT now() COMMENT '알림일', -- 알림일
  content       TEXT     NOT NULL COMMENT '알림내용', -- 알림내용
  alarm_bool    INTEGER  NOT NULL COMMENT '읽음여부' -- 읽음여부
)
COMMENT '알림로그';

-- 알림로그
ALTER TABLE gh_alarm_log
  ADD CONSTRAINT PK_gh_alarm_log -- 알림로그 기본키
  PRIMARY KEY (
  alarm_log_id -- 알림로그번호
  );

ALTER TABLE gh_alarm_log
  MODIFY COLUMN alarm_log_id INTEGER NOT NULL AUTO_INCREMENT COMMENT '알림로그번호';

-- 팔로워
CREATE TABLE gh_follow (
  member_id  INTEGER NOT NULL COMMENT '회원번호', -- 회원번호
  member_id2 INTEGER NOT NULL COMMENT '팔로잉회원번호' -- 팔로잉회원번호
)
COMMENT '팔로워';

-- 팔로워
ALTER TABLE gh_follow
  ADD CONSTRAINT PK_gh_follow -- 팔로워 기본키
  PRIMARY KEY (
  member_id,  -- 회원번호
  member_id2  -- 팔로잉회원번호
  );

-- 게시판유형
CREATE TABLE gh_board_type (
  board_type_id INTEGER     NOT NULL COMMENT '게시판유형번호', -- 게시판유형번호
  name          VARCHAR(60) NOT NULL COMMENT '게시판이름' -- 게시판이름
)
COMMENT '게시판유형';

-- 게시판유형
ALTER TABLE gh_board_type
  ADD CONSTRAINT PK_gh_board_type -- 게시판유형 기본키
  PRIMARY KEY (
  board_type_id -- 게시판유형번호
  );

-- 댓글
ALTER TABLE gh_comment
  ADD CONSTRAINT FK_gh_board_TO_gh_comment -- 게시글 -> 댓글
  FOREIGN KEY (
  board_id -- 게시글번호
  )
  REFERENCES gh_board ( -- 게시글
  board_id -- 게시글번호
  );

-- 댓글
ALTER TABLE gh_comment
  ADD CONSTRAINT FK_gh_member_TO_gh_comment -- 회원 -> 댓글
  FOREIGN KEY (
  member_id -- 회원번호
  )
  REFERENCES gh_member ( -- 회원
  member_id -- 회원번호
  );

-- 게시글
ALTER TABLE gh_board
  ADD CONSTRAINT FK_gh_member_TO_gh_board -- 회원 -> 게시글
  FOREIGN KEY (
  writer -- 회원번호
  )
  REFERENCES gh_member ( -- 회원
  member_id -- 회원번호
  );

-- 게시글
ALTER TABLE gh_board
  ADD CONSTRAINT FK_gh_board_type_TO_gh_board -- 게시판유형 -> 게시글
  FOREIGN KEY (
  board_type_id -- 게시판유형번호
  )
  REFERENCES gh_board_type ( -- 게시판유형
  board_type_id -- 게시판유형번호
  );

-- 신고
ALTER TABLE gh_report
  ADD CONSTRAINT FK_gh_board_TO_gh_report -- 게시글 -> 신고
  FOREIGN KEY (
  board_id -- 게시글번호
  )
  REFERENCES gh_board ( -- 게시글
  board_id -- 게시글번호
  );

-- 신고
ALTER TABLE gh_report
  ADD CONSTRAINT FK_gh_member_TO_gh_report -- 회원 -> 신고
  FOREIGN KEY (
  member_id -- 회원번호
  )
  REFERENCES gh_member ( -- 회원
  member_id -- 회원번호
  );

-- 대댓글
ALTER TABLE gh_re_comment
  ADD CONSTRAINT FK_gh_comment_TO_gh_re_comment -- 댓글 -> 대댓글
  FOREIGN KEY (
  comment_id -- 댓글번호
  )
  REFERENCES gh_comment ( -- 댓글
  comment_id -- 댓글번호
  );

-- 대댓글
ALTER TABLE gh_re_comment
  ADD CONSTRAINT FK_gh_member_TO_gh_re_comment -- 회원 -> 대댓글
  FOREIGN KEY (
  member_id -- 회원번호
  )
  REFERENCES gh_member ( -- 회원
  member_id -- 회원번호
  );

-- 1:1문의
ALTER TABLE gh_inquiry
  ADD CONSTRAINT FK_gh_member_TO_gh_inquiry -- 회원 -> 1:1문의
  FOREIGN KEY (
  member_id -- 회원번호
  )
  REFERENCES gh_member ( -- 회원
  member_id -- 회원번호
  );

-- 좋아요
ALTER TABLE gh_like
  ADD CONSTRAINT FK_gh_board_TO_gh_like -- 게시글 -> 좋아요
  FOREIGN KEY (
  board_id -- 게시글번호
  )
  REFERENCES gh_board ( -- 게시글
  board_id -- 게시글번호
  );

-- 좋아요
ALTER TABLE gh_like
  ADD CONSTRAINT FK_gh_member_TO_gh_like -- 회원 -> 좋아요
  FOREIGN KEY (
  member_id -- 회원번호
  )
  REFERENCES gh_member ( -- 회원
  member_id -- 회원번호
  );

-- 첨부파일
ALTER TABLE gh_boardfile
  ADD CONSTRAINT FK_gh_board_TO_gh_boardfile -- 게시글 -> 첨부파일
  FOREIGN KEY (
  board_id -- 게시글번호
  )
  REFERENCES gh_board ( -- 게시글
  board_id -- 게시글번호
  );

-- 회원알림설정
ALTER TABLE gh_alarm
  ADD CONSTRAINT FK_gh_member_TO_gh_alarm -- 회원 -> 회원알림설정
  FOREIGN KEY (
  member_id -- 회원번호
  )
  REFERENCES gh_member ( -- 회원
  member_id -- 회원번호
  );

-- 회원알림설정
ALTER TABLE gh_alarm
  ADD CONSTRAINT FK_gh_alarm_type_TO_gh_alarm -- 알림유형 -> 회원알림설정
  FOREIGN KEY (
  alarm_type_id -- 알림유형번호
  )
  REFERENCES gh_alarm_type ( -- 알림유형
  alarm_type_id -- 알림유형번호
  );

-- 알림로그
ALTER TABLE gh_alarm_log
  ADD CONSTRAINT FK_gh_alarm_type_TO_gh_alarm_log -- 알림유형 -> 알림로그
  FOREIGN KEY (
  alarm_type_id -- 알림유형번호
  )
  REFERENCES gh_alarm_type ( -- 알림유형
  alarm_type_id -- 알림유형번호
  );

-- 알림로그
ALTER TABLE gh_alarm_log
  ADD CONSTRAINT FK_gh_member_TO_gh_alarm_log -- 회원 -> 알림로그
  FOREIGN KEY (
  member_id -- 회원번호
  )
  REFERENCES gh_member ( -- 회원
  member_id -- 회원번호
  );

-- 팔로워
ALTER TABLE gh_follow
  ADD CONSTRAINT FK_gh_member_TO_gh_follow -- 회원 -> 팔로워
  FOREIGN KEY (
  member_id -- 회원번호
  )
  REFERENCES gh_member ( -- 회원
  member_id -- 회원번호
  );

-- 팔로워
ALTER TABLE gh_follow
  ADD CONSTRAINT FK_gh_member_TO_gh_follow2 -- 회원 -> 팔로워2
  FOREIGN KEY (
  member_id2 -- 팔로잉회원번호
  )
  REFERENCES gh_member ( -- 회원
  member_id -- 회원번호
  );