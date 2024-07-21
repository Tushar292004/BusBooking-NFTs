const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`)

  // List events
  const occasions = [
    {
      name: "Chennai to Hyderabad",
      cost: tokens(0.3),
      tickets: 45,
      date: "July 25",
      time: "6:00 PM IST",
      departure: "Chennai Central Railway Station,Chennai",
      destination: "MGBS Bus Stand,Hyderabad",
    },
    {
      name: "Chennai to Hyderabad",
      cost: tokens(0.4),
      tickets: 45,
      date: "July 25",
      time: "8:00 PM IST",
      departure: "Sathyabama University, Chennai",
      destination: "MGBS Bus Stand, Hyderabad"
    },
    {
      name: "Chennai to Hyderabad",
      cost: tokens(0.35),
      tickets: 45,
      date: "July 25",
      time: "9:00 PM IST",
      departure: "Navalur Signal, Chennai",
      destination: "MGBS Bus Stand, Hyderabad"
    },
    {
      name: "Chennai to Hyderabad",
      cost: tokens(0.44),
      tickets: 1,
      date: "July 25",
      time: "10:00 PM IST",
      departure: "Egmore, Chennai",
      destination: "MGBS Bus Stand, Hyderabad"
    },
    {
      name: "Hyderabad to Chennai",
      cost: tokens(0.44),
      tickets: 1,
      date: "July 26",
      time: "6:00 PM IST",
      // duration: "12h",
      departure: "MGBS Bus Stand,Hyderabad",
      destination: "Madhavaram,Chennai"
    },
    {
      name: "Hyderabad to Chennai",
      cost: tokens(0.44),
      tickets: 45,
      date: "July 26",
      time: "7:00 PM IST",
      // duration: "12h",
      departure: "Secunderabad Railway Station,Hyderabad",
      destination: "Koyambedu,Chennai"
    },
    {
      name: "Hyderabad to Chennai",
      cost: tokens(0.44),
      tickets: 45,
      date: "July 26",
      time: "8:00 PM IST",
      // duration: "12h",
      departure: "Kukatpally,Hyderabad",
      destination: "Padi Bridge,Chennai"
    },
    {
      name: "Hyderabad to Chennai",
      cost: tokens(0.44),
      tickets: 45,
      date: "July 26",
      time: "9:00 PM IST",
      // duration: "12h",
      departure: "JNTU,Hyderabad",
      destination: "Red Hills,Chennai"
    },
    {
      name: "Hyderabad to Chennai",
      cost: tokens(0.44),
      tickets: 30,
      date: "July 26",
      time: "10:00 PM IST",
      // duration: "12h",
      departure: "Ramoji Filim City,Hyderabad",
      destination: "RMK College,Chennai"
    },
    {
      name: "Chennai to Banglore",
      cost: tokens(0.33),
      tickets: 1,
      date: "July 25",
      time: "6:00 PM IST",
      departure: "Madhavaram,Chennai",
      destination: "Hosur,Banglore"
    },
    {
      name: "Chennai to Banglore",
      cost: tokens(0.33),
      tickets: 45,
      date: "July 25",
      time: "7:00 PM IST",
      departure: "Koyambedu,Chennai",
      destination: "Attibele Toll Gate,Banglore"
    },
    {
      name: "Chennai to Banglore",
      cost: tokens(0.33),
      tickets: 45,
      date: "July 25",
      time: "8:00 PM IST",
      departure: "Sathyabama University,Chennai",
      destination: "Electronic City,Banglore"
    },
    {
      name: "Chennai to Banglore",
      cost: tokens(0.33),
      tickets: 45,
      date: "July 25",
      time: "9:00 PM IST",
      departure: "Navalur Signal,Chennai",
      destination: "Slik Board,Banglore"
    },
    {
      name: "Chennai to Banglore",
      cost: tokens(0.33),
      tickets: 45,
      date: "July 25",
      time: "10:00 PM IST",
      departure: "Egmore,Chennai",
      destination: "Majestic,Banglore"
    },
    {
      name: "Banglore to Chennai",
      cost: tokens(0.33),
      tickets: 45,
      date: "July 26",
      time: "6:00 PM IST",
      departure: " Hosur,Banglore",
      destination: "Madhavaram,Chennai"
    },
    {
      name: "Banglore to Chennai",
      cost: tokens(0.33),
      tickets: 45,
      date: "July 26",
      time: "7:00 PM IST",
      departure: "Attibele Toll Gate,Banglore",
      destination: "Koyambedu,Chennai"
    },
    {
      name: "Banglore to Chennai",
      cost: tokens(0.33),
      tickets: 45,
      date: "July 26",
      time: "8:00 PM IST",
      departure: "Electronic City,Banglore",
      destination: " Sathyabama University,Chennai"
    },
    {
      name: "Banglore to Chennai",
      cost: tokens(0.33),
      tickets: 45,
      date: "July 26",
      time: "9:00 PM IST",
      departure: " Slik Board,Banglore",
      destination: "Navalur Signal,Chennai"
    },
    {
      name: "Banglore to Chennai",
      cost: tokens(0.33),
      tickets: 45,
      date: "July 26",
      time: "10:00 PM IST",
      departure: " Majestic,Banglore",
      destination: "Egmore,Chennai"
    },
    {
      name: "Chennai to Coimbatore",
      cost: tokens(0.5),
      tickets: 45,
      date: "July 25",
      time: "6:00 PM IST",
      departure: "Madhavaram,Chennai",
      destination: "Avinashi Byepass,Coimbatore"
    },
    {
      name: "Chennai to Coimbatore",
      cost: tokens(0.5),
      tickets: 45,
      date: "July 25",
      time: "7:00 PM IST",
      departure: "Koyambedu,Chennai",
      destination: "karumathampathi,coimbatore"
    },
    {
      name: "Chennai to Coimbatore",
      cost: tokens(0.5),
      tickets: 45,
      date: "July 25",
      time: "8:00 PM IST",
      departure: "Sathyabama University,Chennai",
      destination: "KMCH,Coimbatore"
    },
    {
      name: "Chennai to Coimbatore",
      cost: tokens(0.5),
      tickets: 45,
      date: "July 25",
      time: "9:00 PM IST",
      departure: "Navalur Signal,Chennai",
      destination: "Cbe Omni Bus Stand"
    },
    {
      name: "Chennai to Coimbatore",
      cost: tokens(0.5),
      tickets: 45,
      date: "July 25",
      time: "10:00 PM IST",
      departure: "Egmore,Chennai",
      destination: "Gandhipuram,coimbatore"
    },{
      name: "Coimbatore To Chennai",
      cost: tokens(0.5),
      tickets: 45,
      date: "July 26",
      time: "6:00 PM IST",
      departure: "Avinashi Byepass,Coimbatore",
      destination: " Madhavaram,Chennai "
    },
    {
      name: "Coimbatore To Chennai",
      cost: tokens(0.5),
      tickets: 45,
      date: "July 26",
      time: "7:00 PM IST",
      departure: "karumathampathi,coimbatore",
      destination: "Koyambedu,Chennai "
    },
    {
      name: "Coimbatore To Chennai",
      cost: tokens(0.5),
      tickets: 45,
      date: "July 26",
      time: "8:00 PM IST",
      departure: "KMCH,Coimbatore",
      destination: "Sathyabama University,Chennai"
    },
    {
      name: "Coimbatore To Chennai",
      cost: tokens(0.5),
      tickets: 45,
      date: "July 26",
      time: "9:00 PM IST",
      departure: "Cbe Omni Bus Stand",
      destination: "Navalur Signal,ChennaiCbe Omni Bus Stand"
    },
    {
      name: "Coimbatore To Chennai",
      cost: tokens(0.5),
      tickets: 45,
      date: "July 26",
      time: "10:00 PM IST",
      departure: "Gandhipuram,coimbatore",
      destination: "Egmore,Chennai"
    }

    // ,
    // {
    //   name: "ETH Tokyo",
    //   cost: tokens(1),
    //   tickets: 125,
    //   date: "Jun 2",
    //   time: "1:00PM JST",
    //   location: "Tokyo, Japan"
    // },
    // {
    //   name: "ETH Privacy Hackathon",
    //   cost: tokens(0.25),
    //   tickets: 200,
    //   date: "Jun 9",
    //   time: "10:00AM TRT",
    //   location: "Turkey, Istanbul"
    // },
    // {
    //   name: "Dallas Mavericks vs. San Antonio Spurs",
    //   cost: tokens(5),
    //   tickets: 0,
    //   date: "Jun 11",
    //   time: "2:30PM CST",
    //   location: "American Airlines Center - Dallas, TX"
    // },
    // {
    //   name: "ETH Global Toronto",
    //   cost: tokens(1.5),
    //   tickets: 125,
    //   date: "Jun 23",
    //   time: "11:00AM EST",
    //   location: "Toronto, Canada"
    // }
  ]

  for (var i = 0; i < occasions.length; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].departure,
      occasions[i].destination
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});