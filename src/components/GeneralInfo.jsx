const GeneralInfo = ({ tailscaleStatus }) => {
    return (
        <section id="device-general-info">
          <h3>General</h3>
          <table>
            <tbody>
              <tr>
                <td>Managed by</td>
                <td>{tailscaleStatus.User[tailscaleStatus.Self.UserID].DisplayName}</td>
              </tr>
              <tr>
                <td>OS</td>
                <td>{tailscaleStatus.Self.OS}</td>
              </tr>
              <tr>
                <td>Tailscale version</td>
                <td>{tailscaleStatus.Version}</td>
              </tr>
              <tr>
                <td>Node ID</td>
                <td>{tailscaleStatus.Self.ID}</td>
              </tr>
              <tr>
                <td>Node Key</td>
                <td>{tailscaleStatus.Self.PublicKey}</td>
              </tr>
              <tr>
                <td>Created</td>
                <td>{tailscaleStatus.Self.Created}</td>
              </tr>
              <tr>
                <td>Key Expiry</td>
                <td>{tailscaleStatus.Self.KeyExpiry}</td>
              </tr>
            </tbody>
          </table>
        </section>
    )
}

export default GeneralInfo