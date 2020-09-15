import React, { useEffect } from "react";

import "./UserList.css";

const User = ({ user }) => {
  const [userLive, setUserLive] = useState();

  useEffect(() => {
    if (!userLive) {
      fetch(`https://api.twitch.tv/kraken/streams/${user.id}`, {
        method: "GET",
        headers: {
          Accept: "application/vnd.twitchtv.v5+json",
          "Client-ID": "gp762nuuoqcoxypju8c569th9wz7q5",
        },
      })
        .then((res) => res.json())
        .then((res) => setUserLive(res));
    }
  }, [user.id]);

  console.log(userLive);

  return (
    <div>
      {" "}
      <a href={user.url} target="_blank">
        <div className="userCard">
          <img src={user.logo} className="logoMembros"></img>
          <div className="textMembros">
            <p className="nomesMembros">{user.display_name}</p>
            <p className="jogando">Jogando:{user.game}</p>
            <p className="tituloLive">{user.status}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

const UserList = () => <p>test</p>;

const UserList = ({ users = [] }) => {
  console.log(users);

  const filtroUser = users.sort((a, b) => {
    const dateA = new Date(a.updated_at),
      dateB = new Date(b.updated_at);
    return dateB - dateA;
  });

  return <p>test</p>;

  return filtroUser.map((user) => <User key={user.name} user={user} />);
};

export default UserList;
