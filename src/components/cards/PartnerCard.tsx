import { Compass } from 'lucide-react';
import type { Partner } from '../../constants/partners';
import { getInitials } from '../layout/Sidebar';
import './PartnerCard.css';

interface PartnerCardProps {
  partner: Partner;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  const hasExternalUrl = partner.url !== '#';

  const cardContent = (
    <>
      {/* ── Left: Image Panel ── */}
      <div className="partner-card__image-panel">
        <img
          src={partner.image}
          alt={partner.name}
          className="partner-card__image"
          loading="lazy"
          width={440}
          height={420}
        />
        <div className="partner-card__image-overlay" />
      </div>

      {/* ── Right: Content Panel ── */}
      <div className="partner-card__content">
        {/* Monogram */}
        <span className="partner-card__monogram">
          {getInitials(partner.name)}
        </span>

        {/* Company Name */}
        <h4 className="partner-card__name">
          {partner.name}
        </h4>

        {/* Industry */}
        <p className="partner-card__industry">
          {partner.sector}
        </p>

        {/* Description */}
        <p className="partner-card__description">
          {partner.description}
        </p>

        {/* Divider */}
        <div className="partner-card__divider" />

        {/* Bottom Row */}
        <div className="partner-card__bottom">
          <span className="partner-card__origin">
            {partner.flagCode ? (
              <img
                src={`/images/flags/${partner.flagCode}.png`}
                alt={partner.origin}
                className="partner-card__flag"
                loading="lazy"
                width={20}
                height={13}
              />
            ) : (
              <Compass className="partner-card__compass" />
            )}
            {partner.origin}
          </span>

          {hasExternalUrl && (
            <span className="partner-card__visit">
              VISIT&nbsp;&nbsp;→
            </span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="partner-card">
      {hasExternalUrl ? (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="interactive"
          className="partner-card__link"
        >
          {cardContent}
        </a>
      ) : (
        <div className="partner-card__link">
          {cardContent}
        </div>
      )}
    </div>
  );
}
