-- Move the original client-only product catalog into Supabase so every item
-- can be edited, translated, or deleted from the admin panel.
insert into public.products (
  id, name, category, origin, origin_flag, moq, lead_time, image,
  description, oem_available, specifications, certifications, shelf_life
)
values
  (
    '20000000-0000-4000-8000-000000000001',
    '100% Pure Organic Coconut Water (Tetra Pak)', 'Food & Beverage', 'Vietnam', '🇻🇳',
    '500 Cartons (12,000 units)', '14 - 21 Days',
    'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=1000&auto=format&fit=crop',
    'NFC (Not From Concentrate) organic young coconut water packed with natural electrolytes, no added sugar, certified for ASEAN distribution.', true,
    array['Volume: 330ml / 500ml / 1L Tetra Pak', 'Ingredients: 99.9% Young Coconut Water, 0.1% Vitamin C', 'Certifications: ISO 22000, HACCP, Halal, USDA Organic', 'Packaging: Master Carton of 24 Packs'],
    array['HACCP', 'ISO 22000', 'Halal', 'USDA Organic'], '18 Months'
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    'Advanced Botanical Brightening Serum (30ml)', 'Skincare & Beauty', 'South Korea', '🇰🇷',
    '1,000 Units', '20 - 30 Days',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
    'Clinical grade anti-aging and tone brightening serum infused with 5% Niacinamide, Centella Asiatica, and Hyaluronic Acid complex.', true,
    array['Formula: 5% Niacinamide, Arbutin, Cica Extract', 'Bottle: Amber Glass dropper bottle with custom gold foil print', 'Safety: Dermatologically tested, Paraben-free, Cruelty-free', 'Custom Labeling: English & Khmer multi-lingual compliant'],
    array['GMP Cosmetics', 'ISO 22716', 'K-FDA Approved'], '24 Months'
  ),
  (
    '20000000-0000-4000-8000-000000000003',
    'Highland Specialty Green & Jasmine Tea Leaf', 'Food & Beverage', 'Vietnam', '🇻🇳',
    '200 KG (Bulk Bagged)', '10 - 15 Days',
    'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1000&auto=format&fit=crop',
    'High altitude single-origin whole green tea leaves infused with natural night-blooming jasmine flowers. Ideal for cafe chains and retail distribution.', true,
    array['Grade: Premium Loose Whole Leaf (Grade A)', 'Moisture: Less than 5%', 'Packaging: 1kg vacuum sealed bags, master box 20kg', 'Compliance: Fully compliant with Cambodia MoC and Customs'],
    array['Global GAP', 'ISO 9001', 'Halal'], '24 Months'
  ),
  (
    '20000000-0000-4000-8000-000000000004',
    'Nourishing Keratin & Argan Oil Hair Treatment Set', 'Personal Care', 'Japan', '🇯🇵',
    '1,500 Sets', '25 - 35 Days',
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=1000&auto=format&fit=crop',
    'Salon-grade hair reconstruction shampoo and mask set enriched with Moroccan Argan oil, hydrolyzed silk protein, and amino acids.', true,
    array['Set Volume: Shampoo 500ml + Mask 500ml', 'Fragrance: Subtle Sakura & White Musk blend', 'Packaging: Eco-friendly PET pump bottle with gold accent cap', 'Certifications: Japanese MHLW Standard, ISO 22716'],
    array['JAS Certified', 'ISO 22716', 'Cruelty Free'], '36 Months'
  ),
  (
    '20000000-0000-4000-8000-000000000005',
    'Liposomal Vitamin C + Zinc Immunity Capsules', 'Health Supplements', 'South Korea', '🇰🇷',
    '2,000 Bottles (60 Count)', '20 - 30 Days',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=1000&auto=format&fit=crop',
    'High potency liposomal Vitamin C with Zinc for maximum bioavailability and immune support.', true,
    array['Active Ingredients: Liposomal Vitamin C 1000mg, Zinc Picolinate 15mg', 'Capsule: Vegetable Cellulose (Vegan)', 'Bottle: UV-Protected Amber Glass', 'Certifications: K-FDA Approved, GMP Certified Facility'],
    array['GMP Health', 'KFDA Registered', 'Halal Certified'], '24 Months'
  ),
  (
    '20000000-0000-4000-8000-000000000006',
    'Plant-Based Biodegradable Multi-Surface Clean Drops', 'Household Goods', 'Vietnam', '🇻🇳',
    '3,000 Bottles / Refills', '14 - 20 Days',
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=1000&auto=format&fit=crop',
    'Non-toxic, hypoallergenic multi-surface home cleaner concentrate formulated with natural citrus enzymes and coconut surfactants.', true,
    array['Formula: 100% Plant-Derived, Free from Chlorine & Ammonia', 'Concentration: 1:10 dilution ratio or ready-to-use spray bottle', 'Fragrance: Lemongrass & Tea Tree Natural Essential Oil', 'Regulatory: Eco-Mark Certified, ASEAN Harmonized Standard'],
    array['Green Label', 'ISO 14001', 'Child Safe'], '36 Months'
  ),
  (
    '20000000-0000-4000-8000-000000000009',
    'Kampot Black Pepper GI Certified Organic Whole Peppercorns', 'Food & Beverage', 'Cambodia', '🇰🇭',
    '100 KG (Bulk / Retail Pouches)', '1 - 3 Days',
    'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=1000&auto=format&fit=crop',
    'World-renowned Geographical Indication (GI) certified organic Kampot black pepper. Intense aromatic floral notes with distinctive spicy warmth.', true,
    array['Origin: Kampot Province, Cambodia (Protected GI Status)', 'Processing: Hand-picked, Sun Dried & Double Sorted', 'Packaging: 100g / 500g Glass Jars or 10kg Vacuum Bags', 'Certifications: ECOCERT Organic, Kampot Pepper Association (KPA)'],
    array['GI Kampot Pepper', 'ECOCERT Organic', 'ISO 22000', 'Halal'], '36 Months'
  ),
  (
    '20000000-0000-4000-8000-000000000010',
    'Premium Cambodian Organic Dried Keo Romeiet Mango Slices', 'Food & Beverage', 'Cambodia', '🇰🇭',
    '200 KG', '2 - 4 Days',
    'https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=1000&auto=format&fit=crop',
    '100% natural dried mango slices made from ripe Cambodian Keo Romeiet mangoes. No added sugar, no sulfur, rich in natural vitamins.', true,
    array['Variety: Premium Cambodian Keo Romeiet', 'Ingredients: 100% Organic Fresh Mango', 'Moisture Level: 14% - 16%', 'Certifications: HACCP, GMP, Halal Certified'],
    array['HACCP Certified', 'GMP Approved', 'Halal Certified'], '18 Months'
  )
on conflict (id) do nothing;

notify pgrst, 'reload schema';
