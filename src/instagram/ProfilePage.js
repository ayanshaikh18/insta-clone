import Navbar from "../components/navbar";
import styled from "styled-components";
import ProfileTop from "../components/ProfileTop";
import Highlights from "../components/Highlights";
import ProfileBottom from "../components/ProfileBottom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfile } from "../services/authService";
import Loading from "../components/Loading";

const Wrapper = styled.div`
  margin-top: 55px;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  z-index: 0;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 0% 100% 0%;
  }
`;

const ProfilePage = () => {
  const closeDropDown = () => {
    document.getElementById("dropdown").style.display = "none";
  };

  const { username } = useParams();
  const [profile, setProfile] = useState();

  useEffect(async () => {
    var data = await getProfile(username);
    const { user, following, postsCnt, posts } = data;
    if (following)
      setProfile({
        user,
        following,
        postsCnt,
        posts,
      });
    else
      setProfile({
        user,
        following,
        postsCnt,
      });
  }, []);

  return (
    <>
      <Navbar />
      <Wrapper onClick={() => closeDropDown()}>
        {profile ? (
          <>
            <div></div>
            <div>
              <ProfileTop user={profile.user} postsCnt={profile.postsCnt} />
              {/* <Highlights /> */}
              <ProfileBottom
                posts={profile.posts}
                following={profile.following}
              />
            </div>
            <div></div>
          </>
        ) : (
          <>
            <div></div>
            <Loading />
            <div></div>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default ProfilePage;
