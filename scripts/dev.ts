import { spawn } from 'child_process';
import chalk from 'chalk';

const LOG_WIDTH = 60;

function printLine() {
  console.log(chalk.gray('  ' + '─'.repeat(LOG_WIDTH)));
}

function printHeader() {
  console.clear();
  console.log('\n');
  console.log(chalk.bold.cyan(`  ┌${'─'.repeat(LOG_WIDTH - 2)}┐`));
  console.log(chalk.bold.cyan(`  │  ${chalk.white.bold('L I Q U I F Y')}   ${chalk.gray('·')}   ${chalk.white('D E V   S T A C K')}  ` + ' '.repeat(LOG_WIDTH - 36) + '│'));
  console.log(chalk.bold.cyan(`  └${'─'.repeat(LOG_WIDTH - 2)}┘`));
  console.log('\n');
  
  console.log(`  ${chalk.cyan('🌐')} ${chalk.bold('Web Portal')}      ${chalk.gray('→')}  ${chalk.underline.blue('http://localhost:3000')}`);
  console.log(`  ${chalk.magenta('🛡️')}  ${chalk.bold('Admin Portal')}    ${chalk.gray('→')}  ${chalk.underline.magenta('http://localhost:3001')}`);
  console.log('\n');
  console.log(chalk.bold.yellow(`  ⚡ STARTING SYSTEM SERVICES...`));
  printLine();
}

function formatLine(name: string, line: string, bgColor: string, txtColor: string) {
  if (!line.trim()) return;
  
  // Smart Filter: Skip noisy boilerplate
  if (line.includes('Packages in scope')) return;
  if (line.includes('Running dev in')) return;
  if (line.includes('Remote caching disabled')) return;
  if (line.includes('cache bypass')) return;
  if (line.includes('force executing')) return;
  if (line.includes('turbo')) return;
  if (line.includes('Next.js')) return;
  if (line.includes('- Local:')) return;
  if (line.includes('- Network:')) return;

  // Highlight Ready Status
  if (line.includes('✓ Ready')) {
    console.log(`  ${chalk[bgColor][txtColor](` ${name} `)} ${chalk.green.bold('🚀 SERVICE ONLINE')}`);
    return;
  }

  const prefix = chalk[bgColor][txtColor](` ${name} `);
  console.log(`  ${prefix} ${line.trim()}`);
}

function startProcess(name: string, command: string, bgColor: string, txtColor: string) {
  const [cmd, ...args] = command.split(' ');
  const proc = spawn(cmd as string, args, { shell: true, stdio: 'pipe' });

  proc.stdout.on('data', (data) => {
    data.toString().split('\n').forEach((l: string) => formatLine(name, l, bgColor, txtColor));
  });

  proc.stderr.on('data', (data) => {
    const line = data.toString().trim();
    if (line.includes('warning') || line.includes('•')) {
       // Filter redundant status info on stderr
       return;
    }
    const prefix = chalk.bgRed.white(` ${name} `);
    console.log(`  ${prefix} ${chalk.red(line)}`);
  });

  return proc;
}

printHeader();

const web = startProcess('WEB', 'npx turbo run dev --filter=web', 'bgCyan', 'black');
const admin = startProcess('ADM', 'npx turbo run dev --filter=admin', 'bgMagenta', 'white');

process.on('SIGINT', () => {
  web.kill();
  admin.kill();
  console.log('\n\n' + chalk.yellow('  👋 Shutting down Liquify Dev Stack...') + '\n');
  process.exit();
});
