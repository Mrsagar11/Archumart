const { connectToDatabase } = require('./utils/db');

// Realistic starting products to auto-seed if the database is empty
const defaultProducts = [
  {
    id: 1,
    name: 'Premium School Backpack',
    category: 'School & Stationery',
    categoryId: 'school-stationery',
    price: 699,
    originalPrice: 999,
    description: 'Durable, spacious backpack with multiple compartments. Perfect for school and college students. Features padded straps, water-resistant fabric, and a dedicated laptop sleeve.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    badge: 'Popular',
    inStock: true,
    rating: 4.5,
    reviews: 128,
    features: ['Water Resistant', 'Padded Straps', 'Multiple Pockets', 'Laptop Sleeve']
  },
  {
    id: 2,
    name: 'Kids Lunch Box Set',
    category: 'School & Stationery',
    categoryId: 'school-stationery',
    price: 249,
    originalPrice: 349,
    description: 'BPA-free lunch box set with 3 compartments and a matching water bottle. Leak-proof design keeps food fresh. Available in fun colors.',
    image: 'https://images.unsplash.com/photo-1604467707321-70d009801bf5?w=500&h=500&fit=crop',
    badge: 'Best Seller',
    inStock: true,
    rating: 4.3,
    reviews: 89,
    features: ['BPA Free', '3 Compartments', 'Leak-proof', 'Easy Clean']
  },
  {
    id: 3,
    name: 'Geometry Box Complete Set',
    category: 'School & Stationery',
    categoryId: 'school-stationery',
    price: 149,
    originalPrice: 199,
    description: 'Complete geometry box with compass, protractor, set squares, divider, and ruler. Essential for mathematics classes.',
    image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&h=500&fit=crop',
    badge: null,
    inStock: true,
    rating: 4.2,
    reviews: 65,
    features: ['Complete Set', 'Sturdy Case', 'Precision Tools', 'School Essential']
  },
  {
    id: 4,
    name: 'Colorful Notebook Bundle (5-Pack)',
    category: 'School & Stationery',
    categoryId: 'school-stationery',
    price: 199,
    originalPrice: 299,
    description: 'Set of 5 attractive notebooks with ruled pages. Available in vibrant cover designs. 200 pages each with high quality paper.',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&h=500&fit=crop',
    badge: 'New',
    inStock: true,
    rating: 4.4,
    reviews: 112,
    features: ['200 Pages Each', 'Ruled', '5 Colors', 'Quality Paper']
  },
  {
    id: 5,
    name: 'Pencil & Pen Combo Pack',
    category: 'School & Stationery',
    categoryId: 'school-stationery',
    price: 99,
    originalPrice: null,
    description: 'Essential writing kit with 10 pencils, 5 ball pens, an eraser, and a sharpener. Great value pack for everyday school use.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&h=500&fit=crop',
    badge: null,
    inStock: true,
    rating: 4.0,
    reviews: 45,
    features: ['10 Pencils', '5 Pens', 'Eraser Included', 'Sharpener Included']
  },
  {
    id: 6,
    name: 'Stainless Steel Water Bottle',
    category: 'Kitchen & Household',
    categoryId: 'kitchen-household',
    price: 299,
    originalPrice: 449,
    description: 'Premium 1-liter stainless steel water bottle. Double-wall insulated to keep drinks cold for 24 hours or hot for 12 hours. Leak-proof cap.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
    badge: 'Popular',
    inStock: true,
    rating: 4.6,
    reviews: 203,
    features: ['1 Liter', 'Double Wall', 'Insulated', 'Leak-proof']
  },
  {
    id: 7,
    name: 'Large Household Bucket (20L)',
    category: 'Kitchen & Household',
    categoryId: 'kitchen-household',
    price: 199,
    originalPrice: 249,
    description: 'Heavy-duty 20-liter plastic bucket with sturdy handle. Made from high-grade virgin plastic. Perfect for daily household use.',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop',
    badge: null,
    inStock: true,
    rating: 4.1,
    reviews: 78,
    features: ['20 Liters', 'Heavy Duty', 'Sturdy Handle', 'Virgin Plastic']
  },
  {
    id: 8,
    name: 'Kitchen Utensil Set (6-Piece)',
    category: 'Kitchen & Household',
    categoryId: 'kitchen-household',
    price: 399,
    originalPrice: 599,
    description: 'Complete 6-piece kitchen utensil set including spatula, ladle, slotted spoon, serving spoon, tongs, and whisk. Heat-resistant handles.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop',
    badge: 'Best Seller',
    inStock: true,
    rating: 4.4,
    reviews: 156,
    features: ['6 Pieces', 'Heat Resistant', 'Dishwasher Safe', 'Non-stick Friendly']
  },
  {
    id: 9,
    name: 'Premium Mug Set (4-Pack)',
    category: 'Kitchen & Household',
    categoryId: 'kitchen-household',
    price: 349,
    originalPrice: 449,
    description: 'Set of 4 ceramic mugs in assorted colors. Microwave and dishwasher safe. 350ml capacity each. Perfect for tea and coffee.',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop',
    badge: null,
    inStock: true,
    rating: 4.3,
    reviews: 92,
    features: ['4 Mugs', 'Ceramic', 'Microwave Safe', '350ml Each']
  },
  {
    id: 10,
    name: 'Cleaning Supplies Kit',
    category: 'Kitchen & Household',
    categoryId: 'kitchen-household',
    price: 279,
    originalPrice: null,
    description: 'Complete home cleaning kit with scrub brush, sponges, microfiber cloths, and a spray bottle. Everything you need to keep your home sparkling.',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&h=500&fit=crop',
    badge: null,
    inStock: true,
    rating: 4.0,
    reviews: 34,
    features: ['Complete Kit', 'Microfiber Cloths', 'Sponges', 'Spray Bottle']
  },
  {
    id: 11,
    name: 'Plastic Storage Container Set',
    category: 'Home & Storage',
    categoryId: 'home-storage',
    price: 249,
    originalPrice: 399,
    description: 'Set of 5 airtight plastic containers in different sizes. BPA-free, stackable design. Perfect for storing food, spices, and dry goods.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=500&fit=crop',
    badge: 'Popular',
    inStock: true,
    rating: 4.5,
    reviews: 167,
    features: ['5 Containers', 'Airtight', 'BPA Free', 'Stackable']
  },
  {
    id: 12,
    name: 'Multipurpose Storage Basket',
    category: 'Home & Storage',
    categoryId: 'home-storage',
    price: 179,
    originalPrice: 249,
    description: 'Durable woven-style plastic basket for organizing clothes, toys, or household items. Lightweight with comfortable handles.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
    badge: null,
    inStock: true,
    rating: 4.2,
    reviews: 83,
    features: ['Lightweight', 'Durable', 'Easy Carry', 'Multi-purpose']
  },
  {
    id: 13,
    name: 'Wardrobe Organizer Set',
    category: 'Home & Storage',
    categoryId: 'home-storage',
    price: 449,
    originalPrice: 599,
    description: 'Complete wardrobe organizer with shelf dividers, drawer organizers, and hanging organizers. Transform your closet space.',
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=500&h=500&fit=crop',
    badge: 'New',
    inStock: true,
    rating: 4.6,
    reviews: 54,
    features: ['Complete Set', 'Foldable', 'Space Saving', 'Durable Fabric']
  },
  {
    id: 14,
    name: 'Hanger Set (12-Pack)',
    category: 'Home & Storage',
    categoryId: 'home-storage',
    price: 199,
    originalPrice: null,
    description: 'Pack of 12 premium plastic hangers with non-slip design. Space-saving slim profile. Suitable for all types of clothing.',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&h=500&fit=crop',
    badge: null,
    inStock: true,
    rating: 4.1,
    reviews: 67,
    features: ['12 Hangers', 'Non-slip', 'Slim Profile', 'Space Saving']
  },
  {
    id: 15,
    name: 'Kids Educational Game Set',
    category: 'Kids & Toys',
    categoryId: 'kids-toys',
    price: 299,
    originalPrice: 449,
    description: 'Fun and educational game set for children aged 4-10. Includes puzzles, building blocks, and board games. Develops cognitive skills.',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&h=500&fit=crop',
    badge: 'Popular',
    inStock: true,
    rating: 4.7,
    reviews: 189,
    features: ['Age 4-10', 'Educational', 'Safe Materials', 'Multiple Games']
  },
  {
    id: 16,
    name: 'Soft Toy Teddy Bear',
    category: 'Kids & Toys',
    categoryId: 'kids-toys',
    price: 349,
    originalPrice: 499,
    description: 'Adorable 18-inch soft teddy bear made from premium plush material. Hypoallergenic and child-safe. Perfect gift for kids.',
    image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=500&h=500&fit=crop',
    badge: 'Best Seller',
    inStock: true,
    rating: 4.8,
    reviews: 234,
    features: ['18 Inches', 'Premium Plush', 'Hypoallergenic', 'Washable']
  },
  {
    id: 17,
    name: 'Art & Craft Kit for Kids',
    category: 'Kids & Toys',
    categoryId: 'kids-toys',
    price: 399,
    originalPrice: null,
    description: 'Complete art kit with crayons, colored pencils, sketch pens, watercolors, and craft paper. Inspires creativity in children.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop',
    badge: 'New',
    inStock: true,
    rating: 4.5,
    reviews: 76,
    features: ['Complete Kit', 'Non-toxic', 'Safe Colors', '60+ Pieces']
  },
  {
    id: 18,
    name: 'Gift Box Set - Premium',
    category: 'Gift Items',
    categoryId: 'gift-items',
    price: 349,
    originalPrice: 499,
    description: 'Elegant gift box set with premium packaging. Includes decorative box, tissue paper, ribbon, and gift tag. Perfect for any occasion.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=500&h=500&fit=crop',
    badge: 'Popular',
    inStock: true,
    rating: 4.4,
    reviews: 145,
    features: ['Premium Packaging', 'Ribbon Included', 'Gift Tag', 'Multiple Sizes']
  },
  {
    id: 19,
    name: 'Decorative Photo Frame Set',
    category: 'Gift Items',
    categoryId: 'gift-items',
    price: 499,
    originalPrice: 699,
    description: 'Set of 3 elegant photo frames in different sizes. Modern design with wooden finish. Perfect for home décor or gifting.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500&h=500&fit=crop',
    badge: null,
    inStock: true,
    rating: 4.3,
    reviews: 89,
    features: ['3 Frames', 'Wood Finish', 'Wall Mount', 'Table Stand']
  },
  {
    id: 20,
    name: 'Birthday Party Kit',
    category: 'Gift Items',
    categoryId: 'gift-items',
    price: 299,
    originalPrice: null,
    description: 'Complete birthday celebration kit with balloons, banner, party hats, plates, and napkins. Enough for 10 guests.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=500&fit=crop',
    badge: 'New',
    inStock: true,
    rating: 4.6,
    reviews: 102,
    features: ['10 Guests', 'Balloons', 'Banner', 'Complete Kit']
  },
  {
    id: 21,
    name: 'Scented Candle Gift Set',
    category: 'Gift Items',
    categoryId: 'gift-items',
    price: 449,
    originalPrice: 599,
    description: 'Set of 4 aromatic candles in premium glass jars. Fragrances include lavender, vanilla, jasmine, and rose. Long-lasting burn time.',
    image: 'https://images.unsplash.com/photo-1602607742459-0aa84b0e261f?w=500&h=500&fit=crop',
    badge: 'Best Seller',
    inStock: true,
    rating: 4.7,
    reviews: 178,
    features: ['4 Candles', 'Glass Jars', '4 Fragrances', 'Long Burn']
  },
  {
    id: 22,
    name: 'Multipurpose Plastic Jar Set',
    category: 'Daily Essentials',
    categoryId: 'daily-essentials',
    price: 199,
    originalPrice: 299,
    description: 'Set of 6 airtight plastic jars for storing spices, dry fruits, and other kitchen essentials. Clear body for easy identification.',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&h=500&fit=crop',
    badge: null,
    inStock: true,
    rating: 4.2,
    reviews: 98,
    features: ['6 Jars', 'Airtight', 'Clear Body', 'BPA Free']
  },
  {
    id: 23,
    name: 'Cloth Drying Stand',
    category: 'Daily Essentials',
    categoryId: 'daily-essentials',
    price: 599,
    originalPrice: 799,
    description: 'Foldable stainless steel cloth drying stand with multiple tiers. Rust-resistant coating. Holds up to 15kg of laundry.',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&h=500&fit=crop',
    badge: 'Popular',
    inStock: true,
    rating: 4.4,
    reviews: 143,
    features: ['Foldable', 'Stainless Steel', 'Rust Resistant', '15kg Capacity']
  },
  {
    id: 24,
    name: 'Dustbin with Swing Lid',
    category: 'Daily Essentials',
    categoryId: 'daily-essentials',
    price: 149,
    originalPrice: null,
    description: 'Sleek 12-liter dustbin with swing lid. Easy to clean, odor-resistant design. Perfect for kitchen, bathroom, or office.',
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=500&h=500&fit=crop',
    badge: null,
    inStock: true,
    rating: 4.0,
    reviews: 56,
    features: ['12 Liters', 'Swing Lid', 'Odor Resistant', 'Easy Clean']
  }
];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('products');

    switch (req.method) {
      case 'GET': {
        const idParam = req.query.id;

        if (idParam) {
          const product = await collection.findOne({ id: parseInt(idParam) });
          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }
          return res.status(200).json(product);
        }

        let products = await collection.find({}).toArray();
        if (products.length === 0) {
          await collection.insertMany(defaultProducts);
          products = defaultProducts;
        }

        products.sort((a, b) => a.id - b.id);
        return res.status(200).json(products);
      }

      case 'POST': {
        const data = req.body;
        if (!data.name || !data.price || !data.category) {
          return res.status(400).json({ error: 'Name, price, and category are required' });
        }

        const products = await collection.find({}).toArray();
        const maxId = products.reduce((max, p) => p.id > max ? p.id : max, 0);
        const newProduct = {
          ...data,
          id: maxId + 1,
          price: parseFloat(data.price),
          originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : null,
          inStock: data.inStock !== false,
          rating: data.rating ? parseFloat(data.rating) : 4.5,
          reviews: data.reviews ? parseInt(data.reviews) : 0,
          features: Array.isArray(data.features) ? data.features : []
        };

        await collection.insertOne(newProduct);
        return res.status(201).json(newProduct);
      }

      case 'PUT': {
        const data = req.body;
        const productId = parseInt(data.id);

        if (isNaN(productId)) {
          return res.status(400).json({ error: 'Product ID is required for update' });
        }

        const updateData = {
          name: data.name,
          category: data.category,
          categoryId: data.categoryId,
          price: parseFloat(data.price),
          originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : null,
          description: data.description,
          image: data.image,
          badge: data.badge,
          inStock: data.inStock !== false,
          features: Array.isArray(data.features) ? data.features : []
        };

        const result = await collection.updateOne({ id: productId }, { $set: updateData });

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ success: true, product: { id: productId, ...updateData } });
      }

      case 'DELETE': {
        const idParam = req.query.id;

        if (!idParam) {
          return res.status(400).json({ error: 'Product ID parameter is required' });
        }

        const result = await collection.deleteOne({ id: parseInt(idParam) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
      }

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
