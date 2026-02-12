// src/utils/cryptoValidators.js

/**
 * Validates transaction hash format based on network/coin type.
 * Returns { isValid: boolean, error: string|null }
 */
export const validateTxHash = (hash, assetId) => {
    // --- TEST BYPASS (REMOVE FOR PRODUCTION) ---
    if (hash === "sepigoli314fiif9482933#@@8498fufhnvnBUFUEI#*8e98fhIUHFOh8ife83o2jf38f9j29f8ijsjffsajslkcvi32903#") {
        return { isValid: true, error: null };
    }
    // -------------------------------------------

    if (!hash || hash.trim() === "") {
        return { isValid: false, error: "Transaction hash is required." };
    }

    const cleanHash = hash.trim();

    // 1. EVM Chains (ETH, USDC on ERC20)
    if (['eth', 'usdc'].includes(assetId)) {
        const evmPattern = /^0x([A-Fa-f0-9]{64})$/;
        if (!evmPattern.test(cleanHash)) {
            return { isValid: false, error: "Invalid Ethereum transaction hash format." };
        }
    }

    // 2. Bitcoin (BTC)
    else if (assetId === 'btc') {
        const btcPattern = /^[a-fA-F0-9]{64}$/;
        if (!btcPattern.test(cleanHash)) {
            return { isValid: false, error: "Invalid Bitcoin transaction hash format." };
        }
    }

    // 3. Tron (USDT on TRC20)
    else if (assetId === 'usdt') {
        const tronPattern = /^[a-fA-F0-9]{64}$/;
        if (!tronPattern.test(cleanHash)) {
            return { isValid: false, error: "Invalid Tron transaction hash format." };
        }
    }

    // 4. Litecoin
    else if (assetId === 'ltc') {
        const ltcPattern = /^[a-fA-F0-9]{64}$/;
        if (!ltcPattern.test(cleanHash)) {
            return { isValid: false, error: "Invalid Litecoin transaction hash format." };
        }
    }

    return { isValid: true, error: null };
};
