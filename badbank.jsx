// cd /c/rcl/rcl/'emeritus mit'/'JSX React'/bad-bank-first
// http-server -c-1

const { useState, useEffect } = React;

function randBalance(min, max) {
  let value = Math.round(Math.random() * (max - min)) + min;
  //console.log(value);
  return value;
}

function Balance({ balance }) {
  return (
    <tr><td>
      Your Balance {' '}
      <div className="bold">
        $ {balance}
      </div>
    </td></tr>
  );
}

function Operation({ changeOperation, op, setOp }) {
  return (
    <tr><td>
      I Want to {op} {' '}
      <button onClick={changeOperation}>Switch</button>    
    </td></tr>
  );
}

function Amount({ process }) {
  return (
    <tr><td>
      <input id="amount" type="text" size="2px"></input>
      {' '} Amount {' '}
      <button onClick={process} >Process</button>
    </td></tr>
  );
}

function Bank() {
  const [login, setLogin] = useState(false);
  const [balance, setBalance] = useState(0);
  const [op, setOp] = useState('Deposit');

  useEffect(
    () => setBalance(randBalance(500, 5000)),
    []
  );

  function changeOperation() {
    console.log('Operation Switched');
    if (op == 'Deposit') {
      setOp('Withdraw');
    } else {
      setOp('Deposit')
    }
  }

  function process() {
    let money = Number(document.getElementById('amount').value);
    let currentBalance = balance;
    console.log(`Balance ${currentBalance}. Amount to process: ${money}`);
    if (op == 'Deposit') {
      setBalance(currentBalance + money);
    } else {
      if (currentBalance >= money) setBalance(currentBalance - money);
    }
  }

  return (
    <div>
      <table>
        <th>Bad Bank First Exercise</th>
        <tr><td>
          <button onClick={() => {
              setLogin(true);
              console.log('Successfully Logged in');
            }}>Login
          </button>
        </td></tr>
        {login && <Balance balance={balance} />}
        {login && <Operation changeOperation={changeOperation} op={op} setOp={setOp} />}
        {login && <Amount process={process} />}
      </table>
      
    </div>
  );
}

ReactDOM.render(<Bank />, document.getElementById('root'));