import { useAccount, useConnect, useContractWrite } from "wagmi";
import { ethers } from "ethers";
import { useCallback, useState } from "react";

const abi = [
  {
    constant: false,
    inputs: [
      { name: "recipient1", type: "address" },
      { name: "recipient2", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "tokenAddress", type: "address" },
    ],
    name: "distribute",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "recipient1", type: "address" },
      { indexed: false, name: "amount1", type: "uint256" },
      { indexed: true, name: "recipient2", type: "address" },
      { indexed: false, name: "amount2", type: "uint256" },
      { indexed: true, name: "token", type: "address" },
    ],
    name: "Distribute",
    type: "event",
  },
];

function Distribute() {
  const { connect, connectors } = useConnect();
  const { data: account } = useAccount();
  const [add1, setAdd1] = useState(
    "0x89343c970Fb8595420F4b5BDc57dFf6650353f61"
  );
  const [add2, setAdd2] = useState(
    "0x2517ea93A8Ce8e7B34419Fe8228d20fA13318e6B"
  );
  const [amount, setAmount] = useState(100);
  const [tx, setTx] = useState("");

  const { writeAsync } = useContractWrite(
    {
      addressOrName: "0xc15ed2f69eef674a6697b3a7e42beb691a7da402",
      contractInterface: abi,
    },
    "distribute"
  );

  const doDistribute = useCallback(() => {
    console.log("do");
    writeAsync({
      args: [
        add1,
        add2,
        ethers.utils.parseUnits(amount + "", 18),
        "0xfab46e002bbf0b4509813474841e0716e6730136",
      ],
    })
      .then((r) => {
        console.log(r);
        setTx(r.hash);
      })
      .catch((err) => console.log(err));
  }, [add1, add2, amount, writeAsync]);

  return (
    <div
      className="App"
      style={{
        gap: 14,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>111</h1>
      {!!account && (
        <div
          style={{
            gap: 14,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>Connected to {account.address}</div>
          <label htmlFor="">add1</label>
          <input
            type="text"
            value={add1}
            onChange={(e) => setAdd1(e.target.value)}
          />
          <label htmlFor="">add2</label>
          <input
            type="text"
            value={add2}
            onChange={(e) => setAdd2(e.target.value)}
          />
          <label htmlFor="">amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={doDistribute}>Distribute</button>
          {tx !== "" && (
            <a
              target="_blank"
              href={`https://ropsten.etherscan.io/tx/${tx}`}
              rel="noreferrer"
            >
              tx
            </a>
          )}
        </div>
      )}
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect(connector)}
        >
          {connector.name}
        </button>
      ))}
    </div>
  );
}

export default Distribute;
