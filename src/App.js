import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Sort from './components/Sort'
import Card from './components/Card'
import SeatChart from './components/SeatChart'

// ABIs
import BusBooking from './abis/BusBooking.json'

// Config
import config from './config.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  const [busBooking, setBusBooking] = useState(null)
  const [occasions, setOccasions] = useState([])

  const [occasion, setOccasion] = useState({})
  const [toggle, setToggle] = useState(false)

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    const address  = config[network.chainId].BusBooking.address
    // console.log(address);
    const busBooking = new ethers.Contract(address, BusBooking, provider)
    setBusBooking(busBooking)

    const totalOccasions = await busBooking.totalOccasions()
    // console.log( {totalOccasions: totalOccasions.toString()} )
    const occasions = []

    for (var i = 1; i <= totalOccasions; i++) {
      const occasion = await busBooking.getOccasion(i)
      occasions.push(occasion)
    }

    setOccasions(occasions)
    // console.log(occasions);

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account)
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [ occasions, occasion, toggle])

  const filteredOccasions = occasions.filter((occasion) => {
    return (
      (from === '' || occasion.start === from) &&
      (to === '' || occasion.end === to) &&
      (date === null || new Date(occasion.date).toDateString() === new Date(date).toDateString())
    );
  });

  return (
    <div>
      <header>
        <Navigation account={account} setAccount={setAccount} />

        <h2 className="header__title"><strong>Bus</strong> Tickets</h2>
      </header>

      <Sort setFrom={setFrom} setTo={setTo} setDate={setDate} />

      <div className='cards'>
      {filteredOccasions.map((occasion, index) => (
          <Card
            occasion={occasion}
            id={index + 1}
            busBooking={busBooking}
            provider={provider}
            account={account}
            toggle={toggle}
            setToggle={setToggle}
            setOccasion={setOccasion}
            key={index}
          />
        ))}
      </div>

      {toggle && (
        <SeatChart
          occasion={occasion}
          busBooking={busBooking}
          provider={provider}
          setToggle={setToggle}
        />
      )}
    </div>
  );
}
export default App;