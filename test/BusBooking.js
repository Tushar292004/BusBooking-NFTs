const { expect } = require("chai")

const NAME = "BusBooking"
const SYMBOL = "BB"

const OCCASION_NAME = "ETH Texas"
const OCCASION_START = "ETH Texas START"
const OCCASION_END = "ETH Texas END"
const OCCASION_COST = ethers.utils.parseUnits('1', 'ether')
const OCCASION_MAX_TICKETS = 45
const OCCASION_DATE = "Apr 27"
const OCCASION_TIME = "10:00AM CST"
const OCCASION_DEPARTURE = "Austin, Texas"
const OCCASION_DESTINATION = "Chicago"

describe("BusBooking", () => {
  let busBooking
  let deployer, buyer

  beforeEach(async () => {
    // Setup accounts
    [deployer, buyer] = await ethers.getSigners()

    // Deploy contract
    const BusBooking = await ethers.getContractFactory("BusBooking")
    busBooking = await BusBooking.deploy(NAME, SYMBOL)

    const transaction = await busBooking.connect(deployer).list(
      OCCASION_NAME,
      OCCASION_START,
      OCCASION_END,
      OCCASION_COST,
      OCCASION_MAX_TICKETS,
      OCCASION_DATE,
      OCCASION_TIME,
      OCCASION_DEPARTURE,
      OCCASION_DESTINATION
    )

    //wait for the transaction to include in a block to test 
    await transaction.wait()
  })

  describe("Deployment", () => {
    it("Sets the name", async () => {
      expect(await busBooking.name()).to.equal(NAME)
    })

    it("Sets the symbol", async () => {
      expect(await busBooking.symbol()).to.equal(SYMBOL)
    })

    // checking the owner in testcase
    it("Sets the owner", async () => {
      expect(await busBooking.owner()).to.equal(deployer.address)
    })
  })

  describe("Occasions", () => {
    it('Returns occasions attributes', async () => {
      const occasion = await busBooking.getOccasion(1)
      expect(occasion.id).to.be.equal(1)
      expect(occasion.name).to.be.equal(OCCASION_NAME)
      expect(occasion.start).to.be.equal(OCCASION_START)
      expect(occasion.end).to.be.equal(OCCASION_END)
      expect(occasion.cost).to.be.equal(OCCASION_COST)
      expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS)
      expect(occasion.date).to.be.equal(OCCASION_DATE)
      expect(occasion.time).to.be.equal(OCCASION_TIME)
      expect(occasion.departure).to.be.equal(OCCASION_DEPARTURE)
      expect(occasion.destination).to.be.equal(OCCASION_DESTINATION)
    })

    it('Updates occasions count', async () => {
      const totalOccasions = await busBooking.totalOccasions()
      expect(totalOccasions).to.be.equal(1)
    })
  })

  describe("Minting", () => {
    const ID = 1
    const SEAT = 25
    const AMOUNT = ethers.utils.parseUnits('1', 'ether')

    beforeEach(async () => {
      const transaction = await busBooking.connect(buyer).mint(ID, SEAT, { value: AMOUNT })
      await transaction.wait()
    })

    it('Updates ticket count', async () => {
      const occasion = await busBooking.getOccasion(1)
      expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS - 1)
    })

    it('Updates buying status', async () => {
      const status = await busBooking.hasBought(ID, buyer.address)
      expect(status).to.be.equal(true)
    })

    it('Updates seat status', async () => {
      const owner = await busBooking.seatTaken(ID, SEAT)
      expect(owner).to.equal(buyer.address)
    })

    it('Updates overall seating status', async () => {
      const seats = await busBooking.getSeatsTaken(ID)
      expect(seats.length).to.equal(1)
      expect(seats[0]).to.equal(SEAT)
    })

    it('Updates the contract balance', async () => {
      const balance = await ethers.provider.getBalance(busBooking.address)
      expect(balance).to.be.equal(AMOUNT)
    })
  })

  describe("Withdrawing", () => {
    const ID = 1
    const SEAT = 25
    const AMOUNT = ethers.utils.parseUnits("1", 'ether')
    let balanceBefore

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      let transaction = await busBooking.connect(buyer).mint(ID, SEAT, { value: AMOUNT })
      await transaction.wait()

      transaction = await busBooking.connect(deployer).withdraw()
      await transaction.wait()
    })

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it('Updates the contract balance', async () => {
      const balance = await ethers.provider.getBalance(busBooking.address)
      expect(balance).to.equal(0)
    })
  })
})
