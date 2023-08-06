# E-Commerce

## Introduction

This is an open-source E-Commerce project built using Next.js, Sanity.io, Stripe, TypeScript, and Shadcn-UI. The project aims to provide a simple and customizable platform for creating and managing online stores.

## Features

- User-friendly and responsive design.
- Product catalog with detailed product pages.
- Shopping cart and checkout functionality powered by Stripe integration.
- Admin dashboard to manage products and inventory with Sanity.io.
- Search functionality for products.

## Technologies Used

- Next.js: A popular React framework for building server-rendered React applications.
- Sanity.io: A headless CMS that enables easy content management and data storage.
- Stripe: A secure payment gateway for processing online transactions.
- TypeScript: A typed superset of JavaScript, providing improved tooling and code safety.
- shadcn/ui: A UI component library that uses Tailwind CSS for building modern and visually appealing interfaces.

## Getting Started

To get started with the project, follow these instructions.

## Installation

1. Clone the repository to your local machine.
```
git clone https://github.com/matews-sousa/ecommerce.git
cd ecommerce
```

2. Install the required dependencies using npm or yarn.

```bash
npm install
# or
yarn install
```

## Configuration

Before running the project, you need to configure some environment variables.

1. Create a `.env.local` file in the root of the project.
2. Add the necessary environment variables as follows:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
SANITY_DATASET_NAME=your_sanity_dataset_name
SANITY_PROJECT_ID=your_sanity_project_id
```

## Usage

Once the project is set up and configured, you can start the development server.
```
npm run dev
# or
yarn dev
```
Open your browser and navigate to http://localhost:3000 to view the application.

You can access the Sanity Studio navigating to http://localhost:3000/studio and authenticate yourself.

