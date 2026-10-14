import { z } from 'zod';
export function localToday() { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; }
export function timeSlots(date: string) {
 const day = new Date(`${date}T12:00:00`).getDay();
 const weekend = day === 0 || day === 6;
 const slots:string[]=[];
 for(let minutes=weekend ? 660 : 720; minutes <= (weekend ? 1320 : 1290); minutes+=30) slots.push(`${String(Math.floor(minutes/60)).padStart(2,'0')}:${String(minutes%60).padStart(2,'0')}`);
 return slots;
}
export function formatTime(time:string) { const [h,m]=time.split(':').map(Number); return `${h%12 || 12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`; }
export const reservationSchema = z.object({
 name: z.string().trim().min(2,'Please enter at least 2 characters.').max(80,'Please use no more than 80 characters.').regex(/^[\p{L}\p{M} .'-]+$/u,'Please enter a valid name.'),
 phone: z.string().trim().refine(value=>/^(?:\+91|91)?[6-9]\d{9}$/.test(value.replace(/[\s()-]/g,'')), 'Enter a valid 10-digit Indian mobile number, optionally with +91.'),
 date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/,'Please choose a date.').refine(value=>value >= localToday() && !Number.isNaN(new Date(`${value}T12:00:00`).getTime()) && new Date(`${value}T12:00:00`).getDate()===Number(value.slice(-2)),'Choose today or a future date.'),
 time: z.string().min(1,'Please choose a time.'),
 guests: z.coerce.number().int('Choose a whole number.').min(1,'Choose at least 1 guest.').max(20,'For this demo, choose no more than 20 guests.'),
 requests: z.string().trim().max(500,'Please keep your requests under 500 characters.'),
}).superRefine((data,ctx)=>{if(data.time && !timeSlots(data.date).includes(data.time)) ctx.addIssue({code:z.ZodIssueCode.custom,path:['time'],message:'Please choose a time within our opening hours.'});});
export type Booking = z.infer<typeof reservationSchema> & { reference:string };