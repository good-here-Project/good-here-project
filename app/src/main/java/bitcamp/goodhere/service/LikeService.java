package bitcamp.goodhere.service;

import bitcamp.goodhere.vo.Like;

public interface LikeService {
  void addLike(Like like);
  Like get(int no);
  void deleteLike(int no);
}
