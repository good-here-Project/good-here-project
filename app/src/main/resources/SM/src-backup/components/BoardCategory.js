const Category = ({ selectedBoardType, setSelectedBoardType }) => {
  const boardTypes = [
    { id: null, name: "전체" },
    { id: 1, name: "자유" },
    { id: 2, name: "Q&A" },
    { id: 3, name: "맛집&카페" },
    { id: 4, name: "여행 정보" },
    { id: 5, name: "여행 동행" },
  ];

  return (
    <ul className="board-list">
      {boardTypes.map((boardType) => (
        <li
          key={boardType.id}
          onClick={() => setSelectedBoardType(boardType.id)}
          className={selectedBoardType === boardType.id ? "active" : ""}
        >
          {boardType.name}
        </li>
      ))}
    </ul>
  );
};

export default Category;
