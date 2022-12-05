import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, selectAllEvents } from "../../features/eventsSlice";
import { selectAllConnector } from "../../features/connectorSlice";

import "./header.css";
import lighting from "../../assets/pic/btn-lighting.png";
import heart from "../../assets/pic/btn-heart.png";
import swords from "../../assets/pic/btn-swords.png";
import flags from "../../assets/pic/btn-flags.png";
import logo from "../../assets/pic/game-logo.png";
import account from "../../assets/pic/header-account.png";
import leaderboardIcon from "../../assets/pic/leader-board-icon.png";
import accountGuest from "../../assets/pic/header-account-guest.png";
import notificationIcon from "../../assets/pic/notification-icon.png";
import notificationMuteIcon from "../../assets/pic/notification-mute-icon.png";
import metamaskIcon from "../../assets/pic/logos_metamask-icon.png";
import coinbaseIcon from "../../assets/pic/coinbase-icon.png";
import walletConnectIcon from "../../assets/pic/walletconnect-icon.png";
import guestIcon from "../../assets/pic/empty-btn.png";
import WalletDetails from "../WalletDetails/WalletDetails";
import Logout from "../Logout/Logout";
import Events from "../Events/Events";
import Leaderboard from "../Leaderboard/Leaderboard";

const Header = ({ setActiveModal, isDarkMode, setIsDarkMode, balance, setIsNotification, isNotification, isAudio, setIsAudio, getUserBalance }) => {
  const [isWalletDetails, setIsWalletDetails] = useState(false);
  const [isEvents, setIsEvents] = useState(false);
  const [isLeaderboard, setIsLeaderboard] = useState(false);
  const { accounts } = useWeb3React();
  const [isLogout, setIsLogout] = useState(false);
  const [counter, setcounter] = useState(-1);
  const [openLinks, setOpenLinks] = useState(true);
  const events = useSelector(selectAllEvents)
  const connectorName = useSelector(selectAllConnector)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(()=>{
    if(!isEvents && counter < 99) setcounter(counter+1)
  },[events])

  useEffect(()=>{
    if(isEvents) setcounter(0)
  },[isEvents])
  
  const getConnectionImg = ()=>{
    switch (connectorName) {
      case 'MetaMask':
            return metamaskIcon
      case 'CoinbaseWallet':
            return coinbaseIcon
      case 'WalletConnect':
            return walletConnectIcon
      case 'Network':
            return guestIcon
      default:
        break;
    }
  }
  return (
    <div className="header" style={location.pathname === '/'? {display: 'none'} : {}}>
      <div className={openLinks? "header-links" : "header-links header-margin-top"} onClick={()=>setOpenLinks(!openLinks)}>
        <div className="lightin-links" style={{zIndex: '1'}}><img alt="" src={guestIcon} /></div>
        <Link style={!openLinks?{top: '55px'}:{}} to="/mint">
          <img alt="" src={lighting} />
        </Link>
        <Link style={!openLinks?{top: '100px'}:{}} to="/graveyard">
          <img alt="" src={heart} />
        </Link>
        <Link style={!openLinks?{top: '145px'}:{}} to="/arena">
          <img alt="" src={swords} />
        </Link>
        <Link style={!openLinks?{top: '190px'}:{}} to="/overview">
          <img alt="" src={flags} />
        </Link>
      </div>
      <Link to="/map" className="header-logo" onClick={()=>{
        // if(isNotification)toast.info(`Player number #106 just joined the game! 🥳`)
        dispatch(addEvent({time: Date.now(), txt: `Player number #345 attacked player number #345 ! 🤯 Player number #345 attacked player number #345 ! 🤯 `}))
        dispatch(addEvent({time: Date.now(), txt: `Player number #345 attacked player number #345 ! 🤯 Player number #345 attacked player number #345 ! 🤯 `}))
        dispatch(addEvent({time: Date.now(), txt: `Player number #345 attacked player number #345 ! 🤯 Player number #345 attacked player number #345 ! 🤯 `}))
        }}>
        <img alt="" src={logo} style={{ height: "100%" }} />
      </Link>
      <div className="header-account">
        <div
          className="header-account-container"
          onClick={
            // accounts?.length
            //   ?
               () => {
                getUserBalance()
                setIsWalletDetails(!isWalletDetails)}
              // : () => setActiveModal("connectModal")
          }
        >
          <img className="header-fullscreen" alt="" src={accounts?.length ? account : accountGuest} />
          <div className="header-fullscreen" style={!accounts?.length ? { color: "white" } : {}}>
            {accounts?.length
              ? String(accounts[0]).substring(0, 6) +
                "..." +
                String(accounts[0]).substring(38)
              : `Connect Wallet`}
          </div>
          <div className="header-smallscreen"><img alt="" src={getConnectionImg()}/></div>
        </div>
        <div className="header-events" onClick={() => setIsLeaderboard(true)}>
          <img alt="" src={leaderboardIcon} />
        </div>
        <div className="header-events" onClick={() => setIsEvents(true)}>
          <img alt="" src={isNotification? notificationIcon : notificationMuteIcon} />
          {counter !== 0 && <div className="notification-unread">{counter}</div>}
        </div>
      </div>
      {isWalletDetails && (
        <div
          className="outside-click"
          onClick={() => setIsWalletDetails(false)}
        >
          <WalletDetails
            balance={balance}
            setIsWalletDetails={setIsWalletDetails}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            setIsLogout={setIsLogout}
            isAudio={isAudio}
            isNotification={isNotification}
            setIsAudio={setIsAudio}
            setIsNotification={setIsNotification}
            setIsLeaderboard={setIsLeaderboard}
            counter={counter}
            setActiveModal={setActiveModal}
          />
        </div>
      )}
          {isLeaderboard && (
            <div className="outside-click" onClick={() => setIsLeaderboard(false)}>
              <Leaderboard setIsLeaderboard={setIsLeaderboard}/>
            </div>
          )}
      {isEvents && (
        <div className="outside-click" onClick={() => setIsEvents(false)}>
          <Events closeFunc={()=>setIsEvents(false)} isDarkMode={isDarkMode} isNotification={isNotification} setIsNotification={setIsNotification} />
        </div>
      )}
      {isLogout && (
        <div className="outside-click" onClick={() => setIsLogout(false)}>
          <Logout isDarkMode={isDarkMode} setIsLogout={setIsLogout} />
        </div>
      )}
      <div></div>
    </div>
  );
};

export default Header;
