// This module gives the adapter name

// const { exec } = require('child_process');

// const getAdapterName = async () => {
//     let adapterName = '';

//     await exec('iwconfig', (error, stdout, stderr) => {
//         if (error) {
//             console.error('Error in executing command iwconfig ', error);
//         }
//         const lines = stdout.split('\n');
//         lines.forEach((line) => {
//             if (line.includes('IEEE 802.11')) {
//                 adapterName = line.split(' ')[0];
//             }
//         })
//     })
//     return adapterName;
// }

// module.exports = {
//     getAdapterName
// }
const { exec } = require('child_process');

const getAdapterName = () => {
    return new Promise((resolve, reject) => {
        let adapterName = '';

        exec('iwconfig', (error, stdout, stderr) => {
            if (error) {
                console.error('Error in executing command iwconfig ', error);
                reject(error);
                return;
            }

            const lines = stdout.split('\n');
            lines.forEach((line) => {
                if (line.includes('IEEE 802.11')) {
                    adapterName = line.split(' ')[0];
                }
            });

            resolve(adapterName);
        });
    });
};

module.exports = {
    getAdapterName,
};
