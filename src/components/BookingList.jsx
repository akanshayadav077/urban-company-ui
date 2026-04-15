import SectionCard from './SectionCard';
import { formatDate } from '../utils/formatDate';
import { formatCurrency } from '../utils/formatCurrency';

function BookingItem({ booking }) {
  return (
    <li className="booking-row">
      <div>
        <strong>{booking.service}</strong>
        <p>{formatDate(booking.bookedAt)}</p>
      </div>
      <div className="booking-meta">
        <span className={`status ${booking.status}`}>{booking.status}</span>
        <span>{formatCurrency(booking.amount)}</span>
      </div>
    </li>
  );
}

export default function BookingList({ bookings, isLoading, error }) {
  if (isLoading) {
    return (
      <SectionCard title="Your bookings">
        <p className="state-message">Loading bookings...</p>
      </SectionCard>
    );
  }

  if (error) {
    return (
      <SectionCard title="Your bookings">
        <p className="state-message error">{error}</p>
      </SectionCard>
    );
  }

  if (!bookings.length) {
    return (
      <SectionCard title="Your bookings">
        <p className="state-message">No bookings yet. Try your first service.</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Your bookings" subtitle="Recent activity from your account.">
      <ul className="booking-list">
        {bookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </ul>
    </SectionCard>
  );
}
