import "./view.css";

const View = () => {
  return (
    <div className="view-main">
      <section>
        <header>
          <div className="view-head-cate">카테고리명</div>
          <div className="view-content-wrap">
            <div className="view-content-head">
              <h3 className="view-content-title">제목1</h3>
              <div className="view-content-info">
                <span className="view-content-nickname">ㅇㅇ</span>
                <span className="view-content-date">2023-04-12</span>
              </div>
              <div className="view-content-etc">
                <span className="view-content-count">조회 13</span>
                <span className="view-content-reply">추천 9</span>
              </div>
            </div>
            <div className="view-content-body">
              <div className="view-content-write">
                <p>가나다라</p>
              </div>
            </div>
          </div>
        </header>
      </section>
    </div>
  );
};

export default View;
