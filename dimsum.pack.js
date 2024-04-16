import fs from 'fs';
import archiver from 'archiver';
import path from 'path';
import chalk from 'chalk';

// 读取 guide.dimsum.json 文件
fs.promises.readFile('./dist/guide.dimsum.json', 'utf8')
  .then((data) => {
    try {
      const jsonData = JSON.parse(data);

      // 创建 pack 目录（如果不存在）
      const packDir = './pack/';
      if (!fs.existsSync(packDir)) {
        fs.mkdirSync(packDir);
      }

      // 创建一个输出流到 pack 目录下的新文件名
      const outputFileName = path.join(packDir, `${jsonData.name}_ver${jsonData.version}.ds`);
      const fileNameParts = outputFileName.split('\\');
      const coloredOutputFileName = fileNameParts.slice(0, -1).join('\\') + '\\' + chalk.hex('#f6d365')(fileNameParts.slice(-1)[0]);
      const output = fs.createWriteStream(outputFileName);
      const archive = archiver('zip', {
        zlib: {
          level: 9
        } // 设置压缩级别
      });

      let startTime = process.hrtime();

      output.on('close', () => {
        const fileSize = archive.pointer() / 1024; // 将字节转换为 kB
        const formattedFileSize = fileSize.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 添加千位分隔符
        const elapsedTime = process.hrtime(startTime);
        const elapsedSeconds = elapsedTime[0] + elapsedTime[1] / 1e9;
        const spacePadding = ' '.repeat(Math.max(1, 80 - formattedFileSize.length - coloredOutputFileName.length));
        console.log(coloredOutputFileName + spacePadding + chalk.bold(formattedFileSize + ' kB'));
        console.log(chalk.green('✓ pack in ' + elapsedSeconds.toFixed(2) + 's'));
      });

      archive.on('error', (err) => {
        console.error('Error creating zip archive:', err);
      });

      archive.pipe(output);

      // 将 dist 目录下的内容添加到压缩包中
      archive.directory('./dist/', false);

      // 完成压缩
      archive.finalize();
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  })
  .catch((err) => {
    console.error('Error reading file:', err);
  });