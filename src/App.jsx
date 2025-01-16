import './App.css'
import TailscaleIcon from './assets/svgs/TailscaleIcon'
import WindowsIcon from './assets/svgs/WindowsIcon'
import LinuxIcon from './assets/svgs/LinuxIcon'
import AndroidIcon from './assets/svgs/AndroidIcon'
import ServerIcon from './assets/svgs/ServerIcon'
import GeneralInfo from './components/GeneralInfo'
import AddressesInfo from './components/AddressesInfo'
import ErrorPage from './components/ErrorPage'
import { useState, useEffect } from 'react'

function App() {
  const [tailscaleStatus, setTailscaleStatus] = useState(false)
  const [vpnStatus, setVpnStatus] = useState(false)

  const fetchTailscaleStatus = async () => {
    await fetch(`${import.meta.env.VITE_APP_API_DOMAIN}/api/tailscale/status`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'access_token': import.meta.env.VITE_APP_ACCESS_TOKEN
      }
    }).then(response => response.json()).then(data => {
      setTailscaleStatus(data)
    }).catch(error => {
      setTailscaleStatus('error')
    })
  }

  const handleVpnButton = async () => {
    let vpnState = ''
    if (tailscaleStatus.BackendState === 'Running') {
      vpnState = 'down'
    } else {
      vpnState = 'up'
    }

    await fetch(`${import.meta.env.VITE_APP_API_DOMAIN}/api/tailscale/${vpnState}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'access_token': import.meta.env.VITE_APP_ACCESS_TOKEN
      }
    }).then(response => response.json()).then(data => {
      setVpnStatus(!vpnStatus)
      fetchTailscaleStatus()
    }).catch(error => {
      setTailscaleStatus('error')
    })
  }

  useEffect(() => {
    fetchTailscaleStatus()
    setVpnStatus(tailscaleStatus.BackendState === 'Running' ? true : false)
  }, [])

  const deviceIcon = () => {
    if (tailscaleStatus.Self.OS === 'windows') {
      return <WindowsIcon />
    } else if (tailscaleStatus.Self.OS === 'linux') {
      return <LinuxIcon />
    } else if (tailscaleStatus.Self.OS === 'android') {
      return <AndroidIcon />
    } else {
      return <ServerIcon />
    }
  }

  if (tailscaleStatus === false) {
    return <div className="custom-loader"></div>
  } else if (tailscaleStatus === 'error') {
    return <ErrorPage />
  } else {
    return (
      <main>
        <header>
          <section id="account">
            <TailscaleIcon />
            <h1 id='account-email'>{tailscaleStatus.CurrentTailnet.Name}</h1>
          </section>
          <section id="tailscale-status">
            <button onClick={handleVpnButton} id="vpn-button" className={tailscaleStatus.BackendState === 'Running' ? 'deactivate' : ''}>
              {tailscaleStatus.BackendState === 'Running' ? 'Disconnect' : 'Connect'}
            </button>
          </section>
        </header>
  
        <section id="self-information">
          <h2>Device Details</h2>
          <section id="device-status">
            <section>
              <div className="logo">
                {deviceIcon()}
              </div>
              <div className="device-info">
                <h3 id="device-name">{tailscaleStatus.Self.HostName}</h3>
                <div id="connection-status">
                  <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
                    <circle r="5" cx="5" cy="5" fill={tailscaleStatus.BackendState === 'Running' ? "#16C47F" : "grey"} />
                  </svg>
                  <span>{tailscaleStatus.BackendState === 'Running' ? "Connected" : "Disconnected"}</span>
                </div>
              </div>
            </section>
            <p id="device-ip">{tailscaleStatus.Self.TailscaleIPs[0]}</p>
          </section>
          {tailscaleStatus.BackendState === 'Running' ? (
            <>
            <GeneralInfo tailscaleStatus={tailscaleStatus}/>
            <AddressesInfo tailscaleStatus={tailscaleStatus}/>
            </>
          ) : ''} 
        </section>
      </main>
    )
  }
}

export default App
