import React, { useState, useEffect } from "react";
import axios from "axios";

function MyPage() {
  const [user, setUser] = useState({});
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost/web/auth/user")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .then((result) => {
        if (result.status === "success") {
          setUser(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    setEditProfile(true);
  };

  const handleSaveProfile = () => {
    axios
      .put(`http://localhost/web/members/${user.no}`, user)
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        if (result.status === "success") {
          setEditProfile(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mypage-container">
    <h1 className="mypage-title">My Page</h1>
    {editProfile ? (
      <div className="mypage-edit-profile">
        <label>
          프로필 사진:
          <input
            type="file"
            name="profileImg"
            value={user.profileImg}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          닉네임:
          <input
            type="text"
            name="nickname"
            value={user.nickname}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          소개:
          <textarea
            name="introduce"
            value={user.introduce}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <br />
        <button className="mypage-save-button" onClick={handleSaveProfile}>
          저장
        </button>
      </div>
    ) : (
      <div className="mypage-profile">
        <img
          className="mypage-profile-img"
          src={user.profileImg}
          alt="프로필 사진"
        />
        <h2 className="mypage-nickname">{user.nickname}</h2>
        <p className="mypage-introduce">{user.introduce}</p>
        <button className="mypage-edit-button" onClick={handleEditProfile}>
          프로필 수정
        </button>
      </div>
    )}
  </div>
  );
}

export default MyPage;
