import { useRef, useState, type FormEvent } from 'react';
import { CalendarDays, CheckCircle2, ArrowRight, Phone, Heart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { localToday, timeSlots, formatTime, reservationSchema, type Booking } from '@/lib/reservation';

const initial = { name:'', phone:'', date:'', time:'', guests:'2', requests:'' };
type Field = keyof typeof initial;
export function Reservation() {
 const [form,setForm]=useState(initial);
 const [errors,setErrors]=useState<Partial<Record<Field,string>>>({});
 const [pending,setPending]=useState(false);
 const [booking,setBooking]=useState<Booking|null>(null);
 const locked=useRef(false);
 const confirmationRef=useRef<HTMLDivElement>(null);
 function update(field:Field,value:string) {
  setForm(prev=>({...prev,[field]:value,...(field==='date'?{time:''}:{})}));
  setErrors(prev=>({...prev,[field]:undefined}));
 }
 async function submit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault(); if(locked.current) return;
  const parsed=reservationSchema.safeParse(form);
  if(!parsed.success) {
   const next:Partial<Record<Field,string>>={};
   parsed.error.issues.forEach(issue=>{const field=issue.path[0] as Field; if(!next[field]) next[field]=issue.message;});
   setErrors(next);
   const first=Object.keys(next)[0];
   if(first) document.getElementById(`booking-${first}`)?.focus();
   return;
  }
  locked.current=true;setPending(true);
  await new Promise(resolve=>setTimeout(resolve,600));
  const next:Booking={...parsed.data,reference:`SS-${crypto.randomUUID().slice(0,8).toUpperCase()}`};
  try {
   const saved:unknown=JSON.parse(localStorage.getItem('saffron-soul-demo-reservations') || '[]');
   const existing=Array.isArray(saved)?saved:[];
   localStorage.setItem('saffron-soul-demo-reservations',JSON.stringify([...existing.slice(-49),next]));
   toast.success('Demo reservation saved on this device.');
  } catch { toast.info('Demo confirmation created. Your browser could not save it.'); }
  setBooking(next);setForm(initial);setErrors({});setPending(false);locked.current=false;
  requestAnimationFrame(()=>confirmationRef.current?.focus());
 }
 const fieldProps=(field:Field)=>({id:`booking-${field}`,name:field,value:form[field],onChange:(event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>update(field,event.target.value),'aria-invalid':Boolean(errors[field]),'aria-describedby':errors[field]?`error-${field}`:undefined});
 const error=(field:Field)=>errors[field]?<p className="field-error" id={`error-${field}`} role="alert">{errors[field]}</p>:null;
 return <section className="section reservation-section" id="reservation"><div className="container reservation-grid">
  <div className="reservation-intro"><p className="eyebrow">MAKE YOURSELF AT HOME</p><h2>Your Table<br/>Is Waiting.</h2><p>For a quiet evening, a joyful celebration, or simply a meal worth slowing down for. There’s a place for you at our table.</p><div className="reservation-details"><div><CalendarDays/><p><strong>A little planning, a lovely evening</strong>Tables for 1–20 guests</p></div><div><Heart/><p><strong>Every occasion deserves a little soul</strong>Let us know what you’re celebrating</p></div><div><Phone/><p><strong>Prefer a conversation?</strong>Demo phone: +91 90000 00000</p></div></div><p>This is a fictional restaurant. Reservations are a frontend demonstration only and are not sent to a restaurant.</p></div>
  {booking ? <div className="confirmation" ref={confirmationRef} tabIndex={-1} role="status"><CheckCircle2/><p className="eyebrow mt-4">YOUR DEMO CONFIRMATION</p><h3>Lovely to meet you, {booking.name.split(' ')[0]}.</h3><p>Your demo reservation details are ready. No real table has been booked.</p><dl className="booking-summary"><div><dt>Name</dt><dd>{booking.name}</dd></div><div><dt>Date</dt><dd>{new Date(`${booking.date}T12:00:00`).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</dd></div><div><dt>Time</dt><dd>{formatTime(booking.time)}</dd></div><div><dt>Guests</dt><dd>{booking.guests} {booking.guests===1?'guest':'guests'}</dd></div><div><dt>Reference</dt><dd>{booking.reference}</dd></div></dl><p>Frontend demo only · Not sent to a real restaurant.</p><Button variant="brand" size="lg" onClick={()=>{setBooking(null);requestAnimationFrame(()=>document.getElementById('booking-name')?.focus());}}>Make Another Reservation <ArrowRight/></Button></div>
  : <form className="reservation-form" onSubmit={submit} noValidate><div className="form-grid">
   <div className="form-field"><label htmlFor="booking-name">Full name <span>*</span></label><input {...fieldProps('name')} placeholder="Your full name" autoComplete="name" maxLength={80} required/>{error('name')}</div>
   <div className="form-field"><label htmlFor="booking-phone">Phone number <span>*</span></label><input {...fieldProps('phone')} type="tel" placeholder="+91 98765 43210" autoComplete="tel" maxLength={20} required/>{error('phone')}</div>
   <div className="form-field"><label htmlFor="booking-date">Reservation date <span>*</span></label><input {...fieldProps('date')} type="date" min={localToday()} required/>{error('date')}</div>
   <div className="form-field"><label htmlFor="booking-time">Reservation time <span>*</span></label><select {...fieldProps('time')} required><option value="">Select a time</option>{timeSlots(form.date).map(time=><option key={time} value={time}>{formatTime(time)}</option>)}</select>{error('time')}</div>
   <div className="form-field full-width"><label htmlFor="booking-guests">Number of guests <span>*</span></label><input {...fieldProps('guests')} type="number" min={1} max={20} step={1} required/>{error('guests')}</div>
   <div className="form-field full-width"><label htmlFor="booking-requests">Special requests <span>(optional)</span></label><textarea {...fieldProps('requests')} maxLength={500} placeholder="A celebration, dietary preferences, or anything we should know…"/>{error('requests')}</div>
  </div><Button type="submit" variant="brand" size="lg" className="reserve-submit" disabled={pending}>{pending?<><Loader2 className="animate-spin"/>Creating demo reservation…</>:<>Reserve a Table <ArrowRight/></>}</Button><p className="form-disclaimer">Demo only. No real booking is made. Details are saved only in this browser.</p></form>}
 </div></section>;
}