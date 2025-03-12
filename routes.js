// General Requirements
const express = require('express');
var path = require('path');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {

  // Set Config Directory (Generalizing for Builds)
  const configDirectory = path.resolve(process.cwd());
  console.log("hi " + configDirectory + " is the config directory");
  console.log("hello " + path.join(configDirectory, "keywords.json"));

  // Parse JSON File
  //const rawData = fs.readFileSync('keywords.json');
  const rawData = fs.readFileSync(
    path.join(configDirectory, "keywords.json"),
    "utf8"
  );
  const parsedData = JSON.parse(rawData);

  // Get Random Name per Keyword
  const list = [];
  let index = 0;
  for (const keyword of parsedData.keywords) {
    index = Math.floor(Math.random() * keyword.items.length);
    list.push(keyword.items[index].name);
  }

  const journalName = list.join(' ');
  
  /*
  // Return Data
  res.status(200).json({
    journal_name: journalName
  });
  */
  
  res.render('pages/index',{
  	journalName: journalName
  });
});

module.exports = router;
