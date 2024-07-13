require("dotenv").config();

const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");
const app = express();

const {
  requestTokens,
} = require("./plsFaucet");

const PORT = process.env.PORT || 9001;
app.use(cors());

app.use(bodyParser.json());

app.post('/requestTokens', async (req, res) => {
    console.log(req.body);
    const wallet = req.body.walletUser;
    const tx = await requestTokens(wallet);
    res.send(tx);
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));