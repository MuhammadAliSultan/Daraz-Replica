require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const PRODUCTS = [
    // Electronic Devices
    {
        title: "iPhone 14 Pro Max",
        price: 450000,
        category: "Electronic Devices",
        image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=800&q=80",
        brand: "Apple",
        rating: 5,
        description: "Experience the ultimate iPhone with the iPhone 14 Pro Max. Featuring the Dynamic Island, a magical new way to interact with iPhone. Keep important info in your view with the Always-On display. Powered by the A16 Bionic chip for lightning-fast performance and equipped with a 48MP Main camera for up to 4x greater resolution."
    },
    {
        title: "Samsung Galaxy S23 Ultra",
        price: 380000,
        category: "Electronic Devices",
        image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=800&q=80",
        brand: "Samsung",
        rating: 4.9,
        description: "The Galaxy S23 Ultra is the ultimate smartphone for content creators and power users. It boasts a massive 200MP camera sensor for crystal clear photos day or night. The built-in S Pen allows for precise editing and note-taking. Enjoy gaming and streaming on the stunning 6.8-inch QHD+ Dynamic AMOLED 2X display."
    },
    {
        title: "MacBook Air M2",
        price: 320000,
        category: "Electronic Devices",
        image: "https://images.unsplash.com/photo-1661961111184-11317b40adb2?auto=format&fit=crop&w=800&q=80",
        brand: "Apple",
        rating: 4.8,
        description: "Redesigned around the next-generation M2 chip, MacBook Air is strikingly thin and brings exceptional speed and power efficiency within its durable all-aluminum enclosure. It features a brilliant Liquid Retina display, HD camera and audio, MagSafe charging, and huge battery life."
    },

    // Electronic Accessories
    {
        title: "Sony WH-1000XM5 Headphones",
        price: 85000,
        category: "Electronic Accessories",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        brand: "Sony",
        rating: 4.7,
        description: "The Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation and exceptional call quality. With a newly developed driver, DSEE – Extreme and Hires Audio support the WH-1000XM5 headphones provide awe-inspiring audio quality."
    },
    {
        title: "Anker PowerCore 20000mAh",
        price: 12000,
        category: "Electronic Accessories",
        image: "https://images.unsplash.com/photo-1609091839311-d536819bc2b8?auto=format&fit=crop&w=800&q=80",
        brand: "Anker",
        rating: 4.6,
        description: "Ultra-high capacity portable charger with 20000mAh power, enough to charge an iPhone 14 multiple times. Features PowerIQ and VoltageBoost technologies to deliver the fastest possible charge to any device. Durable and travel-friendly design makes it the perfect companion for your gadgets."
    },
    {
        title: "Logitech MX Master 3S Mouse",
        price: 25000,
        category: "Electronic Accessories",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
        brand: "Logitech",
        rating: 4.9,
        description: "Meet MX Master 3S – an iconic mouse remastered. Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and an 8,000 DPI track-on-glass sensor. Ergonomically designed to support your hand and wrist for all-day comfort."
    },

    // TV & Home Appliances
    {
        title: "Samsung 55 Inch 4K Smart TV",
        price: 150000,
        category: "TV & Home Appliances",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
        brand: "Samsung",
        rating: 4.5,
        description: "Immerse yourself in crystal clear color with the Samsung 55 Inch 4K Smart TV. PurColor makes watching films feel almost like you're there. Crystal Processor 4K upscales all your content to near 4K resolution. Smart Hub keeps all your favorite entertainment in one place."
    },
    {
        title: "Dawlance Inverter AC 1.5 Ton",
        price: 110000,
        category: "TV & Home Appliances",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
        brand: "Dawlance",
        rating: 4.4,
        description: "Save up to 60% on energy with the Dawlance Inverter AC. Designed for Pakistan's climate, it provides powerful cooling even at 50°C. Features a gold fin coating for durability and an easy-to-clean filter for hygienic air. Smart WiFi control allows you to operate it from anywhere."
    },
    {
        title: "Philips Air Fryer XL",
        price: 35000,
        category: "TV & Home Appliances",
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
        brand: "Philips",
        rating: 4.6,
        description: "Enjoy healthy food that's crispy on the outside and tender on the inside with little to no oil. The Philips Air Fryer XL uses Rapid Air Technology to cook your favorite meals faster and healthier. Large capacity fits a whole chicken or 1.2kg of fries for the whole family."
    },

    // Health & Beauty
    {
        title: "CeraVe Moisturizing Cream",
        price: 4500,
        category: "Health & Beauty",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
        brand: "CeraVe",
        rating: 4.8,
        description: "Developed with dermatologists, CeraVe Moisturizing Cream has a unique formula that provides 24-hour hydration and helps restore the protective skin barrier with three essential ceramides. This rich, non-greasy, fast-absorbing cream is suitable for dry to very dry skin on the face and body."
    },
    {
        title: "The Ordinary Niacinamide Serum",
        price: 3200,
        category: "Health & Beauty",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143f7c0e?auto=format&fit=crop&w=800&q=80",
        brand: "The Ordinary",
        rating: 4.7,
        description: "A high-strength vitamin and mineral blemish formula. Niacinamide (Vitamin B3) utilizes a high 10% concentration to reduce the appearance of skin blemishes and congestion. Zinc PCA is added to balance visible aspects of sebum activity, making skin look smoother and clearer."
    },
    {
        title: "Maybelline Fit Me Foundation",
        price: 2500,
        category: "Health & Beauty",
        image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
        brand: "Maybelline",
        rating: 4.3,
        description: "Fit Me Matte + Poreless Foundation creates a natural, seamless finish. This lightweight liquid foundation mattifies and refines pores, leaving a natural, seamless finish. Ideal for normal to oily skin, the exclusive formula with micro-powders controls shine and blurs pores."
    },

    // Babies & Toys
    {
        title: "Pampers Premium Care Pants",
        price: 3500,
        category: "Babies & Toys",
        image: "https://images.unsplash.com/photo-1544126592-807daa2b5d32?auto=format&fit=crop&w=800&q=80",
        brand: "Pampers",
        rating: 4.8,
        description: "Pampers Premium Care Pants give your baby 5-star skin protection. With a soft, cotton-like material and 360-degree fit, they're gentle on your baby's delicate skin. The wetness indicator turns blue to let you know when it might be time for a change. Up to 12 hours of dryness."
    },
    {
        title: "LEGO Classic Creative Bricks",
        price: 8000,
        category: "Babies & Toys",
        image: "https://images.unsplash.com/photo-1560647102-c997bc714101?auto=format&fit=crop&w=800&q=80",
        brand: "LEGO",
        rating: 4.9,
        description: "Unleash a world of open-ended creativity and imagination with the LEGO Classic Creative Bricks box. It includes a wide range of LEGO bricks in 35 different colors. With windows, eyes, and lots of wheels, this set offers endless possibilities for creative construction and vehicle play."
    },
    {
        title: "Remote Control Car",
        price: 4500,
        category: "Babies & Toys",
        image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=80",
        brand: "Generic",
        rating: 4.2,
        description: "High-speed drifting remote control car for kids. This 1:18 scale racing car features a durable body, shock absorbers, and anti-slip tires for superior handling on various terrains. The 2.4GHz remote ensures interference-free control for multiplayer racing fun."
    },

    // Groceries & Pets
    {
        title: "Dalda Cooking Oil 5L",
        price: 3000,
        category: "Groceries & Pets",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
        brand: "Dalda",
        rating: 4.5,
        description: "Dalda Cooking Oil is Vitamin A & D enriched and is 100% cholesterol-free. It retains the natural flavor of food while keeping it light and healthy. Perfect for all types of cooking, frying, and baking needs. Trusted by generations for quality and purity."
    },
    {
        title: "Nestle Everyday Milk Powder",
        price: 1800,
        category: "Groceries & Pets",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
        brand: "Nestle",
        rating: 4.6,
        description: "Nestle Everyday Tea Whitener makes the perfect cup of tea every time. Specially formulated to enhance the taste and aroma of your tea with its rich and creamy texture. Contains essential vitamins and minerals. Enjoy a refreshing and energizing tea break with Nestle Everyday."
    },
    {
        title: "Whiskas Cat Food",
        price: 2200,
        category: "Groceries & Pets",
        image: "https://images.unsplash.com/photo-1589924691106-073b138d0dc7?auto=format&fit=crop&w=800&q=80",
        brand: "Whiskas",
        rating: 4.7,
        description: "Whiskas Adult Dry Cat Food provides 100% complete and balanced nutrition for your cat. Made with high-quality ingredients including real meat and essential nutrients. Supports healthy eyesight, a shiny coat, and a strong immune system. The crunchy kibble also helps clean teeth."
    },

    // Home & Lifestyle
    {
        title: "King Size Bed Sheet Set",
        price: 2500,
        category: "Home & Lifestyle",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        brand: "ChenOne",
        rating: 4.1,
        description: "Transform your bedroom with this luxurious King Size Bed Sheet Set. Made from premium quality cotton for softness and durability. The set includes one flat sheet and two matching pillowcases. Features a stylish print that adds a touch of elegance to any room decor."
    },
    {
        title: "Non-Stick Cooking Set",
        price: 8500,
        category: "Home & Lifestyle",
        image: "https://images.unsplash.com/photo-1584990344616-3b94b3357830?auto=format&fit=crop&w=800&q=80",
        brand: "Chef",
        rating: 4.4,
        description: "15-piece non-stick cookware set including frying pans, saucepans, and cooking spoons. The durable non-stick coating ensures easy food release and quick cleanup. Heat-resistant handles provide a comfortable grip. Compatible with gas, electric, and ceramic stovetops."
    },
    {
        title: "Memory Foam Pillow",
        price: 3000,
        category: "Home & Lifestyle",
        image: "https://images.unsplash.com/photo-1632102911919-8358f54c69b3?auto=format&fit=crop&w=800&q=80",
        brand: "MoltyFoam",
        rating: 4.5,
        description: "Experience superior comfort and support with this orthopedic Memory Foam Pillow. It contours to the shape of your head and neck to relieve pressure points and align your spine. The breathable cover keeps you cool throughout the night. Ideal for side, back, and stomach sleepers."
    },

    // Women's Fashion
    {
        title: "Sapphire Lawn 3pc Suit",
        price: 4500,
        category: "Women's Fashion",
        image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80",
        brand: "Sapphire",
        rating: 4.6,
        description: "Elegant 3-piece unstitched lawn suit from Sapphire's latest collection. Features a vibrant digital printed shirt, dyed cambric trousers, and a printed voile dupattas. The soft and breathable fabric is perfect for the summer season. Create your own style with this versatile ensemble."
    },
    {
        title: "Ladies Leather Handbag",
        price: 5000,
        category: "Women's Fashion",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        brand: "Jafferjees",
        rating: 4.3,
        description: "Stylish and spacious ladies' handbag made from high-quality PU leather. Features multiple compartments to organize your essentials like phone, wallet, and keys. The classic design with gold-tone hardware complements both casual and formal outfits. Includes a detachable shoulder strap."
    },
    {
        title: "Classic Black Heels",
        price: 3500,
        category: "Women's Fashion",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
        brand: "Stylo",
        rating: 4.2,
        description: "Step out in style with these timeless Classic Black Heels. Designed for comfort and elegance, they feature a pointed toe and a sturdy stiletto heel. The cushioned insole ensures you can wear them all day or night. Perfect for parties, weddings, or office wear."
    },

    // Men's Fashion
    {
        title: "Levi's 501 Original Jeans",
        price: 8000,
        category: "Men's Fashion",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
        brand: "Levi's",
        rating: 4.7,
        description: "The original blue jean since 1873. The Levi's 501 Original Fit Jeans featuring the iconic straight fit with the signature button fly. Made from durable, non-stretch denim that looks and feels better with every wear. A wardrobe staple that never goes out of style."
    },
    {
        title: "Men's Cotton Polo Shirt",
        price: 1500,
        category: "Men's Fashion",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
        brand: "Outfitters",
        rating: 4.1,
        description: "Classic fit polo shirt crafted from soft and breathable pique cotton. Features a ribbed collar and cuffs with a two-button placket. The versatile design looks great paired with jeans, chinos, or shorts. Available in a variety of colors to suit your style."
    },
    {
        title: "Formal Leather Shoes",
        price: 6500,
        category: "Men's Fashion",
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80",
        brand: "Bata",
        rating: 4.5,
        description: "Elevate your formal look with these premium leather Lace-up Shoes. Handcrafted for a sophisticated finish and long-lasting durability. The padded footbed provides cushion and support for all-day comfort. Ideal for business meetings, weddings, and formal events."
    },

    // Watches, Bags & Jewelery
    {
        title: "Casio G-Shock Watch",
        price: 25000,
        category: "Watches, Bags & Jewelery",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
        brand: "Casio",
        rating: 4.8,
        description: "Built tough, the Casio G-Shock is shock-resistant and water-resistant up to 200 meters. Features a digital display with stopwatch, countdown timer, and alarm functions. The rugged design makes it perfect for sports and outdoor adventures. Reliable timekeeping you can trust."
    },
    {
        title: "Gold Plated Necklace",
        price: 3500,
        category: "Watches, Bags & Jewelery",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
        brand: "Generic",
        rating: 4.0,
        description: "Exquisite gold-plated necklace set with sparkling zirconia stones. The intricate design adds a touch of glamour to any outfit. Includes matching earrings to complete the look. Perfect for gifting to loved ones on anniversaries, birthdays, or special occasions."
    },
    {
        title: "Travel Backpack",
        price: 4000,
        category: "Watches, Bags & Jewelery",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        brand: "Wildcraft",
        rating: 4.6,
        description: "Lightweight and durable travel backpack with a spacious main compartment and multiple pockets. Made from water-resistant fabric to keep your belongings safe. Features padded shoulder straps and a breathable back panel for maximum carrying comfort. Ideal for hiking, camping, or daily commute."
    }
];

const importData = async () => {
    try {
        await connectDB();
        console.log('Clearing existing products...');
        await Product.deleteMany({});

        console.log('Inserting custom products with Unsplash images...');
        await Product.insertMany(PRODUCTS);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
