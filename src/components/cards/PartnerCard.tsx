import { ChevronRight, Compass } from 'lucide-react';
import type { Partner } from '../../constants/partners';
import { getInitials } from '../layout/Sidebar';

interface PartnerCardProps {
  partner: Partner;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  const hasExternalUrl = partner.url !== '#';

  return (
    <div className="w-full max-w-4xl bg-card border border-border overflow-hidden rounded-lg">
      <a
        href={partner.url}
        target={hasExternalUrl ? '_blank' : undefined}
        rel="noopener noreferrer"
        data-cursor="interactive"
        className="group flex flex-col sm:flex-row sm:h-[400px]"
      >
        <div className="relative w-full sm:w-[45%] h-48 sm:h-full overflow-hidden flex-shrink-0">
          <img
            src={partner.image}
            alt={partner.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent sm:hidden" />
        </div>

        <div className="flex-1 p-6 sm:px-9 sm:py-10 flex flex-col justify-center">
          <div className="font-display text-gold/65 text-sm tracking-[0.2em] uppercase mb-8 sm:mb-9">
            {getInitials(partner.name)}
          </div>

          <h4 className="font-display text-foreground text-2xl sm:text-3xl tracking-[0.12em] uppercase font-light leading-tight">
            {partner.name}
          </h4>

          <p className="font-body text-accent/70 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mt-3">
            {partner.sector}
          </p>

          <p className="font-body text-foreground/50 text-sm leading-relaxed mt-7 max-w-[35rem]">
            {partner.description}
          </p>

          <div className="relative flex items-center justify-between mt-7 pt-5 border-t border-border">
            <span className="font-body text-muted-foreground/50 text-[11px] tracking-wide flex items-center gap-2">
              {partner.flagCode ? (
                <img
                  src={`https://flagcdn.com/w20/${partner.flagCode}.png`}
                  alt={partner.origin}
                  className="h-3 rounded-[2px]"
                  loading="lazy"
                />
              ) : (
                <Compass className="w-4 h-4 text-accent" />
              )}
              {partner.origin}
            </span>

            {hasExternalUrl && (
              <span className="absolute left-[62%] top-0 hidden h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/35 text-gold/60 transition-all duration-300 group-hover:border-gold/60 group-hover:text-gold sm:flex">
                <ChevronRight className="h-6 w-6" />
              </span>
            )}

            {hasExternalUrl && (
              <span className="font-body text-accent/50 text-[11px] tracking-[0.28em] uppercase">
                Visit &rarr;
              </span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}
