import { readFile } from 'fs/promises';

export async function readFileContent(path: string) {
  return readFile(path, 'utf-8');
}
