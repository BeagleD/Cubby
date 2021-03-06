const categories = {
  'Apparel & Accessories': [
    'Apparel & Accessories',
  ],
  'Arts, Crafts & Sewing': [
    'Art Supplies',
    'Beading & Jewelry-Making',
    'Cases & Transport',
    'Craft Supplies',
    'Fabric',
    'Fabric Painting & Dyeing',
    'Furniture & Accessories',
    'Knitting & Crochet',
    'Knitting Yarn',
    'Needlework',
    'Organization & Storage',
    'Photography',
    'Printmaking',
    'Safety & Cleaning',
    'Scrapbooking',
    'Sewing',
    'Sewing Fabric Care Products',
    'Thread',
  ],
  Automotive: [
    'Automotive Enthusiast Merchandise',
    'Car Care',
    'Car Electronics & Accessories',
    'Cars & Motorcycles',
    'Exterior Accessories',
    'Interior Accessories',
    'Motorcycle & ATV',
    'Oils & Fluids',
    'Paint, Body & Trim',
    'Performance Parts & Accessories',
    'Replacement Parts',
    'RV Parts & Accessories',
    'Tools & Equipment',
    'Trucks',
    'Wheels & Tires',
  ],
  Baby: [
    'Baby Stationery',
    'Bathing & Skin Care',
    'Car Seats & Accessories',
    'Diapering',
    'Feeding',
    'Gear',
    'Gifts',
    'Health & Baby Care',
    'Nursery',
    'Potty Training',
    'Pregnancy & Maternity',
    'Safety',
    'Shoes',
    'Strollers',
  ],
  Beauty: [
    'Bath & Body',
    'Beauty Tools & Accessories',
    'Body, Face and Hand Lotions',
    'Antiaging Creams, Cleansers',
    'Massage Oils',
    'Baby Oils',
    'Exfoliators',
    'Toners',
    'Sun Tan Products',
    'Fragrance',
    'Gift Sets',
    'Makeup',
    'Men\'s Grooming',
  ],
  Books: [
    'Arts & Photography Books',
    'Biographies and Memoirs',
    'Business & Investing Books',
    'Calendars',
    'Children\'s Books',
    'Comics & Graphic Novels',
    'Computer & Internet Books',
    'Cooking, Food & Wine',
    'Entertainment Books',
    'Gay & Lesbian Books',
    'Health, Mind and Body',
    'History Books',
    'Home & Garden Books',
    'Law',
    'Literature & Fiction Books',
    'Medicine Books',
    'Mystery & Thrillers',
    'Nonfiction Books',
    'Outdoors & Nature',
    'Parenting & Families',
    'Politics & Social Sciences Books',
    'Professional & Technical Books',
    'Reference Books',
    'Religion & Spirituality',
    'Romance Books',
    'Science Books',
    'Science Fiction and Fantasy Books',
    'Sports Books',
    'Teens',
    'Travel',
  ],
  'Camera & Photo': [
    'Accessories',
    'Binoculars, Telescopes & Optics',
    'Camcorders',
    'Camera & Photo Features',
    'Custom Stores',
    'Digital Cameras',
    'Film Cameras',
    'Lenses',
    'Printers & Scanners',
    'Projectors',
    'Special Features Stores',
    'Surveillance Cameras',
    'Tripods & Monopods',
    'Underwater Photography',
  ],
  Electronics: [
    'Accessories & Supplies',
    'Boat Electronics',
    'Car Electronics',
    'Cell Phones & Accessories',
    'Computer',
    'eBook Readers & Accessories',
    'Electronic Equipment Warranties',
    'GPS & Navigation',
    'Home Audio',
    'Portable Audio & Video',
    'Security & Surveillance',
    'Service & Replacement Plans',
    'Television & Video',
    'Vehicle Electronics',
    'Video Games',
  ],
  'Health & Personal Care': [
    'Diet & Nutrition',
    'Health Care',
    'Household Supplies',
    'Medical Supplies & Equipment',
    'Personal Care',
    'Sexual Wellness',
    'Stationery & Party Supplies',
  ],
  'Home & Kitchen': [
    'Appliances',
    'Furniture & Décor',
    'Heating, Cooling & Air Quality',
    'Kids Home Store',
    'Lighting',
    'Vacuums, Cleaning & Storage',
  ],
  'Industrial & Scientific': [
    'Abrasive & Finishing Products',
    'Additive Manufacturing Products',
    'Cutting Tools',
    'Electronic Components',
    'Fasteners',
    'Filtration',
    'Food Service',
    'Hardware',
    'Hydraulics, Pneumatics & Plumbing',
    'Janitorial & Sanitation Supplies',
    'Lab & Scientific Products',
    'Material Handling Products',
    'Materials',
    'Measurement & Inspection Products',
    'Occupational Health & Safety Products',
    'Power & Hand Tools',
    'Power Transmission Products',
    'Science Education',
    'Tapes, Adhesives & Sealants',
  ],
  Jewelry: [
    'Accessories',
    'Ankle Bracelets',
    'Body Jewelry',
    'Bracelets & Bangles',
    'Brooches and Pins',
    'Charms',
    'Children\'s Jewelry',
    'Earrings',
    'Gemstones',
    'Jewelry Sets',
    'Men\'s Jewelry',
    'Necklaces & Pendants',
    'Novelty Jewelry',
    'Religious Jewelry',
    'Rings',
    'Wedding & Engagement Rings',
  ],
  // 'Kindle Store': [],
  'Kitchen & Housewares': [
    'Bakeware',
    'Bar Tools & Glasses',
    'Coffee, Tea & Espresso',
    'Cookware',
    'Glassware & Drinkware',
    'Home Brewing & Wine Making',
    'Kitchen & Table Linens',
    'Kitchen Knives & Cutlery Accessories',
    'Kitchen Utensils & Gadgets',
    'Small Appliance Parts & Accessories',
    'Small Appliances',
    'Storage & Organization',
    'Tabletop',
    'Wine Accessories',
  ],
  'Magazine Subscriptions': [
    'Arts & Photography',
    'Automotive',
    'Brides & Weddings',
    'Business & Investing',
    'Children\'s',
    'Computers & Internet',
    'Cooking, Food & Wine',
    'Education',
    'Electronics & Audio',
    'Entertainment',
    'Fashion & Style',
    'Gay & Lesbian',
    'Health, Mind & Body',
    'History',
    'Home & Garden',
    'International Publications',
    'Smith Print',
    'Law',
    'Lifestyle & Cultures',
    'Literary Magazine',
    'Men\'s Interest',
    'Movies and Music Magazines',
    'News and Politics Magazine Subscriptions',
    'Newsletters',
    'Newspapers',
    'Outdoors & Nature',
    'Parenting & Families',
    'Professional & Trade',
    'Reference',
    'Regional Publications',
    'Science & Nature',
    'Science Fiction & Fantasy',
    'Spanish-Language',
    'Sports & Leisure',
    'Teens',
    'Transportation',
    'Travel & Regional',
  ],
  'Office Products': [
    'Office Electronics',
    'Office Furniture & Lighting',
    'School Supplies',
  ],
  'Sports & Outdoors': [
    'Apparel',
    'Backpacks',
    'Boating & Water Sports',
    'Climbing',
    'Clothing',
    'Equestrian Sports',
    'Exercise & Fitness',
    'Fan Shop',
    'Golf',
    'Hunting & Fishing',
    'Kayaking',
    'Leisure Sports & Games',
    'Other Sports',
    'Paintball & Airsoft',
    'Skating',
    'Skiing',
    'Sleeping Bags',
    'Snow Sports',
    'Snowboarding',
    'Surfing',
    'Sports & Outdoors Accessories',
    'Team Sports',
    'Tennis',
    'Tents',
  ],
  'Tools & Hardware': [
    'Appliances',
    'Building Materials',
    'Electrical',
    'Hardware Store',
    'Heavy Equipment & Agricultural Supplies',
    'Home Improvement',
    'Kitchen & Bath Fixtures Store',
    'Painting Supplies & Wall Treatments',
    'Power & Hand Tools',
    'Rough Plumbing',
    'Safety & Security',
    'Storage & Home Organization',
  ],
  'Toys and Games': [
    'Action & Toy Figures',
    'Arts & Crafts',
    'Baby & Toddler Toys',
    'Battle Tops',
    'Beauty & Fashion',
    'Bikes, Skates & Ride-Ons',
    'Building & Construction Toys',
    'Die-Cast & Toy Vehicles',
    'Dolls & Accessories',
    'Dress Up Games & Pretend Play',
    'Dressing Up & Costumes',
    'Electronics for Kids',
    'Games',
    'Grown-Ups',
    'Hobbies',
    'Kids Furniture & Room Decor',
    'Learning & Education',
    'Musical Instruments',
    'Novelty & Gag Toys',
    'Party Supplies',
    'Puppets & Puppet Theaters',
    'Puzzles',
    'Sports & Outdoor Play',
    'Stuffed Animals & Plush',
  ],
};

export default categories;
