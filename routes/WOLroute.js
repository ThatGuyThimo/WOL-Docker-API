import express from 'express';
import WOLclass from '../classes/WOLclass.js';
const router = express.Router()

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


const IP_ADDRESS_regex = new RegExp('^([0-9]{1,3}\.){3}[0-9]{1,3}$')
const MAC_ADDRESS_regex = new RegExp('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$')


router.get('/wake', async (req, res) => {
    const response = req.query;
    if (!response.IP_ADDRESS || !response.MAC_ADDRESS) {
        res.status(400).send("Missing parameters");
        return;
    } else if (!IP_ADDRESS_regex.test(response.IP_ADDRESS) || !MAC_ADDRESS_regex.test(response.MAC_ADDRESS)) {
        res.status(400).send("One or more invalid parameters");
        return;
    }

    const WOL = new WOLclass(response.MAC_ADDRESS, response.IP_ADDRESS);

    try {
        const result = await WOL.wake();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("Error waking the machine");
    }
});

router.get('/status', async (req, res) => {
    const response = req.query;

    if (!response.IP_ADDRESS || !response.MAC_ADDRESS) {
        res.status(400).send("Missing parameters");
        return;
    } else if (!IP_ADDRESS_regex.test(response.IP_ADDRESS) || !MAC_ADDRESS_regex.test(response.MAC_ADDRESS)) {
        res.status(400).send("One or more invalid parameters");
        return;
    }

    const WOL = new WOLclass(response.MAC_ADDRESS, response.IP_ADDRESS);

    try {
        const result = await WOL.status();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("Error checking the status of the machine");
    }
});

export { router }