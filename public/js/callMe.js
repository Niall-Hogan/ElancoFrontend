const { FormRecognizerClient, FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs")
const endpoint = "https://gsdp-formrecog.cognitiveservices.azure.com/";
const apiKey = "0176c0aa83a0451ea4aa8c0ae6845aa3";
const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
const path = "../ElancoFrontend/public/receipts/worseExample1.jpg"
const readStream = fs.createReadStream(path);
 
// ADDED ------------------------------------------------------------------------------------

//const mongoose = require('mongoose')
//const url = 'mongodb+srv://ElancoGroupA:iVFPv7X5YGxP2mWN@elancoreceipts.4adsq.mongodb.net/ElancoReceipts?retryWrites=true&w=majority';
//var bodyParser = require('body-parser');


//app.use(bodyParser());


var user;
var clinicName;
var clinicAddress;
var invoiceDate;
var patient;
var items = [];

const rebateData = require("../models/rebate.js");

// ADDED ------------------------------------------------------------------------------------

async function recognizeCustom() {
    // Model ID from when you trained your model.

    var extractedData;

    const modelId = "b131c408-ad86-424b-aa01-388b98a48d9d";

    const formUrl = "https://raw.githubusercontent.com/Elanco-Group/ProtoReceiptFunctionality/master/receipt.pdf";


    const poller = await client.beginRecognizeCustomForms(modelId, readStream, {
        onProgress: (state) => { console.log(`status: ${state.status}`); }
    });
    const forms = await poller.pollUntilDone();

    console.log("Forms:");
    for (const form of forms || []) {
        console.log(`${form.formType}, page range: ${form.pageRange}`);
        // console.log("Pages:");
        // for (const page of form.pages || []) {
        //     console.log(`Page number: ${page.pageNumber}`);
        //     console.log("Tables");
        //     for (const table of page.tables || []) {
        //         for (const cell of table.cells) {
        //             console.log(`cell (${cell.rowIndex},${cell.columnIndex}) ${cell.text}`);
        //         }
        //     }
        //

        console.log("Fields:");
        for (const fieldName in form.fields) {
            // each field is of type FormField
            const field = form.fields[fieldName];

            let temp = fieldName;

            if (temp == "clinic name")
            {
                clinicName = field.value;
                console.log("Extracted = "+clinicName);
            } 
            if (temp == "clinic address")
            {
                clinicAddress = field.value;
                console.log("Extracted = "+clinicAddress);
            } 
              if (temp == "invoice date")
            {
                invoiceDate = field.value;
                console.log("Extracted = "+invoiceDate);
            }
            if (temp == "patient name")
            {
                patient = field.value;
                console.log("Extracted = " + patient);
            }

            if(temp == "items" || temp == "item-names")
            {
                items.push(field.value);
                console.log ("Extracted = " + items);
            }
     

           // extractedData = `Field ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`;
            console.log(
                `Field ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`
            );
        }

    }


const newData = new rebateData ({

    clinicName: clinicName,
    clinicAddress: clinicAddress,
    invoiceDate: invoiceDate,
    patient: patient,
    items:items,

})


newData.save(function (error,document){
 if (error) console.error(error)

 console.log(document);

})

testFunction(extractedData);
}


recognizeCustom().catch((err) => {
    console.error("The sample encountered an error:", err);
});


function testFunction(props)
{
    var x = props;
      //console.log(x +  " // FROM HERE");
        return x;
}


module.exports = {
 
 testFunction:testFunction()
}



