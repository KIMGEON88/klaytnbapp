import logo from "./logo.svg";
import "./App.css";

import Caver from "caver-js";

// const COUNT_CONTRACT_ADDRESS = "0x016c733A221cf7abEed8f44c2CbFb9754CA67680";
// const ACCESS_KEY_ID = "KASKE2XFR8FDXR6N4LX7NJRM";
// const SECRET_KEY_ID = "gLAz5nMS1Zz1WpFAEGNgiqLHZ8utm_1qYoHaDkvA";
// const CHAIN_ID = "1001"; // MAINNET 8217 TESTNET 1001

// // 1. 스마트 컨트렉트 배포 주소 파악(가져오기)
// // 2. Caver.js 이용해서 스마트 컨트랙트 연동하기
// // 3. 가져온 스마트 컨트랙트 실행 결과를 앱에 표현하기.

// const option = {
//   headers: [
//     {
//       name: "Authorization",
//       value:
//         "Basic" +
//         Buffer.from(ACCESS_KEY_ID + ":" + SECRET_KEY_ID).toString("base64"),
//     },
//     {
//       name: "x-chain-id",
//       value: CHAIN_ID,
//     },
//   ],
// };

// const caver = new Caver(
//   new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn")
// );

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
