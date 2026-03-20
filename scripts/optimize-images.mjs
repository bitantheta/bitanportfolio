import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

const tasks = [
  {
    input: "src/assets/me.png",
    outputs: [
      { dir: "public/assets", name: "me-900", width: 900 },
      { dir: "public/assets", name: "me-1600", width: 1600 }
    ]
  },
  {
    input: "src/assets/me2.png",
    outputs: [{ dir: "public/assets", name: "me2-1600", width: 1600 }]
  },
  {
    input: "src/assets/me3.png",
    outputs: [{ dir: "public/assets", name: "me3-1600", width: 1600 }]
  },
  {
    input: "src/assets/me6.png",
    outputs: [{ dir: "public/assets", name: "me6-1200", width: 1200 }]
  },
  {
    input: "src/assets/solar-dashboard.png",
    outputs: [{ dir: "public/assets", name: "solar-dashboard-1200", width: 1200 }]
  },
  {
    input: "src/assets/bmlogo.png",
    outputs: [
      { dir: "public/assets", name: "bmlogo-512", width: 512 },
      { dir: "public/assets", name: "bmlogo-768", width: 768 }
    ]
  },
  {
    input: "public/bmlogo.png",
    outputs: [{ dir: "public/assets", name: "bmlogo-public-768", width: 768 }]
  },
  {
    input: "src/assets/ju.png",
    outputs: [{ dir: "public/assets", name: "ju-512", width: 512 }]
  },
  {
    input: "src/assets/abinbev.png",
    outputs: [{ dir: "public/assets", name: "abinbev-512", width: 512 }]
  },
  {
    input: "src/assets/izmir.png",
    outputs: [{ dir: "public/assets", name: "izmir-512", width: 512 }]
  },
  {
    input: "src/assets/iisc.png",
    outputs: [{ dir: "public/assets", name: "iisc-512", width: 512 }]
  },
  {
    input: "src/assets/iim.png",
    outputs: [{ dir: "public/assets", name: "iim-512", width: 512 }]
  },
  {
    input: "public/certificates/ml-specialization.png",
    outputs: [{ dir: "public/certificates", name: "ml-specialization-1200", width: 1200 }]
  },
  {
    input: "public/certificates/unsupervised-rl.png",
    outputs: [{ dir: "public/certificates", name: "unsupervised-rl-1200", width: 1200 }]
  },
  {
    input: "public/certificates/advanced-algos.png",
    outputs: [{ dir: "public/certificates", name: "advanced-algos-1200", width: 1200 }]
  },
  {
    input: "public/certificates/graph-algos.png",
    outputs: [{ dir: "public/certificates", name: "graph-algos-1200", width: 1200 }]
  },
  {
    input: "public/certificates/iit-ml.png",
    outputs: [{ dir: "public/certificates", name: "iit-ml-1200", width: 1200 }]
  },
  {
    input: "public/certificates/python-ds.png",
    outputs: [{ dir: "public/certificates", name: "python-ds-1200", width: 1200 }]
  },
  {
    input: "public/leadership/dps-vice-head-boy.png",
    outputs: [{ dir: "public/leadership", name: "dps-vice-head-boy-600", width: 600 }]
  },
  {
    input: "public/leadership/dps-house-captain.png",
    outputs: [{ dir: "public/leadership", name: "dps-house-captain-600", width: 600 }]
  },
  {
    input: "public/leadership/jumun-24-oc-finance.png",
    outputs: [{ dir: "public/leadership", name: "jumun-24-oc-finance-600", width: 600 }]
  },
  {
    input: "public/leadership/voxpop-24-director-finance.png",
    outputs: [{ dir: "public/leadership", name: "voxpop-24-director-finance-600", width: 600 }]
  },
  {
    input: "public/leadership/intramun-24-finance-officer.png",
    outputs: [{ dir: "public/leadership", name: "intramun-24-finance-officer-600", width: 600 }]
  },
  {
    input: "public/leadership/jumun-25-charge-affairs.png",
    outputs: [{ dir: "public/leadership", name: "jumun-25-charge-affairs-600", width: 600 }]
  },
  {
    input: "public/leadership/voxpop-25-treasurer.png",
    outputs: [{ dir: "public/leadership", name: "voxpop-25-treasurer-600", width: 600 }]
  }
];

async function ensureDir(dirPath) {
  await fs.mkdir(path.join(root, dirPath), { recursive: true });
}

async function optimizeOne(inputPath, output) {
  const absInput = path.join(root, inputPath);
  const absDir = path.join(root, output.dir);
  await ensureDir(output.dir);

  const pipeline = sharp(absInput).rotate().resize({ width: output.width, withoutEnlargement: true });

  const avifPath = path.join(absDir, `${output.name}.avif`);
  const webpPath = path.join(absDir, `${output.name}.webp`);

  const isLeadership = output.dir.includes("leadership");
  const isCertificate = output.dir.includes("certificates");

  const avifQuality = isLeadership ? 70 : isCertificate ? 62 : 52;
  const webpQuality = isLeadership ? 92 : isCertificate ? 86 : 78;

  await pipeline.clone().avif({ quality: avifQuality, effort: 6 }).toFile(avifPath);
  await pipeline.webp({ quality: webpQuality, effort: 5 }).toFile(webpPath);
}

async function run() {
  for (const task of tasks) {
    for (const output of task.outputs) {
      await optimizeOne(task.input, output);
      console.log(`optimized ${task.input} -> ${output.dir}/${output.name}.{avif,webp}`);
    }
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
