package bitcamp.goodhere.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bitcamp.goodhere.dao.LikeDao;
import bitcamp.goodhere.service.LikeService;
import bitcamp.goodhere.vo.Like;

@Service
public class DefaultLikeService implements LikeService {
  @Autowired private LikeDao likeDao;

  @Override
  public void addLike(Like like) {
    likeDao.insert(like);
  }

  @Override
  public Like get(int no) {
    Like l = likeDao.findByNo(no);

    return l;
  }

  @Override
  public void deleteLike(int no) {
    likeDao.delete(no);
  }
}
