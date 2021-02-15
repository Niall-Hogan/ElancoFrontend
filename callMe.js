const { FormRecognizerClient, FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs")
const endpoint = "https://gsdp-formrecog.cognitiveservices.azure.com/";
const apiKey = "0176c0aa83a0451ea4aa8c0ae6845aa3";
const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
const path = "./public/receipts/worseExample1.jpg"
 

// Variables to hold data extracted from receipt
var user;
var clinicName;
var clinicAddress;
var invoiceDate;
var patient;
var items = [];

// Variable to hold schema
const rebateData = require("./models/rebate.js");


async function recognizeCustom() {
    // Model ID from when you trained your model.

    const readStream = fs.createReadStream(path);

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
   
            console.log(
                `Field ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`
            );
        }

    }

}

async function testFunction()
{   

     await recognizeCustom().catch((err) => {
        console.error("The sample encountered an error:", err);
    });

    // creates schema
     const newData = new rebateData ({

         clinicName,
         clinicAddress,
         invoiceDate,
         patient,
         items,
    
     })
    
    // saves to database
    newData.save(function (error,document){
     if (error) console.error(error)
    
    console.log(document);
    
    })

// variables for exported function to return

    return {
        clinicName,
        clinicAddress,
        invoiceDate,
        patient,
        items,
    } 
}

// export the function 
module.exports = testFunction



