const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const showcase = path.join(root, "src/ClubShowcasePanel.jsx");
const showcaseMap = {
  "fb-w1": "10-20 16:40",
  "fb-w2": "10-12 15:22",
  "fb-w3": "09-30 14:08",
  "fb-w4": "09-22 17:35",
  "fb-w5": "09-15 16:12",
  "rb-w1": "10-18 19:05",
  "rb-w2": "10-08 20:14",
  "rb-w3": "09-26 15:48",
  "rb-w4": "09-12 16:30",
  "dr-w1": "10-15 18:22",
  "dr-w2": "10-08 20:36",
  "dr-w3": "09-24 17:10",
  "dr-w4": "09-10 15:55",
  "gn-w1": "10-15 16:20",
  "gn-w2": "09-28 15:40",
};

const manage = path.join(root, "src/FourDomainStudent.jsx");
const manageMap = {
  w1: "10-20 16:40",
  w2: "10-12 15:22",
  w3: "09-30 14:08",
  w4: "09-22 17:35",
  w5: "09-15 16:12",
  h1: "10-24 09:40",
  h2: "06-20 15:18",
  h3: "05-18 10:26",
};

function patch(file, map) {
  let src = fs.readFileSync(file, "utf8");
  let count = 0;
  Object.entries(map).forEach(([id, value]) => {
    const re = new RegExp('\\{ id: "' + id + '",', "g");
    src = src.replace(re, () => {
      count += 1;
      return '{ id: "' + id + '", publishTime: "' + value + '",';
    });
  });
  fs.writeFileSync(file, src);
  console.log(path.basename(file), "patched", count);
}

patch(showcase, showcaseMap);
patch(manage, manageMap);
