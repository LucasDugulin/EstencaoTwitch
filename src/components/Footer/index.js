import React from "react";

import "./Footer.css";
import discord from "../../assets/img/discord.svg";
import form from "../../assets/img/form.svg";
import site from "../../assets/img/adminsite.svg";

const Footer = () => (
  <div style={{ display: "flex" }}>
    <div className="rodape">
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <a href="https://discord.com/invite/BXSBeRS" target="_blank">
          <img src={discord} className="discord"></img>
          <p className="DiscordT">Discord</p>
        </a>

        <a href="https://osguerreiros.com/junteseaequipe/" target="_blank">
          <img src={form} className="form"></img>
          <p className="formT">Faça Parte</p>
        </a>

        <a href="https://osguerreiros.com/" target="_blank">
          <img src={site} className="site"></img>
          <p className="siteT">Site</p>
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
