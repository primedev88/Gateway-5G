const { spawn } = require('child_process');

function runCommands() {
  const command1 = spawn('echo', ['Command 1']);
  const command2 = spawn('echo', ['Command 2']);

  command1.stdout.on('data', (data) => {
    console.log(`Command 1 output: ${data}`);
  });

  command2.stdout.on('data', (data) => {
    console.log(`Command 2 output: ${data}`);
  });
}

runCommands();
