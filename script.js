// convert-excel-to-json.ts
import * as XLSX from 'xlsx';
import * as fs from 'fs';

// 엑셀 파일 경로
const excelFilePath = './merged_seongsan_data_with_script_audio.csv';
// 출력할 JSON 파일 경로
const jsonFilePath = './merged_seongsan_data_with_script_audio.json';

// 엑셀 파일 읽기
const workbook = XLSX.readFile(excelFilePath);
// 첫 번째 시트 선택
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// 시트 데이터를 JSON 배열로 변환
const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

// JSON 파일로 저장
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');

console.log('변환 완료:', jsonFilePath);
