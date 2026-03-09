const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/products.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const similarProducts = products[0].similarProducts;

const newProduct = {
    "id": "35",
    "slug": "wonderchef-nutri-blend-bolt-600w",
    "image": "/assets/electric/mixer1.png",
    "images": [
        "/assets/electric/mixer1.png",
        "/assets/electric/mixer2.png",
        "/assets/electric/mixer3.png",
        "/assets/electric/mixer4.png",
        "/assets/electric/mixer5.png"
    ],
    "title": "WONDERCHEF Nutri 600 W Juicer Mixer Grinder (Unbreakable Jars, Sharper Steel Blades, 2 Years Warranty, Black | 4 Jars | Black)",
    "rating": 3.9,
    "reviewCount": 245,
    "currentPrice": 399,
    "originalPrice": 1999,
    "discount": 80,
    "badge": "Top Rated",
    "deliveryText": "Delivery Tomorrow",
    "highlights": [
        "22000 RPM Motor",
        "4 Unbreakable Jars",
        "Sharper Steel Blades",
        "2 Years Warranty"
    ],
    "offers": [
        "Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card"
    ],
    "reviews": {
        "breakdown": [
            { "s": 5, "v": 135, "c": "bg-[#388e3c]", "w": "w-[55%]" },
            { "s": 4, "v": 37, "c": "bg-[#388e3c]", "w": "w-[15%]" },
            { "s": 3, "v": 18, "c": "bg-[#ff9f00]", "w": "w-[7%]" },
            { "s": 2, "v": 13, "c": "bg-[#ff9f00]", "w": "w-[5%]" },
            { "s": 1, "v": 42, "c": "bg-[#ff6161]", "w": "w-[17%]" }
        ],
        "list": [
            {
                "rating": 2,
                "title": "Expected a better product",
                "text": "Never ever take this grander there rubber get disturb during use",
                "author": "Shobha Kumaarri",
                "location": "Marar",
                "time": "May, 2023"
            },
            {
                "rating": 5,
                "title": "Awesome",
                "text": "Just like magic",
                "author": "Naveen Kumar",
                "location": "Shahjahanpur",
                "time": "Jun, 2022"
            },
            {
                "rating": 2,
                "title": "Not good",
                "text": "Bed quality waste money only two time use is not working bakwas product",
                "author": "arvind adalja",
                "location": "Ahmedabad",
                "time": "6 months ago"
            },
            {
                "rating": 1,
                "title": "Useless product",
                "text": "Below average quality; used to be better and quality has gone down significantly",
                "author": "Flipkart Customer",
                "location": "Bengaluru",
                "time": "Jan, 2025"
            },
            {
                "rating": 2,
                "title": "Slightly disappointed",
                "text": "Last month I bought one or two times I used now it want repair",
                "author": "kuchipudi vamsi",
                "location": "Visakhapatnam",
                "time": "Nov, 2024"
            },
            {
                "rating": 3,
                "title": "Does the job",
                "text": "Quality could have more",
                "author": "rizwan khan",
                "location": "New Delhi",
                "time": "Nov, 2024"
            },
            {
                "rating": 2,
                "title": "Slightly disappointed",
                "text": "Not that powerful and like sanjeev kapoor was showing that it grinds perfectly but it doesn't, waste for money if you want it for long run even for 3 years",
                "author": "Adwit Tiwari",
                "location": "Chhatarpur",
                "time": "Aug, 2024"
            },
            {
                "rating": 5,
                "title": "Wonderful",
                "text": "Value for money Good product",
                "author": "Brajesh Kumar Soni",
                "location": "Gursahaiganj",
                "time": "Apr, 2024"
            },
            {
                "rating": 3,
                "title": "Fair",
                "text": "Very noisy",
                "author": "Sadhu Elias Arockia",
                "location": "Mumbai",
                "time": "Mar, 2024"
            }
        ]
    },
    "similarProducts": similarProducts,
    "stockLeft": 15,
    "soldCount": "2145+",
    "warranty": "2 Years Warranty",
    "details": [
        "WONDERCHEF Nutri-blend BOLT Complete Kitchen Machine",
        "600 W robust motor can grind ingredients at speeds of up to 22,000 RPM",
        "Extracts nutrients from fruits and vegetables",
        "Compact design allows it to fit into any corner of your kitchen counter",
        "Includes a large jar for shakes, a juicer attachment, and a chopper",
        "Features 4 Unbreakable Jars and Sharper Steel Blades",
        "Recipe book by Chef Sanjeev Kapoor included"
    ]
};

// Ensure product doesn't exist already to avoid duplicates
if (!products.some(p => p.id === "35" || p.slug === newProduct.slug)) {
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    console.log('Product added successfully!');
} else {
    console.log('Product already exists!');
}
