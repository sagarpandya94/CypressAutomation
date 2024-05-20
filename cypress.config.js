const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require("cypress-sql-server");
const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const ExcelJs = require('exceljs')


async function setupNodeEvents(on,config){

  config.db = {
    userName: "sagar-admin",
    password: "Alexis12!",
    server: "sagar-azuredb-server.database.windows.net",
    options:{
      database: "sagar-azuresql",
      encrypt: true,
      rowCollectionOnRequestCompletion: true
    }
  }

  // implement node event listeners here
  require('cypress-mochawesome-reporter/plugin')(on);

  await preprocessor.addCucumberPreprocessorPlugin(on,config);
  on("file:preprocessor",browserify.default(config));

  tasks= sqlServer.loadDBPlugin(config.db);
  on('task',tasks);

  on('task',{
    excelToJsonTask(filePath){
      const result = excelToJson({
        source: fs.readFileSync(filePath)
      })
      return result;
    }
  });

  on('task',{
    async writeExcelTest({searchText, replaceText, change, filePath}){
      const workbook = new ExcelJs.Workbook();
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet('Sheet1');
      const output= await readExcel(worksheet,searchText);
     
      const cell = worksheet.getCell(output.row,output.column+change.colChange);
      cell.value = replaceText;
      return workbook.xlsx.writeFile(filePath).then(()=>{
        return true
      })
    }
  });

  return config;
}

async function readExcel(worksheet,searchText)
{
    let output = {row:-1,column:-1};
    worksheet.eachRow((row,rowNumber) =>
    {
          row.eachCell((cell,colNumber) =>
          {
              if(cell.value === searchText)
              {
                  output.row=rowNumber;
                  output.column=colNumber;
              }
  
  
          }  )
    
    })
    return output;
}

module.exports = defineConfig({
  projectId: "ovusec",
  defaultCommandTimeout: 6000,
  reporter: 'cypress-mochawesome-reporter',
  env:{
    url:"https://rahulshettyacademy.com"
  },
  retries:{
    runMode: 1
  },
  e2e: {
    setupNodeEvents,
//    specPattern: 'cypress/integration/examples/BDD/*.feature'
      specPattern: 'cypress/integration/examples/*.js'
},
  
});
