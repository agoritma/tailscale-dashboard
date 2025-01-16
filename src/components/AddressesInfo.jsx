const AddressesInfo = ({ tailscaleStatus }) => {
    return (
        <section id="device-address-info">
          <h3>Adresses</h3>
          <table>
            <tbody>
              <tr>
                <td>Tailsclae IPv4</td>
                <td>{tailscaleStatus.Self.TailscaleIPs[0]}</td>
              </tr>
              <tr>
                <td>Tailscale IPv6</td>
                <td>{tailscaleStatus.Self.TailscaleIPs[1]}</td>
              </tr>
              <tr>
                <td>Short Domain</td>
                <td>{tailscaleStatus.Self["DNSName"].split(".")[0]}</td>
              </tr>
              <tr>
                <td>Full Domain</td>
                <td>{tailscaleStatus.Self["DNSName"]}</td>
              </tr>
            </tbody>
          </table>
        </section>
    )
}

export default AddressesInfo