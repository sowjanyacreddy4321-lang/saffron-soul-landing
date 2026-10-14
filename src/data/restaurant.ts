import feast from '@/assets/feast.jpg.asset.json';
import curry from '@/assets/curry.jpg.asset.json';
import tikka from '@/assets/tikka.jpg.asset.json';
import interior from '@/assets/interior.jpg.asset.json';
import dining from '@/assets/dining.jpg.asset.json';
import dessert from '@/assets/dessert.jpg.asset.json';
import drink from '@/assets/drink.jpg.asset.json';
import paneer from '@/assets/paneer.jpg.asset.json';

export const photos = { feast: feast.url, curry: curry.url, tikka: tikka.url, interior: interior.url, dining: dining.url, dessert: dessert.url, drink: drink.url, paneer: paneer.url };
export const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'] as const;
export const diets = ['All', 'Vegetarian', 'Vegan', 'Non-vegetarian', 'Gluten-free'] as const;
export type Category = typeof categories[number];
export type Diet = typeof diets[number];
export type MenuItem = { id: number; name: string; description: string; price: number; category: Exclude<Category, 'All'>; vegetarian: boolean; tags: Diet[]; image: string; special?: boolean };
export const menuItems: MenuItem[] = [
 { id: 1, name: 'Saffron Paneer Tikka', description: 'Char-grilled cottage cheese, saffron yogurt, mint chutney.', price: 395, category: 'Starters', vegetarian: true, tags: ['Vegetarian', 'Gluten-free'], image: photos.tikka, special: true },
 { id: 2, name: 'Crispy Lotus Stem', description: 'Crisp lotus root tossed in a tangy chilli and sesame glaze.', price: 325, category: 'Starters', vegetarian: true, tags: ['Vegetarian', 'Vegan'], image: photos.feast },
 { id: 3, name: 'Smoky Chicken Tikka', description: 'Tandoor-kissed chicken with Kashmiri chilli and fresh lime.', price: 445, category: 'Starters', vegetarian: false, tags: ['Non-vegetarian', 'Gluten-free'], image: photos.tikka },
 { id: 4, name: 'Old Delhi Dal Makhani', description: 'Black lentils, slow-simmered overnight with butter and cream.', price: 365, category: 'Mains', vegetarian: true, tags: ['Vegetarian', 'Gluten-free'], image: photos.curry, special: true },
 { id: 5, name: 'Paneer Lababdar', description: 'Soft paneer in a rich tomato gravy with toasted fenugreek.', price: 425, category: 'Mains', vegetarian: true, tags: ['Vegetarian', 'Gluten-free'], image: photos.paneer },
 { id: 6, name: 'Hyderabadi Dum Biryani', description: 'Fragrant basmati, tender chicken, saffron and caramelised onions.', price: 495, category: 'Mains', vegetarian: false, tags: ['Non-vegetarian', 'Gluten-free'], image: photos.feast, special: true },
 { id: 7, name: 'Soulful Butter Chicken', description: 'Tandoori chicken folded into our silky, signature tomato sauce.', price: 485, category: 'Mains', vegetarian: false, tags: ['Non-vegetarian', 'Gluten-free'], image: photos.curry },
 { id: 8, name: 'Seasonal Vegetable Curry', description: 'Market vegetables, coconut milk and fragrant curry leaves.', price: 355, category: 'Mains', vegetarian: true, tags: ['Vegetarian', 'Vegan', 'Gluten-free'], image: photos.paneer },
 { id: 9, name: 'Warm Gulab Jamun', description: 'Golden milk dumplings in rose and cardamom syrup.', price: 195, category: 'Desserts', vegetarian: true, tags: ['Vegetarian'], image: photos.dessert },
 { id: 10, name: 'Saffron Rasmalai', description: 'Delicate cottage-cheese clouds in chilled saffron milk.', price: 245, category: 'Desserts', vegetarian: true, tags: ['Vegetarian', 'Gluten-free'], image: photos.dessert },
 { id: 11, name: 'Mango & Cardamom Lassi', description: 'Alphonso mango, creamy yogurt and a whisper of cardamom.', price: 185, category: 'Drinks', vegetarian: true, tags: ['Vegetarian', 'Gluten-free'], image: photos.drink },
 { id: 12, name: 'Fresh Lime & Mint Cooler', description: 'Fresh lime, muddled mint and sparkling water. A little refreshment.', price: 165, category: 'Drinks', vegetarian: true, tags: ['Vegetarian', 'Vegan', 'Gluten-free'], image: photos.drink },
];
export const gallery = [
 { image: photos.feast, alt: 'An Indian thali with fresh flatbread and vibrant curries', label: 'A feast for the senses' },
 { image: photos.interior, alt: 'Warm restaurant interior with beautifully set dining tables', label: 'Stay a little longer' },
 { image: photos.tikka, alt: 'Freshly grilled Indian tikka skewers', label: 'From the tandoor' },
 { image: photos.paneer, alt: 'A fragrant paneer curry garnished with herbs', label: 'Comfort, reimagined' },
 { image: photos.dining, alt: 'Thoughtfully plated food at a candlelit dining table', label: 'Moments worth sharing' },
 { image: photos.drink, alt: 'Refreshing drinks garnished with citrus', label: 'A refreshing little ritual' },
];
export const reviews = [
 { name: 'Ananya M.', occasion: 'A birthday to remember', quote: 'The dal makhani was pure comfort, and the little details made our birthday dinner feel truly special. Already planning our next visit.', rating: 5 },
 { name: 'Rohan & Priya', occasion: 'Date night', quote: 'Beautiful flavours without the fuss. The paneer tikka, the warm welcome, the lovely atmosphere — everything came together perfectly.', rating: 5 },
 { name: 'Vikram S.', occasion: 'Sunday with the family', quote: 'A place where everyone at the table finds a favourite. The biryani was fragrant, the service thoughtful, and dessert was non-negotiable.', rating: 5 },
 { name: 'Meera K.', occasion: 'Dinner with friends', quote: 'We came for a quick meal and stayed for another round of drinks. Contemporary, cosy and full of soul. The lotus stem is a must-try.', rating: 4 },
];
export const navigation = [{id:'home',label:'Home'},{id:'story',label:'Our Story'},{id:'menu',label:'Menu'},{id:'gallery',label:'Gallery'},{id:'reviews',label:'Reviews'},{id:'contact',label:'Contact'}];
export const demoPhone = '+91 90000 00000';
export const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Indiranagar%2C%20Bengaluru%2C%20Karnataka%2C%20India';