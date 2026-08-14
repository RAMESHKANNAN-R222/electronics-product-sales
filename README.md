# ⚡ TechPulse Electronics - E-Commerce Web Application

A modern, high-performance, and visually stunning electronic product sales web application built with HTML5, Vanilla CSS3 (Custom CSS Design System, Glassmorphism, Cyber Dark/Light modes), and Modular ES6 JavaScript.

![TechPulse Hero](assets/images/hero.jpg)

---

## 🌟 Key Features

- **Futuristic Visual Design**: Custom dark & light theme system with cyber glowing neon accents (`#6366f1`, `#ec4899`, `#10b981`), glassmorphic cards, and smooth micro-interactions.
- **Dynamic Product Catalog**: Browse flagship electronics including wireless ANC headphones, 4K OLED gaming laptops, titanium smartwatches, spatial VR headsets, custom mechanical keyboards, and drones.
- **Interactive Search & Filtering**:
  - Instant live search bar with auto-filtering.
  - Category pill tabs (Audio, Laptops, Wearables, Gaming, Smart Home, Accessories).
  - Dynamic price range slider ($50 to $2000).
  - Sorting options (Popularity, Price Low-to-High, Price High-to-Low, Highest Rated).
- **Shopping Cart Drawer**:
  - Sliding side drawer with real-time subtotal, tax, and shipping calculations.
  - Quantity controls (`+` / `-`) and item removal.
  - Promo code integration (`TECH20` for instant $20 discount).
  - Persistent state saved in browser `localStorage`.
- **Product Specs Modal**: Deep-dive technical specification sheets, customer review ratings, and high-res imagery preview.
- **Checkout & Invoice Wizard**: Multi-step checkout form with shipping address validation, 256-bit simulated SSL payment, and order receipt generation.
- **Zero Build Dependencies**: Pure native Web standards — opens instantly in any browser and hosts free on GitHub Pages!

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

Follow these simple steps to upload your project to GitHub and host it live on the web for FREE:

### Step 1: Initialize Git & Commit Files
Open your terminal in this project folder (`d:\electronics product sales`) and run:

```bash
git init
git add .
git commit -m "Initial commit: TechPulse Electronic Product Sales Web Application"
```

### Step 2: Create a New Repository on GitHub
1. Go to [GitHub.com](https://github.com/new) and log in.
2. Click **New Repository**.
3. Name your repository (e.g., `electronics-product-sales`).
4. Keep it **Public** and leave "Add a README" **unchecked** (since we already have one).
5. Click **Create repository**.

### Step 3: Connect Local Repository & Push to GitHub
Copy the commands shown on GitHub under **"or push an existing repository from the command line"**:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/electronics-product-sales.git
git push -u origin main
```

*(Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username)*

### Step 4: Enable FREE GitHub Pages Hosting
1. On your GitHub repository page, click the **Settings** tab.
2. In the left sidebar, click **Pages** (under Code and automation).
3. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch** (or select GitHub Actions).
   - **Branch**: Select `main` and `/ (root)` folder.
4. Click **Save**.

🎉 Within 1-2 minutes, GitHub will generate your live public web link:
`https://YOUR_GITHUB_USERNAME.github.io/electronics-product-sales/`

---

## 🛠️ Project File Structure

```
electronics product sales/
├── assets/
│   └── images/
│       ├── hero.jpg          # Custom generated futuristic gadgets banner
│       ├── headphones.jpg    # ANC Headphones product photo
│       ├── laptop.jpg        # CyberBlade Ultra Laptop photo
│       └── smartwatch.jpg    # Titanium Smartwatch photo
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions auto-deploy pipeline
├── .gitignore                # OS & temp files filter
├── index.html                # Main semantic HTML structure
├── styles.css                # Custom CSS design system & responsiveness
├── products.js               # Electronics product dataset & specifications
├── app.js                    # Cart, search, filters & checkout engine
└── README.md                 # Documentation & hosting guide
```

---

## 💻 Local Preview

To view the website on your local machine:
Simply double-click `index.html` or open it in Google Chrome, Microsoft Edge, Firefox, or Safari!
