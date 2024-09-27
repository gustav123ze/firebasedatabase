// root/sampledata.js

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, push, set } = require('firebase/database');

// Firebase konfiguration fra .env-filen
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: "https://fir-database-ace30-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const ordersRef = ref(db, 'Orders');

// Sample data

const sampleOrders  = [
    {
        deliveryAddress: "Nørrebrogade 48, 2200 København N",
        deliveryDate: "27-09-2024",
        item: "Kaffemaskine",
        pickupAddress: "Frederiksberg Alle 23, 1820 Frederiksberg",
        pickupDate: "27-09-2024",
        price: "2500",
        taken: false,
        weight: "300"
    },
    {
        deliveryAddress: "Vesterbrogade 101, 1620 København V",
        deliveryDate: "28-09-2024",
        item: "Køleskab",
        pickupAddress: "Sølvkrogen 5, 2400 København NV",
        pickupDate: "28-09-2024",
        price: "9000",
        taken: false,
        weight: "500"
    },
    {
        deliveryAddress: "Bredgade 4, 1260 København K",
        deliveryDate: "29-09-2024",
        item: "Gammel Vase",
        pickupAddress: "Møllevej 9, 2800 Kongens Lyngby",
        pickupDate: "29-09-2024",
        price: "1200",
        taken: false,
        weight: "150"
    },
    {
        deliveryAddress: "Søndergade 6, 8000 Aarhus C",
        deliveryDate: "30-09-2024",
        item: "Sengelinned",
        pickupAddress: "Jernbanegade 14, 8000 Aarhus C",
        pickupDate: "30-09-2024",
        price: "800",
        taken: false,
        weight: "100"
    },
    {
        deliveryAddress: "Oehlenschlægersgade 10, 1660 København V",
        deliveryDate: "01-10-2024",
        item: "Billede",
        pickupAddress: "Bredgade 30, 1260 København K",
        pickupDate: "01-10-2024",
        price: "4500",
        taken: false,
        weight: "250"
    },
    {
        deliveryAddress: "Sønderskovvej 2, 2600 Glostrup",
        deliveryDate: "02-10-2024",
        item: "Værktøjssæt",
        pickupAddress: "Nørrebrogade 19, 2200 København N",
        pickupDate: "02-10-2024",
        price: "1500",
        taken: false,
        weight: "800"
    },
    {
        deliveryAddress: "Søtorvet 1, 4400 Kalundborg",
        deliveryDate: "03-10-2024",
        item: "Lys",
        pickupAddress: "Kirkegade 16, 4400 Kalundborg",
        pickupDate: "03-10-2024",
        price: "300",
        taken: false,
        weight: "50"
    },
    {
        deliveryAddress: "Havnegade 1, 5000 Odense C",
        deliveryDate: "04-10-2024",
        item: "Plante",
        pickupAddress: "Niels Bohrs Vej 20, 5000 Odense C",
        pickupDate: "04-10-2024",
        price: "200",
        taken: false,
        weight: "10"
    },
    {
        deliveryAddress: "Falkoner Allé 10, 2000 Frederiksberg",
        deliveryDate: "05-10-2024",
        item: "Bordspil",
        pickupAddress: "Højlundsgade 3, 2000 Frederiksberg",
        pickupDate: "05-10-2024",
        price: "400",
        taken: false,
        weight: "300"
    },
    {
        deliveryAddress: "Søndergade 10, 8000 Aarhus C",
        deliveryDate: "06-10-2024",
        item: "Drikkeglas",
        pickupAddress: "Fjordvej 22, 8000 Aarhus C",
        pickupDate: "06-10-2024",
        price: "600",
        taken: false,
        weight: "100"
    },
    {
        deliveryAddress: "Jernbanegade 10, 3000 Helsingør",
        deliveryDate: "07-10-2024",
        item: "Havemøbler",
        pickupAddress: "Strandvejen 9, 3000 Helsingør",
        pickupDate: "07-10-2024",
        price: "3000",
        taken: false,
        weight: "1000"
    },
    {
        deliveryAddress: "Store Torv 12, 8700 Horsens",
        deliveryDate: "08-10-2024",
        item: "Køkkenmaskine",
        pickupAddress: "Nørregade 34, 8700 Horsens",
        pickupDate: "08-10-2024",
        price: "3500",
        taken: false,
        weight: "400"
    },
    {
        deliveryAddress: "Strandvejen 45, 2900 Hellerup",
        deliveryDate: "09-10-2024",
        item: "Sengelampe",
        pickupAddress: "Tåsingegade 5, 2900 Hellerup",
        pickupDate: "09-10-2024",
        price: "700",
        taken: false,
        weight: "150"
    },
    {
        deliveryAddress: "Fjordvej 11, 4800 Nykøbing F",
        deliveryDate: "10-10-2024",
        item: "Sættekasse",
        pickupAddress: "Gammel Skivevej 3, 4800 Nykøbing F",
        pickupDate: "10-10-2024",
        price: "1800",
        taken: false,
        weight: "200"
    },
    {
        deliveryAddress: "Rådhuspladsen 4, 1550 København V",
        deliveryDate: "11-10-2024",
        item: "Kombineret skab",
        pickupAddress: "Bredgade 20, 1260 København K",
        pickupDate: "11-10-2024",
        price: "5000",
        taken: false,
        weight: "900"
    },
    {
        deliveryAddress: "Storgade 7, 8340 Malling",
        deliveryDate: "12-10-2024",
        item: "Vinterjakke",
        pickupAddress: "Rådgivervej 1, 8340 Malling",
        pickupDate: "12-10-2024",
        price: "1000",
        taken: false,
        weight: "600"
    },
    {
        deliveryAddress: "Tordenskjoldsgade 17, 6700 Esbjerg",
        deliveryDate: "13-10-2024",
        item: "Vasketøj",
        pickupAddress: "Kirkegade 3, 6700 Esbjerg",
        pickupDate: "13-10-2024",
        price: "300",
        taken: false,
        weight: "150"
    },
    {
        deliveryAddress: "Vesterbrogade 45, 1620 København V",
        deliveryDate: "14-10-2024",
        item: "Sushi",
        pickupAddress: "Brogade 20, 1620 København V",
        pickupDate: "14-10-2024",
        price: "200",
        taken: false,
        weight: "200"
    },
    {
        deliveryAddress: "Skovvejen 8, 3000 Helsingør",
        deliveryDate: "15-10-2024",
        item: "Hundeseng",
        pickupAddress: "Havnegade 4, 3000 Helsingør",
        pickupDate: "15-10-2024",
        price: "1500",
        taken: false,
        weight: "800"
    },
    {
        deliveryAddress: "Bollerupvej 10, 8464 Galten",
        deliveryDate: "16-10-2024",
        item: "Kunstværk",
        pickupAddress: "Åbyhøjvej 3, 8464 Galten",
        pickupDate: "16-10-2024",
        price: "4500",
        taken: false,
        weight: "250"
    },
    {
        deliveryAddress: "Rugårdsvej 25, 5000 Odense C",
        deliveryDate: "17-10-2024",
        item: "Overtøj",
        pickupAddress: "Højagervej 17, 5000 Odense C",
        pickupDate: "17-10-2024",
        price: "2500",
        taken: false,
        weight: "800"
    },
    {
        deliveryAddress: "Poppelhaven 3, 2980 Kokkedal",
        deliveryDate: "18-10-2024",
        item: "Maling",
        pickupAddress: "Kystvej 21, 2980 Kokkedal",
        pickupDate: "18-10-2024",
        price: "700",
        taken: false,
        weight: "200"
    },
    {
        deliveryAddress: "Ågade 10, 3200 Helsinge",
        deliveryDate: "19-10-2024",
        item: "Gaveæske",
        pickupAddress: "Søndergade 5, 3200 Helsinge",
        pickupDate: "19-10-2024",
        price: "800",
        taken: false,
        weight: "50"
    },
    {
        deliveryAddress: "Rundforbi 6, 3600 Frederikssund",
        deliveryDate: "20-10-2024",
        item: "Bord",
        pickupAddress: "Fjordstien 4, 3600 Frederikssund",
        pickupDate: "20-10-2024",
        price: "2000",
        taken: false,
        weight: "600"
    },
    {
        deliveryAddress: "Rosenvej 9, 9200 Aalborg SV",
        deliveryDate: "21-10-2024",
        item: "Ur",
        pickupAddress: "Møllevej 12, 9200 Aalborg SV",
        pickupDate: "21-10-2024",
        price: "3000",
        taken: false,
        weight: "200"
    },
    {
        deliveryAddress: "Skagenvej 8, 9100 Aalborg",
        deliveryDate: "22-10-2024",
        item: "Havemøbler",
        pickupAddress: "Bredgade 1, 9100 Aalborg",
        pickupDate: "22-10-2024",
        price: "4000",
        taken: false,
        weight: "800"
    },
    {
        deliveryAddress: "Nordvestvej 6, 9500 Hobro",
        deliveryDate: "23-10-2024",
        item: "Belysning",
        pickupAddress: "Storegade 4, 9500 Hobro",
        pickupDate: "23-10-2024",
        price: "600",
        taken: false,
        weight: "150"
    },
    {
        deliveryAddress: "Randersvej 10, 8600 Silkeborg",
        deliveryDate: "24-10-2024",
        item: "Børneseng",
        pickupAddress: "Nørregade 6, 8600 Silkeborg",
        pickupDate: "24-10-2024",
        price: "1200",
        taken: false,
        weight: "400"
    },
    {
        deliveryAddress: "Glamsbjergvej 3, 5750 Tørresø",
        deliveryDate: "25-10-2024",
        item: "Tæppe",
        pickupAddress: "Havnegade 10, 5750 Tørresø",
        pickupDate: "25-10-2024",
        price: "3000",
        taken: false,
        weight: "600"
    },
    {
        deliveryAddress: "Fjordvej 30, 2100 København Ø",
        deliveryDate: "26-10-2024",
        item: "Sofa",
        pickupAddress: "Kirkegade 2, 2100 København Ø",
        pickupDate: "26-10-2024",
        price: "7000",
        taken: false,
        weight: "800"
    },
    {
        deliveryAddress: "Århusgade 22, 2100 København Ø",
        deliveryDate: "27-10-2024",
        item: "Plakat",
        pickupAddress: "Vesterbrogade 18, 1620 København V",
        pickupDate: "27-10-2024",
        price: "100",
        taken: false,
        weight: "50"
    },
    {
        deliveryAddress: "Guldsmedgade 3, 8000 Aarhus C",
        deliveryDate: "28-10-2024",
        item: "Plantekasse",
        pickupAddress: "Bredgade 6, 8000 Aarhus C",
        pickupDate: "28-10-2024",
        price: "800",
        taken: false,
        weight: "300"
    },
    {
        deliveryAddress: "Fynsgade 5, 8000 Aarhus C",
        deliveryDate: "29-10-2024",
        item: "Teaterbilletter",
        pickupAddress: "Tordenskjoldsgade 8, 8000 Aarhus C",
        pickupDate: "29-10-2024",
        price: "300",
        taken: false,
        weight: "50"
    },
    {
        deliveryAddress: "Falkoner Allé 17, 2000 Frederiksberg",
        deliveryDate: "30-10-2024",
        item: "Tøj",
        pickupAddress: "Sønder Boulevard 24, 1720 København V",
        pickupDate: "30-10-2024",
        price: "2000",
        taken: false,
        weight: "250"
    },
    {
        deliveryAddress: "Møllevej 2, 4600 Køge",
        deliveryDate: "31-10-2024",
        item: "Bagskærm",
        pickupAddress: "Vestergade 14, 4600 Køge",
        pickupDate: "31-10-2024",
        price: "600",
        taken: false,
        weight: "80"
    },
    {
        deliveryAddress: "Havnegade 12, 5000 Odense C",
        deliveryDate: "01-11-2024",
        item: "Rundt Bord",
        pickupAddress: "Kirkebjergvej 11, 5200 Odense V",
        pickupDate: "01-11-2024",
        price: "2500",
        taken: false,
        weight: "700"
    },
    {
        deliveryAddress: "Nørrebrogade 18, 2200 København N",
        deliveryDate: "02-11-2024",
        item: "Håndklæde",
        pickupAddress: "Frederiksberg Alle 23, 1820 Frederiksberg",
        pickupDate: "02-11-2024",
        price: "150",
        taken: false,
        weight: "200"
    }
];









// Indsæt sample ordrer
const insertSampleOrders = async () => {
    for (const order of sampleOrders) {
        const newOrderRef = push(ordersRef); // Opret en ny node med en unik ID
        try {
            await set(newOrderRef, order);
            console.log(`Ordren med ID ${newOrderRef.key} er indsat.`);
        } catch (error) {
            console.error("Fejl ved indsættelse af ordre:", error);
        }
    }
};

// Kald funktionen for at indsætte ordrer
insertSampleOrders();
