import { createClient, WagmiConfig, chain, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import Distribute from "./Distribute";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.ropsten],
  [publicProvider()]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

function App() {
  return (
    <WagmiConfig client={client}>
      <Distribute></Distribute>
    </WagmiConfig>
  );
}

export default App;
