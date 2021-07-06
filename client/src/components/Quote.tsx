import React from "react";

type quoteProps = {
  quote: { text: string; author: string };
};

function Quote({ quote }: quoteProps) {
  return (
    <div className="quote-container">
      <div>
        <p>
          "<i>{quote.text}</i>"
        </p>
        {quote.author ? (
          <p>
            <strong>{`- ${quote.author} -`}</strong>
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Quote;
