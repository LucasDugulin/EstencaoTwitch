import React, { useState, useEffect } from 'react';
import './Panel.css';

import Footer from '../../components/Footer';
import UserList from '../../components/UserList';

function Panel() {
  const [time, setTime] = useState({});

  useEffect(() => {
    fetch('https://api.twitch.tv/kraken/teams/osguerreiros', {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'gp762nuuoqcoxypju8c569th9wz7q5',
      },
    })
      .then((res) => res.json())
      .then((res) => setTime(res));
  }, []);

  return (
    <div className="App">
      <div className="containerHeader">
        <a href="https://www.twitch.tv/team/osguerreiros" target="_blank">
          <div className="laranja">
            {/*  
            <img src={Logo} className="logo"></img>
            <p className="titulo">Os Guerreiros</p>
            */}
          </div>
        </a>
      </div>
      <div className="geral">
        <UserList users={time.users} />
      </div>
      <Footer />
    </div>
  );
}

export default Panel;
