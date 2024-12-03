const connectMetamask = document.getElementById('connect_metamask');
const customMessages = document.getElementById('messages');
const contractAddress = document.getElementById('contract_address');
const events = document.getElementById('events');
const listenEvents = document.getElementById('listen_events');

connectMetamask.addEventListener('click', async () => {
    enableMetamask();
})

listenEvents.addEventListener('click', async () => {
    listenToEvents();
})

const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "SendEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "send",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]



let accounts;
let web3;
let ethereum = window.ethereum;

async function enableMetamask() {
    if (typeof ethereum !== 'undefined') {
        try {
            accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(ethereum);
            customMessages.innerHTML = `Connected to Metamask with address: ${accounts[0]}`;
            contractAddress.removeAttribute('disabled');
        } catch(error) {
            if(error.code === 4001) {
                customMessages.innerHTML = 'You have to authorize Metamask to continue';
            } else {
                console.error(error);
                customMessages.innerHTML = 'An error occurred when trying to connect to Metamask';
            }
        }
    } else {
        customMessages.innerHTML = 'Please install Metamask';
    }
}

async function listenToEvents() {
    let contractInstance = new web3.eth.Contract(abi, contractAddress.value);
    contractInstance.events.SendEvent().on("data", (event) => {
        events.innerHTML = `New transaction from ${event.returnValues._from} to ${event.returnValues._to} with amount ${event.returnValues._amount}`
    })
}