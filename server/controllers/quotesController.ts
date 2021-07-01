const axios = require("axios");

const options = {
  method: "GET",
  url: "https://healthruwords.p.rapidapi.com/v1/quotes/",
  params: { id: "731", size: "medium", maxR: "1", t: "Wisdom" },
  headers: {
    "x-rapidapi-key": "39744ebafbmsh0e816102ae0a641p10ef38jsn9e7b404cfe86",
    "x-rapidapi-host": "healthruwords.p.rapidapi.com",
  },
};

const getQuote = async () => {
  const res = await axios(options);
  console.log(res.data);
};
getQuote();
