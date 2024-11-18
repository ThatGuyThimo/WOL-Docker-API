import wol from 'wake_on_lan';
import net_ping from 'net-ping';

export default class WOLclass {
    constructor(MAC_ADDRESS, IP_ADDRESS) {
        this.MAC_ADDRESS = MAC_ADDRESS;
        this.IP_ADDRESS = IP_ADDRESS;
    }

    async wake() {
        return new Promise((resolve, reject) => {
            console.log('Waking up IP: ' + this.IP_ADDRESS + ' MAC: ' + this.MAC_ADDRESS)
            try {
                wol.wake(this.MAC_ADDRESS, (err) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    } else {
                        resolve(true)
                    }
                })
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    }

    async status() {
        return new Promise((resolve, reject) => {
            console.log('Checking status IP: ' + this.IP_ADDRESS + ' MAC: ' + this.MAC_ADDRESS)
            const session = net_ping.createSession()
            try {                
                session.pingHost(this.IP_ADDRESS, (err, target) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                        session.close()
                    } else {
                        resolve(true)
                        session.close()
                    }
                })
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    }
}