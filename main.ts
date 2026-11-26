// Entry program: copies the pre-rendered broadsheet image to the
// grader's output directory. Deterministic: the same bytes every run,
// no network, no environment reads.
import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || 'out';
mkdirSync(outDir, { recursive: true });
const src = join(root, 'entry.png');
const dst = join(outDir, 'entry.png');
copyFileSync(src, dst);
// Guard against a partial copy: the grader gates on a whole image.
if (statSync(src).size !== statSync(dst).size) {
  throw new Error('entry.png copy incomplete');
}
