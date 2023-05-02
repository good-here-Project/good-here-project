import React, { useState } from "react";
import './main.css';
import HModal from "../hmodal/hmodal";
import { ReactDOM } from "react";

function Main() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
      <div className="main">
          <div className="body">
            <div className="cate">
                <ul className="list">
                    <li className="hot-place">HOT 플레이스</li>
                    <li className="board">커뮤니티</li>
                </ul>
                <ul className="list-best">
                    <li>인기순</li>
                </ul>
            </div>
            <div>
                <ul className="mbox">
                    <li><img src='img/img1.png' onClick={handleModalOpen}></img></li>
                    <li><img src='img/img2.png'></img></li>
                    <li><img src='img/img3.png'></img></li>
                    <li><img src='img/img4.png'></img></li>
                    <li><img src='img/img5.png'></img></li>
                    <li><img src='img/img6.png'></img></li>
                    <li><img src='img/img7.png'></img></li>
                    <li><img src='img/img8.png'></img></li>
                </ul>
            </div>

            <HModal isOpen={isModalOpen} onClose={handleModalClose}>
                <div className="hotplace-main">
                    <div className="hotplace-moive">
                        <img src='img/img1.png'></img>
                    </div>
                    <div className="hotplace-text">
                        <div className="text-head">
                            <div className="text-head-main">
                                <p className="text-head-title">제주 스노쿨링 스팟</p>
                                <p className="text-head-day">From 제주 &#183; 2023-04-06</p>
                            </div>
                            <div className="hotplace-like">
                                <span className="like-state">&#10084; 92</span>
                            </div>
                        </div>
                        <div className="text-body">
                            <div className="hotplace-writer">
                                <img src="img/user.png" className="userImg"></img>
                                <p className="userName">여행전문가</p>
                            </div>
                            <div className="hotplace-writer-text">
                                <br/>
                                <p>코난해변</p>
                                <p>제주시 주화읍 행원리 575-6</p>
                                <p>별도의 주차장 없음, 공터에 주차</p>
                                <br/>
                                <p>조용히 물놀이 즐기고 싶다면 코난해변 방문해보세요</p>
                            </div>
                        </div>
                        <div className="text-footer">
                            <div className="text-footer-head">
                                댓글
                            </div>
                            <div className="text-footer-body">
                                <div>
                                    <img src='img/user2.png' className="commentImg"></img>
                                </div>
                                <div>
                                    <p className="comment-user-name">유미</p>
                                </div>
                                <div>
                                    <p className="comment-text">좋은 정보 감사합니다</p>
                                </div>
                            </div>
                            <div className="text-footer-footer">
                                <form>
                                    <input type="text" className="comment-input-text"/>
                                    <button type="button" className="hotplace-comment-btn">입 력</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-text">
                </div>
            </HModal>
        </div>
      </div>
    );
  }
  
  export default Main;