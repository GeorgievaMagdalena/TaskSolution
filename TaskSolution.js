const url = "https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1";

let sumDomestic = 0;
let sumImported = 0;

try {
    fetch(url)
        .then((response) => response.json())
        .then((jsonResponse) => {
            const domesticItems = [];
            const importedItems = [];

            jsonResponse.forEach((item) => {
                if (item.domestic) {
                    domesticItems.push(item);
                } else {
                    importedItems.push(item);
                }
            });

            domesticItems.sort((item1, item2) => item1.name.localeCompare(item2.name))
            importedItems.sort((item1, item2) => item1.name.localeCompare(item2.name))

            const formatedData = (category, items) => {
                console.log(`. ${category}`);
                items.forEach((item) => {
                    console.log(`... ${item.name}`);
                    console.log(`    Price: $${item.price.toFixed(1)}`);

                    if(item.domestic){ 
                        sumDomestic+=item.price 
                    }else{
                        sumImported+=item.price;
                    }
    
                    if (item.description.length > 10) {
                        console.log(`    ${item.description.slice(0, 10)}...`)
                    }
                    
                    if('weight' in item){
                        console.log(`    Weight: ${item.weight}g`)
                    }else{
                        console.log("    Weight: N/A")
                    }
                });
            };

            formatedData("Domestic", domesticItems);
            formatedData("Imported", importedItems);

            console.log(`Domestic cost: $${sumDomestic.toFixed(1)}`);
            console.log(`Imported cost: $${sumDomestic.toFixed(1)}`);

            console.log(`Domestic count: ${domesticItems.length}`);
            console.log(`Imported count: ${importedItems.length}`);

            
        });
} catch (error) {
    console.log(error);
}
