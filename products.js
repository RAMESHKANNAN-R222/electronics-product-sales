// Electronic Products Database
const PRODUCTS = [
    {
        id: "prod-1",
        name: "Volta Pro ANC Headphones",
        category: "audio",
        price: 249.99,
        originalPrice: 299.99,
        rating: 4.9,
        reviewsCount: 128,
        inStock: true,
        stockCount: 18,
        badge: "Bestseller",
        image: "assets/images/headphones.jpg",
        description: "Immerse yourself in high-fidelity audio with active noise cancellation, custom dynamic drivers, and up to 40 hours of battery life.",
        specs: {
            "Battery Life": "40 Hours",
            "Connectivity": "Bluetooth 5.3 / AUX",
            "Noise Cancellation": "Active (ANC) & Transparency Mode",
            "Weight": "250g",
            "Warranty": "2 Years International"
        }
    },
    {
        id: "prod-2",
        name: "Novatech CyberBlade Ultra Laptop",
        category: "laptops",
        price: 1499.99,
        originalPrice: 1699.99,
        rating: 4.95,
        reviewsCount: 94,
        inStock: true,
        stockCount: 7,
        badge: "Flagship",
        image: "assets/images/laptop.jpg",
        description: "Next-gen ultra-thin gaming & creator laptop featuring OLED 165Hz display, Intel i9 Processor, and NVIDIA RTX graphics.",
        specs: {
            "Processor": "Intel Core i9 14900H",
            "RAM": "32GB DDR5 5600MHz",
            "Storage": "1TB NVMe Gen4 SSD",
            "Display": "15.6\" 4K OLED 165Hz",
            "GPU": "NVIDIA GeForce RTX 4080"
        }
    },
    {
        id: "prod-3",
        name: "Titanium Chronos Smartwatch Pro",
        category: "wearables",
        price: 329.99,
        originalPrice: 379.99,
        rating: 4.85,
        reviewsCount: 210,
        inStock: true,
        stockCount: 25,
        badge: "Popular",
        image: "assets/images/smartwatch.jpg",
        description: "Rugged aerospace-grade titanium smartwatch with advanced health metrics, dual-frequency GPS, and 14-day battery life.",
        specs: {
            "Case Material": "Grade 5 Titanium",
            "Display": "1.4\" AMOLED Sapphire Glass",
            "Sensors": "ECG, SpO2, Heart Rate, Temperature",
            "Water Resistance": "100m (10 ATM)",
            "Battery": "Up to 14 Days"
        }
    },
    {
        id: "prod-4",
        name: "VirtualX Spatial VR Headset",
        category: "gaming",
        price: 599.99,
        originalPrice: 699.99,
        rating: 4.75,
        reviewsCount: 86,
        inStock: true,
        stockCount: 12,
        badge: "New Release",
        image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
        description: "Step into ultra-realistic virtual worlds with dual 4K micro-OLED screens, spatial audio, and hand-tracking precision.",
        specs: {
            "Resolution": "2160x2160 per eye",
            "Refresh Rate": "120Hz",
            "Field of View": "110 Degrees",
            "Weight": "380g",
            "Tracking": "6 DoF Inside-Out Tracking"
        }
    },
    {
        id: "prod-5",
        name: "ApexRGB Mechanical Keyboard",
        category: "accessories",
        price: 139.99,
        originalPrice: 169.99,
        rating: 4.9,
        reviewsCount: 342,
        inStock: true,
        stockCount: 40,
        badge: "Hot Deal",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
        description: "Custom hot-swappable mechanical keyboard featuring sound-dampening foam, per-key RGB lighting, and wireless tri-mode connection.",
        specs: {
            "Switches": "Pre-lubed Linear Custom Switches",
            "Keycaps": "PBT Double-shot Shine-through",
            "Connection": "2.4GHz / Bluetooth 5.0 / USB-C",
            "Layout": "75% Compact",
            "Battery": "4000mAh (Up to 200h RGB Off)"
        }
    },
    {
        id: "prod-6",
        name: "VisionMax 34\" Curved 4K OLED Monitor",
        category: "laptops",
        price: 899.99,
        originalPrice: 1099.99,
        rating: 4.92,
        reviewsCount: 65,
        inStock: true,
        stockCount: 5,
        badge: "Limited Stock",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
        description: "Ultra-wide 1800R curved gaming monitor delivering true blacks, 0.03ms response time, and Quantum Dot OLED technology.",
        specs: {
            "Screen Size": "34 Inch Curved UltraWide",
            "Resolution": "3440 x 1440 WQHD",
            "Response Time": "0.03ms (GtG)",
            "Refresh Rate": "240Hz",
            "Ports": "2x HDMI 2.1, 1x DP 1.4, USB-C 90W"
        }
    },
    {
        id: "prod-7",
        name: "PulsePods Pro Wireless Earbuds",
        category: "audio",
        price: 179.99,
        originalPrice: 199.99,
        rating: 4.8,
        reviewsCount: 189,
        inStock: true,
        stockCount: 30,
        badge: "Trending",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
        description: "Compact wireless earbuds with spatial audio tracking, custom acoustic architecture, and IPX5 water resistance.",
        specs: {
            "Audio": "Spatial Audio with Dynamic Head Tracking",
            "Battery": "8 Hours (32 Hours with Case)",
            "Water Resistance": "IPX5 Sweatproof",
            "Charging": "MagSafe & Qi Wireless",
            "Microphones": "Triple Noise-Canceling Mics"
        }
    },
    {
        id: "prod-8",
        name: "Aura Home Smart Hub & Speaker",
        category: "smarthome",
        price: 119.99,
        originalPrice: 149.99,
        rating: 4.65,
        reviewsCount: 95,
        inStock: true,
        stockCount: 15,
        badge: "Smart Choice",
        image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80",
        description: "360-degree room-filling acoustic speaker with integrated voice assistant, Zigbee smart home hub, and ambient LED light ring.",
        specs: {
            "Audio Drivers": "3.5\" Woofer + Dual Tweeters",
            "Smart Protocols": "Matter, Thread, Zigbee, Wi-Fi 6",
            "Microphones": "Far-Field Voice Array",
            "Controls": "Touch Surface & Voice Control",
            "Compatibility": "iOS, Android, Alexa, Google Home"
        }
    },
    {
        id: "prod-9",
        name: "Starlight Pro 4K Camera Drone",
        category: "gaming",
        price: 749.99,
        originalPrice: 849.99,
        rating: 4.88,
        reviewsCount: 47,
        inStock: true,
        stockCount: 9,
        badge: "Top Rated",
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
        description: "Professional foldable aerial drone with 1-inch CMOS sensor, 4K/60fps video recording, and 3-axis mechanical gimbal.",
        specs: {
            "Camera": "4K UHD 60fps 1\" Sensor",
            "Flight Time": "45 Minutes",
            "Transmission Range": "15 km HD Video",
            "Obstacle Avoidance": "Omnidirectional Sensors",
            "Weight": "595g"
        }
    },
    {
        id: "prod-10",
        name: "ChargeVolt 25,000mAh Power Station",
        category: "accessories",
        price: 89.99,
        originalPrice: 109.99,
        rating: 4.82,
        reviewsCount: 275,
        inStock: true,
        stockCount: 50,
        badge: "Essential",
        image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=800&q=80",
        description: "Ultra-fast 140W USB-C PD power bank capable of charging laptops, phones, and accessories simultaneously.",
        specs: {
            "Capacity": "25,000mAh (90Wh)",
            "Max Power Output": "140W Total USB-C PD 3.1",
            "Ports": "2x USB-C, 1x USB-A",
            "Display": "Smart OLED Status Screen",
            "Recharge Speed": "0 to 80% in 30 Mins"
        }
    }
];
