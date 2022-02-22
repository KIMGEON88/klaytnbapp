import logo from "./logo.svg";
import "./App.css";
import { Buffer } from "buffer";

import Caver from "caver-js";

const COUNT_CONTRACT_ADDRESS = "0x016c733A221cf7abEed8f44c2CbFb9754CA67680";
const ACCESS_KEY_ID = "KASKE2XFR8FDXR6N4LX7NJRM"; // 인증 ID
const SECRET_KEY_ID = "gLAz5nMS1Zz1WpFAEGNgiqLHZ8utm_1qYoHaDkvA"; // 인증 PW
const CHAIN_ID = "1001"; // MAINNET 8217 TESTNET 1001
const COUNT_ABI = `[ { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]`;

// 1. 스마트 컨트렉트 배포 주소 파악(가져오기)
// 2. Caver.js 이용해서 스마트 컨트랙트 연동하기
// 3. 가져온 스마트 컨트랙트 실행 결과를 앱에 표현하기.

const option = {
  headers: [
    {
      name: "Authorization",
      value:
        "Basic " +
        Buffer.from(ACCESS_KEY_ID + ":" + SECRET_KEY_ID).toString("base64"), // Buffer객체를 통해 Binary -> base64로 변환.
    },
    {
      name: "x-chain-id",
      value: CHAIN_ID,
    },
  ],
};

const caver = new Caver(
  new Caver.providers.HttpProvider(
    "https://node-api.klaytnapi.com/v1/klaytn",
    option
  )
);

const CountContract = new caver.contract(
  JSON.parse(COUNT_ABI),
  COUNT_CONTRACT_ADDRESS
);

const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(_count);
};

const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(
      // 읽을 수 있는 KLAY 단위로 변경
      caver.utils.hexToNumberString(response)
    );
    console.log(`balance:${balance}`);
    return balance;
  });
};

// 스마트 컨트랙트 실행. Buffer is not defined 뜸.
// 스마트 컨트랙트를 이렇게 개인키를 입력하고 받는 형식은 안전하지 않음.
// Klaytn API를 사용해서 유저들이 쉽게 Bapp을 사용하게 할 수 있음.
const setCount = async (newCount) => {
  // 사용할 account 설정
  try {
    const privatekey =
      "0x71222e7af3bd5b2f8bd14d0a9b81f1f994f49f1b116abaaf3ab390dc4a3a12cb";
    const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
    caver.wallet.add(deployer);
    // 스마트 컨트랙트 실행 트랙젠션 날리기
    // 결과 확인
    const receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address, // address,
      gas: "0x4bfd200", // 스마트 컨트랙트 실행에 필요한 만큼만 소모되고 다시 되돌아옴.
    });
    console.log(receipt);
  } catch (e) {
    console.log(`ERROR_SET_COUNT${e}`);
  }
};

function App() {
  readCount();
  getBalance("0x33c602847d61543729fb37ab240cf04def3d7c0c");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          title={"카운트 변경"}
          style={{ width: "50px", height: "50px" }}
          onClick={() => {
            setCount(100);
          }}
        ></button>
        <p>
          KLAYTN <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React act act
        </a>
      </header>
    </div>
  );
}

export default App;
