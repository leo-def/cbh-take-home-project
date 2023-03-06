const { deterministicPartitionKey } = require("./dpk");
const readline = require('readline');

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface.question('Insert a partition key: ', async partitionKey => {
    console.log(`Reading partition key: ${partitionKey}!`);
    const result = await deterministicPartitionKey(partitionKey);
    console.log(`Result: ${result}`);
    interface.close();
});