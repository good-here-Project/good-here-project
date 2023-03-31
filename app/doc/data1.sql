INSERT INTO gh_member (email, pwd, name, tel, state, auth, nickname, introduce, photo) 
VALUES 
('test1@test.com', '1111', '홍길동1', '010-1111-1111', 1, 1, '길동1', '안녕1', 'john_smith.jpg'),
('test2@test.com', '1111', '홍길동2', '010-1111-1111', 1, 1, '길동2', '안녕2', 'jane_doe.jpg'),
('admin@test.com', '1111', 'admin1', '010-1111-1111', 1, 1, '길동2', '안녕2', 'jane_doe.jpg');

INSERT INTO gh_board_type(board_type_id, name)
VALUES
('1', '1');

INSERT INTO gh_board (board_type_id, member_id, title, content, view_cnt)
VALUES
('1', '1', '111', '111', 1);



alter table gh_board
  add column writer int,
  add constraint gh_board_fk foreign key (writer) references gh_member(member_id);