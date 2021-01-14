const { FormRecognizerClient, FormTrainingClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs")
const endpoint = "https://gsdp-formrecog.cognitiveservices.azure.com/";
const apiKey = "0176c0aa83a0451ea4aa8c0ae6845aa3";
const trainingClient = new FormTrainingClient(endpoint, new AzureKeyCredential(apiKey));
const client = new FormRecognizerClient(endpoint, new AzureKeyCredential(apiKey));
const path = "../ElancoFrontend/public/receipts/new-receipt-2.pdf"
const readStream = fs.createReadStream(path);

var extractedData;

async function recognizeCustom() {
    // Model ID from when you trained your model.
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
        // }

        console.log("Fields:");
        for (const fieldName in form.fields) {
            // each field is of type FormField
            const field = form.fields[fieldName];

            extractedData += `Field ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`;
            // console.log(
            //     `Field ${fieldName} has value '${field.value}' with a confidence score of ${field.confidence}`
            // );
        }
    }

    console.log(extractedData);

}

recognizeCustom().catch((err) => {
    console.error("The sample encountered an error:", err);
});

   module.exports = function() {

}
