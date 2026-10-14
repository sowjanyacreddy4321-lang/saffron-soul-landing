import { describe, expect, it } from 'vitest';
import { localToday, reservationSchema, timeSlots } from '@/lib/reservation';
const valid = {name:'Ananya Reddy',phone:'+91 98765 43210',date:'2099-10-14',time:'12:00',guests:'2',requests:''};
describe('demo reservation validation',()=>{
 it('accepts valid Indian mobile formats',()=>{for(const phone of ['9876543210','+91 98765 43210','91-98765-43210','(98765) 43210'])expect(reservationSchema.safeParse({...valid,phone}).success).toBe(true);});
 it('rejects invalid names, phones, dates and guest counts',()=>{for(const input of [{name:''},{name:'A'},{phone:'1234567890'},{phone:'98765'},{date:'2000-01-01'},{date:'2099-02-31'},{guests:0},{guests:21},{guests:1.5},{time:'04:00'}])expect(reservationSchema.safeParse({...valid,...input}).success).toBe(false);});
 it('accepts today using local calendar date',()=>expect(reservationSchema.safeParse({...valid,date:localToday()}).success).toBe(true));
 it('offers weekday and weekend opening-hour slots',()=>{expect(timeSlots('2026-10-14')[0]).toBe('12:00');expect(timeSlots('2026-10-14').at(-1)).toBe('21:30');expect(timeSlots('2026-10-17')[0]).toBe('11:00');expect(timeSlots('2026-10-17').at(-1)).toBe('22:00');});
});