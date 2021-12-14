import React from 'react';

export default function(props: any) {
    const { contract, address } = props;

    const [
        tokenStakedAmount,
        setTokenStakedAmount
    ] = React.useState(0);
    const tokenAmountRef = React.useRef<any>(tokenStakedAmount);


    const changeTokenAmount = (event: React.ChangeEvent<HTMLInputElement>) => setTokenStakedAmount(
        +event.currentTarget.value.replace(/[^0-9]+/g, "")
    );

    const mint = async () => {
        contract.methods.mint(tokenStakedAmount).send({from: address}).then(console.log)
    }

    return (
        <>
            <input type="text" ref={tokenAmountRef} onChange={changeTokenAmount} />
            <button onClick={mint}>Mint</button>
        </>
    );
}


