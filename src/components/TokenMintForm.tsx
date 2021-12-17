import React from 'react';
import { useState } from 'react';

export default function (props: any) {
  const { contract, address } = props;

  const [tokenStakedAmount, setTokenStakedAmount] = React.useState(0);
  const tokenAmountRef = React.useRef<any>(tokenStakedAmount);

  const changeTokenAmount = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTokenStakedAmount(+event.currentTarget.value.replace(/[^0-9]+/g, ''));

  const mint = async () => {
    const cost = await contract.methods.cost().call();
    contract.methods
      .mint(tokenStakedAmount)
      .send({ from: address, value: cost * tokenStakedAmount })
      .then(console.log);
  };

  return (
    <div className="mint_form">
      <div className="form">
        <input
          id="inp_text"
          className="main__input"
          type="text"
          autoComplete="off"
          required
          ref={tokenAmountRef}
          onChange={changeTokenAmount}
        />
        <label htmlFor="#inp_text" className="label_name">
          <span className="content_name">Enter the amount</span>
        </label>
      </div>
      <button className="main__btn_mint" onClick={mint}>
        Mint
      </button>
    </div>
  );
}
