const fs = require('fs');
const path = 'd:/coding2/agency-comeonline/clients/flipkart/src/data/products.json';
const products = JSON.parse(fs.readFileSync(path, 'utf8'));

const list = [
    { id: '1', title: 'Prestige 5 Litres Svachh Nakshatra Plus Induction Base Inner Lid Hard Anodised Pressure Handi | Black', image: '/assets/kitchen/1/1.png', price: 345, originalPrice: 4155, discount: 93, delivery: 'Delivery Tomorrow', rating: '4.1', reviewCount: 35375, badge: 'Trending' },
    { id: '2', title: 'Prestige Marvel Plus 3 Burner Glass Top, GTM 03, Black, Manual Ignition', image: '/assets/kitchen/6/1.png', price: 395, originalPrice: 5999, discount: 98, delivery: 'Delivery Tomorrow', rating: '4.8', reviewCount: 32139, badge: '' },
    { id: '3', title: 'Pigeon by Stovekraft Hard Anodised Aluminium Pressure Cooker Combo - 2 L, 3 L and 5 L Induction Base Outer Lid Cooker (14414, Black)', image: '/assets/kitchen/2/1.png', price: 395, originalPrice: 5749, discount: 92, delivery: 'Delivery Tomorrow', rating: '4.3', reviewCount: 90652, badge: 'Trending' },
    { id: '4', title: 'Hawkins 3 Litre Contura Black Pressure Cooker, Hard Anodised Inner Lid Cooker, Handi Cooker, Black (CB30)', image: '/assets/kitchen/3/1.png', price: 365, originalPrice: 3499, discount: 95, delivery: 'Delivery Tomorrow', rating: '4.8', reviewCount: 10415, badge: 'Trending' },
    { id: '5', title: 'Prestige Iris Plus 750 W Mixer Grinder With 4 Jars (3 Stainless Steel Jars+ 1 Juicer Jar) 4 Super Ef', image: '/assets/kitchen/4/1.png', price: 355, originalPrice: 2998, discount: 88, delivery: 'Delivery Tomorrow', rating: '4.8', reviewCount: 53207, badge: '' },
    { id: '6', title: 'BAJAJ Military 1000 W Mixer Grinder (Evoque 4 Jar 1000W Jet Black Mixer Grinder | 4 Jars | Black & Copper)k', image: '/assets/kitchen/5/1.png', price: 495, originalPrice: 6790, discount: 93, delivery: 'Delivery Tomorrow', rating: '4.6', reviewCount: 20342, badge: 'Trending' },
    { id: '7', title: 'Havells Instanio 3L Instant Water Heater(Geyser)| Temp. Sensing LED Indicator| Rust & Shock Proof Body| ISI Marked|Warranty: 5 year on Inner Tank| High Rise Compatible (White Blue)', image: '/assets/kitchen/7/1.png', price: 495, originalPrice: 4500, discount: 92, delivery: 'Delivery Tomorrow', rating: '5.0', reviewCount: 13728, badge: '' },
    { id: '8', title: 'Elica Vetro Glass Top 4 Burner Auto Ignition Gas Stove (694 CT VETRO SS AI), Black', image: '/assets/kitchen/8/1.png', price: 395, originalPrice: 3599, discount: 89, delivery: 'Delivery Tomorrow', rating: '4.7', reviewCount: 90480, badge: '' },
    { id: '9', title: 'Sujata Powermatic Maxima Juicer Mixer Grinder|900 Watts | 3 Jars including 1750ml Blender, 1000ml Grinder, 500ml Chutney Jar', image: '/assets/kitchen/9/1.png', price: 385, originalPrice: 6065, discount: 95, delivery: 'Delivery Tomorrow', rating: '4.0', reviewCount: 3858, badge: '' },
    { id: '10', title: 'Wonderchef Nutri-blend Juicer, Mixer, Grinder & Chopper|400W 100% Full Copper Motor| Complete Kitchen', image: '/assets/kitchen/10/1.png', price: 335, originalPrice: 3544, discount: 90, delivery: 'Delivery Tomorrow', rating: '4.8', reviewCount: 47251, badge: '' },
    { id: '11', title: 'MILTON Euroline Combo Set Go Electro Stainless Steel Electric Kettle, 1.5 Litres, Silver And Flip Lid Thermosteel Hot Or Cold Stainless Steel Water Bottle With Jacket, 1 Litre, Silver,1500 Watts', image: '/assets/kitchen/11/1.png', price: 375, originalPrice: 3749, discount: 92, delivery: 'Delivery Tomorrow', rating: '4.2', reviewCount: 5784, badge: 'Trending' },
    { id: '12', title: 'TEXUM TEK-HK60 Electric Kettle 2L (1500W) + Premium Water Bottle Combo – Double Layer Stainless Steel Body, Quick Boil Technology, Auto Shut Off, Perfect for Hot Water, Black Tea & Coffee', image: '/assets/kitchen/12/1.png', price: 345, originalPrice: 3749, discount: 92, delivery: 'Delivery Tomorrow', rating: '4.6', reviewCount: 63953, badge: 'Trending' },
    { id: '13', title: 'Orient Electric Arc Plus 1.5kw Immersion water heater|100% shock proof body|Heavy copper element With Bucket clip| ISI certified  2 years replacement warranty', image: '/assets/kitchen/13/1.png', price: 275, originalPrice: 1749, discount: 92, delivery: 'Delivery Tomorrow', rating: '4.2', reviewCount: 20716, badge: 'Trending' },
    { id: '14', title: 'Havells Dry Iron Dazzle 1100 Watts, Iron Press, Greblon Non Sick Soleplate with German Technology, Shock Proof Body, Aerodynamic Design, 360° Swivel Cord, 2 Year Manufacturer Warranty (Black)', image: '/assets/kitchen/14/1.png', price: 345, originalPrice: 2149, discount: 92, delivery: 'Delivery Tomorrow', rating: '4.7', reviewCount: 32770, badge: 'Trending' },
    { id: '15', title: 'Orient Electric Areva Portable Room Heater | 2000W | Two Heating Modes | Advanced Overheat Protection | Horizontal & Vertical Mount | 1-year replacement warranty by Orient | White', image: '/assets/kitchen/15/1.png', price: 495, originalPrice: 4500, discount: 92, delivery: 'Delivery Tomorrow', rating: '4.3', reviewCount: 71528, badge: '' },
    { id: '16', title: 'LG 28 L Convection Microwave Oven (MC2846SL, Silver)', image: '/assets/kitchen/16/1.png', price: 395, originalPrice: 4789, discount: 92, delivery: 'Delivery Tomorrow', rating: '4.7', reviewCount: 52793, badge: '' },
    { id: '17', title: 'Panini Press Grill, Yabano Gourmet Sandwich Maker Non-Stick Coated Plates 11\" x 9.8\", Opens 180 Degrees', image: '/assets/kitchen/17/1.png', price: 355, originalPrice: 3199, discount: 95, delivery: 'Delivery Tomorrow', rating: '4.8', reviewCount: 25273, badge: 'Trending' },
    { id: '18', title: 'Havells Aqua Plus Electric Kettle 1500W | 1.2L Double Layer Cool-Touch Body | Stainless Steel Inner | Auto Shut-off | Blue', image: '/assets/kitchen/18/1.png', price: 395, originalPrice: 4588, discount: 96, delivery: 'Delivery Tomorrow', rating: '4.2', reviewCount: 5908, badge: '' },
    { id: '19', title: 'TOSHIBA Countertop Microwave Oven Air Fryer Combo, Inverter, Convection, Broil, Speedy Combi, Even D', image: '/assets/kitchen/19/1.png', price: 445, originalPrice: 4399, discount: 91, delivery: 'Delivery Tomorrow', rating: '4.4', reviewCount: 11432, badge: '' },
    { id: '20', title: 'Cookwell Bullet Mixer Grinder (5 Jar, 3 Blade, Silver)', image: '/assets/kitchen/20/1.png', price: 245, originalPrice: 5999, discount: 95, delivery: 'Delivery Tomorrow', rating: '4.9', reviewCount: 47601, badge: '' },
    { id: '21', title: 'Juicer, 600W Juicer Machine with 3.5 Inch Wide Chute for Whole Fruits, High Yield Juice Extractor', image: '/assets/kitchen/21/1.png', price: 495, originalPrice: 6399, discount: 96, delivery: 'Delivery Tomorrow', rating: '4.3', reviewCount: 18573, badge: '' },
    { id: '22', title: 'Teivio 32-Piece Kitchen Plastic Wheat Straw Dinnerware Set, Service for 8, Dinner Plates, Dessert Plate', image: '/assets/kitchen/22/1.png', price: 285, originalPrice: 6520, discount: 95, delivery: 'Delivery Tomorrow', rating: '4.9', reviewCount: 17287, badge: 'Trending' },
    { id: '23', title: 'INALSA Air Fryer 1400W with 4.2 Liter Capacity|2 Year Warranty|Air Crisp Technology|Timer Selection and Full Temperature Control|Auto Cut off |(Gourmia)(Black)', image: '/assets/kitchen/23/1.png', price: 395, originalPrice: 4999, discount: 91, delivery: 'Delivery Tomorrow', rating: '4.9', reviewCount: 19501, badge: '' },
    { id: '24', title: 'AGARO Ace Wet&Dry Vacuum Cleaner,1600 Watts,21.5 Kpa Suction Power,21 litres Tank Capacity,for Home Use,Blower Function,Washable 3L Dust Bag,Stainless Steel Body(Black/Red/Steel) 21 Liter,HEPA', image: '/assets/kitchen/24/1.png', price: 445, originalPrice: 8588, discount: 96, delivery: 'Delivery Tomorrow', rating: '4.7', reviewCount: 88838, badge: 'Trending' },
    { id: '25', title: 'Philips HR3705/10 300 Watt Lightweight Hand Mixer, Blender with 5 speed control settings, stainless steel accessories and 2 years warranty', image: '/assets/kitchen/25/1.png', price: 385, originalPrice: 2588, discount: 93, delivery: 'Delivery Tomorrow', rating: '4.7', reviewCount: 60737, badge: '' },
    { id: '26', title: 'Hawkins 3 Litre Inner Lid Pressure Cooker, Stainless Steel Cooker, Wide Design Pan Cooker, Induction Cooker, Silver (HSS3W)', image: '/assets/kitchen/26/1.png', price: 395, originalPrice: 3158, discount: 90, delivery: 'Delivery Tomorrow', rating: '4.2', reviewCount: 33093, badge: 'Trending' },
    { id: '27', title: 'Hawkins Futura 6 Litre Cook n Serve Bowl, Hard Anodised Saucepan with Hard Anodised Lid, Sauce Pan for Cooking and Serving, Black (ACB60) (Aluminium)', image: '/assets/kitchen/27/1.png', price: 395, originalPrice: 11588, discount: 96, delivery: 'Delivery Tomorrow', rating: '4.9', reviewCount: 64312, badge: 'Trending' },
    { id: '28', title: 'Flipkart Basics Aluminium Non-Stick Black Cookware Set - 15 Piece', image: '/assets/kitchen/28/1.png', price: 385, originalPrice: 3599, discount: 91, delivery: 'Delivery Tomorrow', rating: '4.9', reviewCount: 23102, badge: 'Trending' }
];

list.forEach(item => {
    let prod = products.find(p => p.id === item.id);
    if (!prod) {
        prod = { id: item.id };
        products.push(prod);
    }

    if (!prod.slug) prod.slug = 'product-' + item.id;
    prod.image = item.image;
    if (!prod.images) prod.images = [item.image];
    prod.title = item.title;
    prod.rating = parseFloat(item.rating);
    prod.reviewCount = item.reviewCount;
    prod.currentPrice = item.price;
    prod.originalPrice = item.originalPrice;
    prod.discount = item.discount;
    prod.badge = item.badge || '';
    prod.deliveryText = item.delivery;
    prod.highlights = ['No Cash On Delivery', '7 days Replacement', 'Plus (F-Assured)'];
    if (!prod.offers) prod.offers = ['Offer ends in 12min 30sec'];
    if (!prod.similarProducts) {
        prod.similarProducts = list.filter(s => s.id !== prod.id).map(s => ({
            id: s.id, title: s.title, image: s.image, price: s.originalPrice, emi: s.price, rating: parseFloat(s.rating) * 20, delivery: s.delivery
        }));
    }
});

fs.writeFileSync(path, JSON.stringify(products, null, 2), 'utf8');
console.log('Successfully injected 28 items!');
