import ServerIcon from "../assets/svgs/ServerIcon"
import TailscaleIcon from "../assets/svgs/TailscaleIcon"

const ErrorPage = () => {
    return (
        <main>
        <header>
          <section id="account">
            <TailscaleIcon />
            <h1 id='account-email'></h1>
          </section>
          <section id="tailscale-status">
            <button id="vpn-status" className={'disabled'}>
              Server Down
            </button>
          </section>
        </header>
  
        <section id="self-information">
          <h2>Device Details</h2>
          <section id="device-status">
            <section>
              <div className="logo">
                <ServerIcon />
              </div>
              <div className="device-info">
                <h3 id="device-name">{'Please Check your server'}</h3>
                <div id="connection-status">
                  <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
                    <circle r="5" cx="5" cy="5" fill={"red"} />
                  </svg>
                  <span>Server Down</span>
                </div>
              </div>
            </section>
          </section>
        </section>
      </main>
    )
}

export default ErrorPage