import fs from 'fs';
import csv from 'csv-parser';

const results = [];
const csvFilePath = './merged_seongsan_data_with_script_audio.csv';
const jsonFilePath = './public/places.json'; // public 폴더에 저장하여 바로 접근 가능하도록 합니다.

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // 위도(latitude)와 경도(longitude)를 숫자 타입으로 변환합니다.
    const typedResults = results.map((item) => ({
      ...item,
      latitude: parseFloat(item.latitude) || null,
      longitude: parseFloat(item.longitude) || null,
    }));

    fs.writeFile(jsonFilePath, JSON.stringify(typedResults, null, 2), (err) => {
      if (err) {
        console.error('JSON 파일 저장 중 오류가 발생했습니다:', err);
        return;
      }
      console.log(`성공적으로 ${jsonFilePath} 파일에 저장되었습니다.`);
    });
  });
