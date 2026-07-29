export default function AnnouncementBar({ announcements }: { announcements: any[] }) {
  if (!announcements || announcements.length === 0) return null;
  const text = announcements.map(a => a.message).join(' | ');

  return (
    <div className="top">
      <div className="ticker-wrap">
        <div className="ticker" id="tickerText">
          {text}
        </div>
      </div>
    </div>
  );
}
