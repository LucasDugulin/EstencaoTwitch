import React, { useEffect, useState } from 'react';

import './UserList.css';

const User = ({ user }) => {
  return (
    <div>
      <a href={user.url} target="_blank">
        <div className="userCard">
          <img src={user.logo} className="logoMembros"></img>
          <div className="textMembros">
            <p className="nomesMembros">{user.display_name}</p>
            <p className="jogando">Jogando:{user.game}</p>
            <p className="tituloLive">{user.status}</p>
          </div>
          {user.stream && 'live'}
        </div>
      </a>
    </div>
  );
};

const UserList = ({ users = [] }) => {
  const [detailedUsers, setDetailedUsers] = useState([]);

  useEffect(() => {
    if (users.length > 0) {
      Promise.all(
        users.map(async (user) => {
          const { stream } = await fetch(
            `https://api.twitch.tv/kraken/streams/${user._id}`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/vnd.twitchtv.v5+json',
                'Client-ID': 'gp762nuuoqcoxypju8c569th9wz7q5',
              },
            }
          ).then((res) => res.json());

          return { ...user, stream };
        })
      ).then((usersWithStream) => setDetailedUsers(usersWithStream));
    }
  }, [users]);

  const filtroUser = detailedUsers
    .sort((a, b) => {
      const dateA = new Date(a.updated_at),
        dateB = new Date(b.updated_at);
      return dateB - dateA;
    })
    .filter((user) => !user.stream);

  const userSortByLive = detailedUsers.filter((user) => !!user.stream);

  return [...userSortByLive, ...filtroUser].map((user) => (
    <User key={user.name} user={user} />
  ));
};

export default UserList;
