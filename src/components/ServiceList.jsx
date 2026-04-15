import SectionCard from './SectionCard';
import { formatCurrency } from '../utils/formatCurrency';

export default function ServiceList({ services, isLoading, error }) {
  if (isLoading) {
    return (
      <SectionCard title="Popular services" subtitle="Hang tight, fetching latest options.">
        <p className="state-message">Loading services...</p>
      </SectionCard>
    );
  }

  if (error) {
    return (
      <SectionCard title="Popular services">
        <p className="state-message error">{error}</p>
      </SectionCard>
    );
  }

  if (!services.length) {
    return (
      <SectionCard title="Popular services">
        <p className="state-message">No services available right now.</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Popular services" subtitle="Prices may vary slightly by location.">
      <ul className="grid-list">
        {services.map((service) => (
          <li className="tile" key={service.id}>
            <h3>{service.name}</h3>
            <p>{formatCurrency(service.price)}</p>
            <button type="button">Book now</button>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
