alter table "public"."foods" drop constraint "valid_category";
alter table "public"."foods" add constraint "valid_category" check (category = ANY (ARRAY['Alcohol'::text, 'Bagel'::text, 'Baked food'::text, 'Bean'::text, 'Beef'::text, 'Beverage'::text, 'Bread'::text, 'Butter'::text, 'Candy'::text, 'Cheese'::text, 'Chicken'::text, 'Chickpea'::text, 'Cold cut'::text, 'Cottage cheese'::text, 'Cream'::text, 'Dairy'::text, 'Dough'::text, 'Dried fruit'::text, 'Edamame'::text, 'Eggs'::text, 'Fish'::text, 'Flour'::text, 'Food'::text, 'Fruit'::text, 'Gluten'::text, 'Goat'::text, 'Ground meat'::text, 'Herb'::text, 'Ice cream'::text, 'Jerky'::text, 'Lamb'::text, 'Leafy green'::text, 'Lentil'::text, 'Lettuce'::text, 'Mayonnaise'::text, 'Milk'::text, 'Muffin'::text, 'Noodles'::text, 'Nut'::text, 'Nut milk'::text, 'Oil'::text, 'Organ meat'::text, 'Pasta'::text, 'Pea'::text, 'Pea'::text, 'Pepper'::text, 'Pork'::text, 'Prepared food'::text, 'Protein powder'::text, 'Quark'::text, 'Recipe'::text, 'Ribs'::text, 'Rice'::text, 'Sauce'::text, 'Seed'::text, 'Shellfish'::text, 'Snack'::text, 'Sour cream'::text, 'Soy'::text, 'Spice'::text, 'Stock'::text, 'Sweetener'::text, 'Tortilla'::text, 'Turkey'::text, 'Vegetable'::text, 'Vinegar'::text, 'Whole grain'::text, 'Wine'::text, 'Yogurt'::text]));
