import { type SkyProtocolValue } from "../lib/sky-protocol-value";

const SKY_INFO_SUPPLY_URL = "https://info.skyeco.com/supply";

interface Props {
  skyProtocolValue: SkyProtocolValue;
}

export default function SkyProtocolValueSourceNote({ skyProtocolValue }: Props) {
  return (
    <p>
      * Protocol Value Protected combines{" "}
      <a href={skyProtocolValue.sourceUrl} target="_new" rel="noreferrer noopener">
        Sky Info&apos;s reported Total Collateral
      </a>{" "}
      with{" "}
      <a href={SKY_INFO_SUPPLY_URL} target="_new" rel="noreferrer noopener">
        outstanding DAI and USDS supply
      </a>
      . It is not presented as TVL; it is an estimate of protocol value exposed to
      smart contract and governance execution risk.
      {skyProtocolValue.isFallback ? (
        <>
          {" "}
          Fallback value calculated on July 8, 2026.{" "}
          <a href={skyProtocolValue.sourceUrl} target="_new" rel="noreferrer noopener">
            Visit Sky Info
          </a>{" "}
          for the current value.
        </>
      ) : null}
    </p>
  );
}
