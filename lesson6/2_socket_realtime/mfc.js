import EventEmitter from "events";

const requestTypes = [
    {
        type: 'send',
        payload: 'to send a document'
    },
    {
        type: 'receive',
        payload: 'to receive a document'
    },
    {
        type: 'sign',
        payload: 'to sign a document'
    },
]

class Customer {
    constructor(params) {
        this.type = params.type
        this.payload = params.payload
    }
}

const genereteIntInRange = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

const generateNewCustomer = () => {
    const intervalValue = genereteIntInRange(1, 5) * 1000
    const params = requestTypes[genereteIntInRange(0, 2)]

    return delay(intervalValue).then(() => new Customer(params))
}

const emitter = new class extends EventEmitter {}

export { emitter as MyEmitter }

const run = async () => {
    const customer = await generateNewCustomer()
    emitter.emit(customer.type, customer.payload)

    run()
}
run()